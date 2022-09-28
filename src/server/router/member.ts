import { createRouter } from './context';
import { z } from 'zod';
import { Member, Team } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const memebrRouter = createRouter()
	.query('getGame', {
		input: z.object({ gameId: z.string().cuid() }),
		async resolve({ ctx, input }) {
			const game = await ctx.prisma.game.findUnique({
				where: { id: input.gameId },
				select: { id: true, name: true, requireNames: true },
			});
			if (!game)
				throw new TRPCError({ code: 'NOT_FOUND', message: 'Game not found' });
			return game;
		},
	})

	.mutation('joinGame', {
		input: z.object({
			gameId: z.string().cuid(),
			member: z
				.object({
					id: z.string().uuid(),
					name: z.string().min(3).max(20),
				})
				.nullable(),
		}),
		async resolve({
			ctx,
			input,
		}): Promise<{ team: Team; member: Pick<Member, 'id' | 'name'> }> {
			const game = await ctx.prisma.game.findUnique({
				where: { id: input.gameId },
				include: { Teams: { include: { members: true } } },
			});
			if (!game) {
				throw new TRPCError({ code: 'NOT_FOUND', message: 'Game not found' });
			}

			async function getMember(
				member: typeof input['member']
			): Promise<Member> {
				if (!member.id) return ctx.prisma.member.create({ data: {} });
				const found = await ctx.prisma.member.findUnique({ where: { id } });
				if (found) return found;
				return ctx.prisma.member.create({ data: {} });
			}
			const member = await getMember(input.member);

			const team = game.Teams.find((t) =>
				t.members.find((m) => m.id === member.id)
			);
			if (team) return { team, memberId: member.id };

			if (game.Teams.length < game.teamCount) {
				const team = await ctx.prisma.team.create({
					data: {
						gameId: input.gameId,
						members: { connect: { id: member.id } },
					},
				});
				return { team, member: { id: member.id, name: member.name } };
			}

			const smallestTeam = game.Teams.reduce((prev, curr) =>
				curr.members.length < prev.members.length ? curr : prev
			);
			const updatedTeam = await ctx.prisma.team.update({
				where: { id: smallestTeam.id },
				data: { members: { connect: { id: member.id } } },
			});
			return {
				team: updatedTeam,
				member: { id: member.id, name: member.name },
			};
		},
	});

import { publicProcedure, router } from '../trpc';
import type { Member } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { getTeamTheme } from 'utils/getTeamTheme';
import { z } from 'zod';

export const memberRouter = router({
	getGame: publicProcedure
		.input(
			z.object({
				gameId: z.string().cuid(),
				memberId: z.string().uuid().optional(),
			})
		)
		.query(async ({ ctx, input }) => {
			const game = await ctx.prisma.game.findUnique({
				where: { id: input.gameId },
				include: {
					Teams: {
						include: {
							members: {
								orderBy: { name: 'asc' },
							},
						},
						orderBy: { createdAt: 'asc' },
					},
				},
			});
			if (!game) {
				throw new TRPCError({ code: 'NOT_FOUND', message: 'Game not found' });
			}
			const team = game.Teams.find((team) =>
				team.members.some((member) => member.id === input.memberId)
			);
			const userGames = await ctx.prisma.game.findMany({
				where: { userId: game.userId },
				select: { id: true },
				orderBy: { createdAt: 'asc' },
			});
			const gameId = userGames.findIndex((game) => game.id === input.gameId);
			const teamId = game.Teams.findIndex((t) => t.id === team?.id);
			const teamWithTheme = team ? { ...team, theme: getTeamTheme(gameId, teamId) } : team;

			const { id, name, requireNames } = game;
			return { game: { id, name, requireNames }, team: teamWithTheme };
		}),

	joinGame: publicProcedure
		.input(
			z.object({
				gameId: z.string().cuid(),
				member: z
					.object({
						id: z.string().uuid().optional(),
						name: z.string().min(3).max(20),
					})
					.optional(),
			})
		)
		.mutation(async ({ ctx, input }): Promise<Member> => {
			const game = await ctx.prisma.game.findUnique({
				where: { id: input.gameId },
				include: { Teams: { include: { members: true } } },
			});
			if (!game) {
				throw new TRPCError({ code: 'NOT_FOUND', message: 'Game not found' });
			}

			if (game.requireNames && !input.member?.name) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Please provide name',
				});
			}

			async function getMember(member: (typeof input)['member']): Promise<Member> {
				if (!member?.id) return ctx.prisma.member.create({ data: { name: member?.name } });
				const found = await ctx.prisma.member.findUnique({
					where: { id: member.id },
				});
				if (found)
					return ctx.prisma.member.update({
						where: { id: member.id },
						data: { name: member.name },
					});
				return ctx.prisma.member.create({ data: { name: member.name } });
			}

			const member = await getMember(input.member);

			const team = game.Teams.find((t) => t.members.find((m) => m.id === member.id));
			if (team) return member;

			if (game.Teams.length < game.teamCount) {
				await ctx.prisma.team.create({
					data: {
						gameId: input.gameId,
						members: { connect: { id: member.id } },
					},
				});
				return member;
			}

			const smallestTeam = game.Teams.reduce((prev, curr) =>
				curr.members.length < prev.members.length ? curr : prev
			);
			await ctx.prisma.team.update({
				where: { id: smallestTeam.id },
				data: { members: { connect: { id: member.id } } },
			});
			return member;
		}),
});

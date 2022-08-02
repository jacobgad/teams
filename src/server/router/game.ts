import { createRouter } from './context';
import { z } from 'zod';
import { teamOptions } from '../../utils/teams';
import { Member, Team } from '@prisma/client';

export const gameRouter = createRouter()
	.mutation('new', {
		input: z.object({
			name: z.string(),
			teamCount: z.number().min(2).max(teamOptions.length),
		}),
		async resolve({ ctx, input }) {
			const game = await ctx.prisma.game.create({ data: input });
			return { ...game };
		},
	})

	.query('get', {
		input: z.object({ gameId: z.string().cuid() }),
		async resolve({ ctx, input }) {
			const game = await ctx.prisma.game.findUnique({ where: { id: input.gameId } });
			if (!game) throw new Error('Game not found');
			return game;
		},
	})

	.query('join', {
		input: z.object({
			memberId: z.string().uuid().nullable(),
			game: z.string().cuid(),
		}),
		async resolve({ ctx, input }): Promise<{ team: Team; memberId: Member['id'] }> {
			async function getMember(id: Member['id'] | null): Promise<Member> {
				if (!id) return ctx.prisma.member.create({ data: {} });
				const found = await ctx.prisma.member.findUnique({ where: { id } });
				if (found) return found;
				return ctx.prisma.member.create({ data: {} });
			}
			const member = await getMember(input.memberId);

			const game = await ctx.prisma.game.findUnique({
				where: { id: input.game },
				include: { Teams: { include: { members: true } } },
			});
			if (!game) throw new Error('Game not found');

			const team = await ctx.prisma.team.findFirst({
				where: {
					gameId: input.game,
					members: { some: { id: member.id } },
				},
				include: { members: true },
			});
			console.error('TEAM: ' + team?.id);

			if (team) {
				const { members, ...rest } = team;
				return { team: rest, memberId: member.id };
			}

			if (game.Teams.length < game.teamCount) {
				const team = await ctx.prisma.team.create({ data: { gameId: input.game } });
				return { team, memberId: member.id };
			}

			const smallestTeam = game.Teams.reduce((prev, curr) =>
				curr.members.length < prev.members.length ? curr : prev
			);
			const updatedTeam = await ctx.prisma.team.update({
				where: { id: smallestTeam.id },
				data: { members: { connect: { id: member.id } } },
			});
			return { team: updatedTeam, memberId: member.id };
		},
	});

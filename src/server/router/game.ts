import { createProtectedRouter } from './protected-router';
import { z } from 'zod';
import { teamOptions } from '../../utils/teams';
import { TRPCError } from '@trpc/server';

export const gameRouter = createProtectedRouter()
	.mutation('new', {
		input: z.object({
			name: z.string(),
			teamCount: z.number().min(2).max(teamOptions.length),
			requireNames: z.boolean(),
		}),
		async resolve({ ctx, input }) {
			const game = await ctx.prisma.game.create({
				data: { ...input, userId: ctx.session.user.id! },
			});
			return game;
		},
	})

	.mutation('delete', {
		input: z.object({
			gameId: z.string().cuid(),
		}),
		async resolve({ ctx, input }) {
			const game = await ctx.prisma.game.findUnique({
				where: { id: input.gameId },
			});
			if (!game)
				throw new TRPCError({ code: 'NOT_FOUND', message: 'Game not found' });
			if (game.userId !== ctx.session.user.id)
				return new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'You are not the owner of this game',
				});
			const deleteTeams = ctx.prisma.team.deleteMany({
				where: { gameId: input.gameId },
			});
			const deleteGame = ctx.prisma.game.delete({
				where: { id: input.gameId },
				include: { Teams: true },
			});
			const transaction = await ctx.prisma.$transaction([
				deleteTeams,
				deleteGame,
			]);
			return transaction[1];
		},
	})

	.query('get', {
		input: z.object({ gameId: z.string().cuid() }),
		async resolve({ ctx, input }) {
			const game = await ctx.prisma.game.findUnique({
				where: { id: input.gameId },
				include: { Teams: { include: { members: true } } },
			});
			if (!game)
				throw new TRPCError({ code: 'NOT_FOUND', message: 'Game not found' });
			return game;
		},
	})

	.query('getAll', {
		async resolve({ ctx }) {
			const games = await ctx.prisma.game.findMany({
				where: { owner: ctx.session.user },
			});
			return games;
		},
	});

import { TRPCError } from '@trpc/server';
import { teamOptions } from 'utils/teams';
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

export const gameRouter = router({
	getAll: protectedProcedure.query(({ ctx }) => {
		return ctx.prisma.game.findMany({
			where: { owner: ctx.session.user },
		});
	}),

	get: protectedProcedure
		.input(z.object({ gameId: z.string().cuid() }))
		.query(async ({ ctx, input }) => {
			const game = await ctx.prisma.game.findUnique({
				where: { id: input.gameId },
				include: { Teams: { include: { members: true } } },
			});
			if (!game)
				throw new TRPCError({ code: 'NOT_FOUND', message: 'Game not found' });
			return game;
		}),

	new: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				teamCount: z.number().min(2).max(teamOptions.length),
				requireNames: z.boolean(),
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.game.create({
				data: { ...input, userId: ctx.session.user.id! },
			});
		}),

	delete: protectedProcedure
		.input(
			z.object({
				gameId: z.string().cuid(),
			})
		)
		.mutation(async ({ ctx, input }) => {
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
		}),
});

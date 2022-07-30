import { createRouter } from './context';
import { z } from 'zod';

export const exampleRouter = createRouter()
	.mutation('new', {
		input: z.object({
			name: z.string(),
			teams: z.number().min(2).max(20),
		}),
		async resolve({ ctx, input }) {
			const game = await ctx.prisma.game.create({ data: input });
			return { ...game };
		},
	})

	.query('getAll', {
		async resolve({ ctx }) {
			return await ctx.prisma.game.findMany();
		},
	});

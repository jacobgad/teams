// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { gameRouter } from './game';
import { memebrRouter } from './member';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('game.', gameRouter)
	.merge('member.', memebrRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

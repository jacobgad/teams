// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { gameRouter } from './game';
import { memberRouter } from './member';

export const appRouter = router({
	game: gameRouter,
	member: memberRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

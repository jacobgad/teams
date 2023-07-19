// src/server/trpc/router/_app.ts
import { gameRouter } from './game';
import { memberRouter } from './member';
import { router } from '../trpc';

export const appRouter = router({
	game: gameRouter,
	member: memberRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

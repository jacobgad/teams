// Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs

import type { GetServerSidePropsContext } from 'next';
import { authOptions as nextAuthOptions } from '../../pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';

// Next API route example - /pages/api/restricted.ts
export const getServerAuthSession = async (ctx: {
	req: GetServerSidePropsContext['req'];
	res: GetServerSidePropsContext['res'];
}) => {
	return await unstable_getServerSession(ctx.req, ctx.res, nextAuthOptions);
};

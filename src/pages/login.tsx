import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

const Login: NextPage = () => {
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session.status === 'loading')
		if (session) router.push('/');
	}, [session, router]);

	return (
		<>
			<Head>
				<title>Teams</title>
				<meta name='description' content='Split into teams fast' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='container mx-auto max-w-xs py-10'>
				<div className='grid w-full justify-center gap-4'>
					<h1 className='text-center text-3xl'>Sign In</h1>
					<button
						onClick={() => signIn('google')}
						className='w-full rounded bg-white py-2 px-10 text-black'
					>
						Login with Google
					</button>
				</div>
			</main>
		</>
	);
};

export default Login;

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

const Login: NextPage = () => {
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session.status === 'loading') if (session) router.push('/');
	}, [session, router]);

	return (
		<>
			<Head>
				<title>Teams</title>
				<meta name='description' content='Split into teams fast' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='container mx-auto max-w-xs py-10'>
				<div className='grid w-full justify-center gap-14'>
					<h1 className='text-center text-3xl'>Start using Teams</h1>
					<button
						onClick={() => signIn('google')}
						className='flex w-full items-center justify-between gap-4 rounded-lg bg-white py-2 px-6 font-semibold text-sky-900 shadow-md shadow-sky-900 hover:scale-105 active:scale-95'
					>
						<svg className='h-5 w-5'>
							<g clipPath='url(#p.0)'>
								<path
									fill='currentColor'
									d='m19.850197 8.270351c0.8574047 4.880001 -1.987587 9.65214 -6.6881847 11.218641c-4.700598 1.5665016 -9.83958 -0.5449295 -12.08104 -4.963685c-2.2414603 -4.4187555 -0.909603 -9.81259 3.1310139 -12.6801605c4.040616 -2.867571 9.571754 -2.3443127 13.002944 1.2301085l-2.8127813 2.7000687l0 0c-2.0935059 -2.1808972 -5.468274 -2.500158 -7.933616 -0.75053835c-2.4653416 1.74962 -3.277961 5.040613 -1.9103565 7.7366734c1.3676047 2.6960592 4.5031037 3.9843292 7.3711267 3.0285425c2.868022 -0.95578575 4.6038647 -3.8674583 4.0807285 -6.844941z'
									fillRule='evenodd'
								/>
								<path
									fill='currentColor'
									d='m10.000263 8.268785l9.847767 0l0 3.496233l-9.847767 0z'
									fillRule='evenodd'
								/>
							</g>
						</svg>
						<span className='text-lg'>Sign in with Google</span>
					</button>
				</div>
			</main>
		</>
	);
};

export default Login;

import type { NextPage } from 'next';
import Head from 'next/head';
import NavBar from 'components/ui/NavBar';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
	const session = useSession();

	return (
		<>
			<Head>
				<title>Teams</title>
				<meta name='description' content='Split into teams fast' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<NavBar />
			<main className='container mx-auto max-w-2xl py-5 px-8'>
				<div className='mb-5 flex justify-between'>
					<h1 className='h-11 text-center text-3xl'>Teams</h1>
					{session.status === 'authenticated' && (
						<Link href='/game'>
							<button className='rounded-lg bg-white px-4 py-2 text-lg font-semibold text-sky-900 transition ease-in-out hover:scale-105 active:scale-100'>
								My Games
							</button>
						</Link>
					)}
				</div>
				<p>
					Teams is a fast way to split up a group of people into random teams,
					just create a game and share the link.
				</p>
				<br />
				<p>
					Teams was build from watching the frustrations of Verena, a youth
					leader who would expend way to much effort organising the youth into
					groups to start a game
				</p>
				<br />
				<p>
					I pray that this app means for you, less time organising and more time
					having fun with friends.
				</p>
			</main>
		</>
	);
};

export default Home;

import Head from 'next/head';
import Link from 'next/link';
import NavBar from 'components/ui/layout/NavBar';
import type { NextPage } from 'next';
import { motion } from 'framer-motion';
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
			<main className='container mx-auto max-w-lg p-5 pb-16'>
				<div className='mb-6 flex justify-between'>
					<h1 className='text-center text-4xl'>Teams</h1>
					<Link href='/game' hidden={session.status !== 'authenticated'}>
						<motion.button
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className='flex items-center gap-2 rounded bg-sky-600 px-4 py-2 transition  active:scale-95'
						>
							My Games
						</motion.button>
					</Link>
				</div>
				<p>
					Teams is a fast way to split up a group of people into random teams, just create a game
					and share the link.
				</p>
				<br />
				<p>
					Teams was build from watching the frustrations of Verena, a youth leader who would expend
					way too much effort organising the youth into groups to start a game.
				</p>
				<br />
				<p>
					I pray that this app means for you, less time organising and more time having fun with
					friends.
				</p>
			</main>
		</>
	);
};

export default Home;

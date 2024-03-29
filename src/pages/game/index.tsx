import { AnimatePresence, motion } from 'framer-motion';
import GamesListItem from '../../components/ui/GamesListItem';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import NavBar from 'components/ui/layout/NavBar';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Spinner } from 'components/ui/Loading';
import { getSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { trpc } from 'utils/trpc';
import { useMemo } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	if (!session) return { redirect: { destination: '/' }, props: {} };
	return { props: {} };
};

export default function Games() {
	const { data, isLoading } = trpc.game.getAll.useQuery(undefined, {
		onError: (error) => toast.error(error.message),
	});

	const sortedData = useMemo(() => {
		if (!data) return [];
		return data.sort((pre, cur) => cur.createdAt.getTime() - pre.createdAt.getTime());
	}, [data]);

	return (
		<>
			<Head>
				<title>Teams</title>
				<meta name='description' content='Split into teams fast' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<NavBar />

			<main className='container mx-auto max-w-lg p-5 pb-16'>
				<div className='mb-10 flex justify-between'>
					<h1 className='text-center text-3xl'>My Games</h1>
					<Link href={'/game/new'}>
						<button className='flex items-center gap-2 rounded bg-sky-600 px-4 py-2 hover:bg-sky-700 active:scale-95'>
							<PlusIcon className='h-5 w-5' /> New Game
						</button>
					</Link>
				</div>

				{isLoading && (
					<div className='flex w-full justify-center pt-10'>
						<Spinner />
					</div>
				)}

				<ul className='grid gap-4'>
					<AnimatePresence>
						{sortedData.map((game) => (
							<motion.li
								key={game.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0, scale: 0 }}
								layout
								transition={{ layout: { type: 'spring' } }}
								className='min-w-0'
							>
								<GamesListItem game={game} />
							</motion.li>
						))}
					</AnimatePresence>
				</ul>
			</main>
		</>
	);
}

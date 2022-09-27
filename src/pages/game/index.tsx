import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';
import NavBar from 'components/ui/NavBar';
import { Spinner } from 'components/ui/Loading';
import toast from 'react-hot-toast';
import { trpc } from 'utils/trpc';
import { PlusIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import GamesListItem from '../../components/ui/GamesListItem';

const Games: NextPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const { data, isLoading } = trpc.useQuery(['game.getAll'], {
		onError: (error) => toast.error(error.message),
	});

	const sortedData = useMemo(() => {
		if (!data) return [];
		return data.sort(
			(pre, cur) => cur.createdAt.getTime() - pre.createdAt.getTime()
		);
	}, [data]);

	useEffect(() => {
		if (status === 'unauthenticated') router.push('/login');
	}, [status, router]);

	if (!session) return null;

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
					<button
						onClick={() => router.push('/game/new')}
						className='flex items-center gap-2 rounded bg-sky-600 px-4 py-2 hover:bg-sky-700'
					>
						<PlusIcon className='h-5 w-5' /> New Game
					</button>
				</div>

				{isLoading && (
					<div className='flex w-full justify-center pt-10'>
						<Spinner />
					</div>
				)}

				<ul className='grid gap-4'>
					<AnimatePresence>
						{sortedData.map((game, idx) => (
							<motion.li
								key={game.id}
								custom={idx}
								variants={{
									hidden: (idx) => ({
										opacity: 0,
										y: -50 * idx,
									}),
									visible: (idx) => ({
										opacity: 1,
										y: 0,
										transition: { delay: idx * 0.025 },
									}),
									removed: {
										opacity: 0,
										scale: 0,
									},
								}}
								initial='hidden'
								animate='visible'
								exit='removed'
								layout
								transition={{ layout: { type: 'spring' } }}
							>
								<GamesListItem game={game} />
							</motion.li>
						))}
					</AnimatePresence>
				</ul>
			</main>
		</>
	);
};

export default Games;

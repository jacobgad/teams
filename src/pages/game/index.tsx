import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import NavBar from 'components/ui/NavBar';
import { Spinner } from 'components/ui/Loading';
import toast from 'react-hot-toast';
import { trpc } from 'utils/trpc';
import { PlusIcon } from '@heroicons/react/solid';
import DeleteGameBtn from 'components/ui/DeleteGameBtn';

const Games: NextPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const { data, isLoading } = trpc.useQuery(['game.getAll'], {
		onError: (error) => toast.error(error.message),
	});

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

			<main className='container mx-auto max-w-lg p-5'>
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

				<div className='grid gap-4'>
					{data?.map((game) => (
						<div key={game.id} className='flex gap-4'>
							<button
								onClick={() => router.push(`/game/${game.id}`)}
								className='flex w-full justify-between rounded-full bg-gray-700 px-8 py-4 transition ease-out hover:scale-105 hover:bg-gray-600 active:scale-100'
							>
								<p>{game.name}</p>
								<div className='flex gap-4'>
									<p>{game.teamCount} Teams</p>
								</div>
							</button>
							<DeleteGameBtn gameId={game.id} />
						</div>
					))}
				</div>
			</main>
		</>
	);
};

export default Games;

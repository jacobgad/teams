import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../../../utils/trpc';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { teamOptions } from '../../../utils/teams';
import { Spinner } from '../../../components/ui/Loading';
import { env } from 'env/client.mjs';
import paramToString from 'utils/next';
import { ClipboardCopyIcon } from '@heroicons/react/solid';
import NavBar from 'components/ui/NavBar';

function getJoinUrl(gameId: string) {
	return env.NEXT_PUBLIC_VERCEL_URL + `/game/${gameId}/join`;
}

const Game: NextPage = () => {
	const router = useRouter();
	const { gameId } = router.query;
	const { data, isLoading } = trpc.useQuery(['game.get', { gameId: paramToString(gameId) }], {
		refetchInterval: 4000,
		onError: (error) => {
			toast.error(error.message);
			if (error.data?.code === 'NOT_FOUND') router.push('/game');
		},
	});

	async function handleLinkClick(link: string) {
		try {
			await navigator.clipboard.writeText(link);
			toast.success('Invite Copied');
		} catch (e) {
			toast.error('Error copping invite');
		}
	}

	return (
		<>
			<Head>
				<title>Game</title>
				<meta name='description' content='Split into teams fast' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<NavBar />
			<main className='container mx-auto max-w-sm p-5'>
				{isLoading && (
					<div className='mb-5 flex h-[60px] place-content-center'>
						<Spinner />
					</div>
				)}
				{data && (
					<div className='mb-5 flex w-full justify-between'>
						<div>
							<p>Game</p>
							<h1 className='text-center text-3xl'>{data?.name}</h1>
						</div>
						<div>
							<p>Teams</p>
							<p className='text-center text-3xl'>{data?.teamCount}</p>
						</div>
					</div>
				)}

				<div className='flex items-center'>
					<h2 className='w-1/4 text-xl'>Invite</h2>
					<button
						onClick={() => handleLinkClick(getJoinUrl(gameId as string))}
						className='my-5 flex w-3/4 items-center gap-4 rounded-lg bg-sky-800 px-4 transition-all ease-out
					hover:scale-105 hover:bg-sky-700 active:scale-100'
					>
						<p className='overflow-hidden text-ellipsis'>{getJoinUrl(gameId as string)}</p>
						<ClipboardCopyIcon className='h-12' />
					</button>
				</div>

				<div className='mt-5 grid gap-8'>
					{data?.Teams.map((team) => (
						<div
							key={team.id}
							className={` grid justify-items-center gap-2 overflow-hidden rounded-lg pb-2 shadow-md shadow-black 
							transition ease-in-out hover:-translate-y-1 
							${teamOptions[team.id % teamOptions.length]?.color}`}
						>
							<div
								className={`flex w-full items-center justify-between px-3 py-1 text-lg 
								${teamOptions[team.id % teamOptions.length]?.activeColor}`}
							>
								<p>{teamOptions[team.id % teamOptions.length]?.name}</p>
								<p>{team.members.length}</p>
							</div>
							<ul className='grid gap-1'>
								{team.members.map((member) => (
									<li key={member.id}>{member.id}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</main>
		</>
	);
};

export default Game;

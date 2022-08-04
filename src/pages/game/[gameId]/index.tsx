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
		onError: (error) => toast.error(error.message),
	});

	async function handleLinkClick(link: string) {
		try {
			await navigator.clipboard.writeText(link);
			toast.success('Invite Coppied');
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
				<h1 className='mb-10 text-center text-3xl'>{data?.name}</h1>

				<div className='mb-10 w-full px-10'>
					<p className='flex justify-between'>
						<span>Teams: </span>
						<span>{data?.teamCount}</span>
					</p>
				</div>

				<div className='flex flex-col items-center'>
					<h2 className='text-xl'>Copy Invite</h2>
					<button
						onClick={() => handleLinkClick(getJoinUrl(gameId as string))}
						className='m-5 flex w-3/4 items-center gap-4 rounded-lg bg-sky-800 px-4 py-1 transition-all ease-out
					hover:scale-105 hover:bg-sky-700 active:scale-100'
					>
						<p className='overflow-hidden text-ellipsis'>{getJoinUrl(gameId as string)}</p>
						<ClipboardCopyIcon className='h-10' />
					</button>
				</div>

				<div className='mt-5 grid gap-8'>
					{isLoading && <Spinner />}
					{data?.Teams.map((team) => (
						<div
							key={team.id}
							className={` grid justify-items-center rounded-lg pb-2 ${
								teamOptions[team.id % teamOptions.length]?.color
							}`}
						>
							<p className='p-2 text-lg'>{teamOptions[team.id % teamOptions.length]?.name}</p>
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

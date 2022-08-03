import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../../../utils/trpc';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { teamOptions } from '../../../utils/teams';

function getJoinUrl() {
	return document.URL + '/join';
}

const Game: NextPage = () => {
	const router = useRouter();
	const { gameId } = router.query;
	const { data, isLoading, isError, isIdle, error, refetch } = trpc.useQuery([
		'game.get',
		{ gameId: gameId as string },
	]);

	async function handleLinkClick(link: string) {
		try {
			await navigator.clipboard.writeText(link);
			toast.success('Invite Coppied');
		} catch (e) {
			toast.error('Error copping invite');
		}
	}

	if (isLoading) {
		return (
			<>
				<Head>
					<title>Game</title>
					<meta name='description' content='Split into teams fast' />
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<main className='container mx-auto grid max-w-xs justify-items-center py-10'>
					<h1 className='text-3xl'>Getting Game Info</h1>
					<div className='mt-24 grid items-center'>
						<svg
							className='-ml-1 mr-3 h-12 w-12 animate-spin text-white'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
						>
							<circle
								className='opacity-25'
								cx='12'
								cy='12'
								r='10'
								stroke='currentColor'
								strokeWidth='4'
							></circle>
							<path
								className='opacity-75'
								fill='currentColor'
								d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
							></path>
						</svg>
					</div>
				</main>
			</>
		);
	}

	if (isError || isIdle) {
		return (
			<>
				<Head>
					<title>Game</title>
					<meta name='description' content='Split into teams fast' />
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<main className='container mx-auto grid max-w-xs justify-items-center py-10'>
					<h1 className='text-3xl'>{`Can't Find Game`}</h1>
					<div className='mt-24 grid items-center'>
						{isError && <p className='text-center'>{error.message}</p>}
						{isIdle && <p className='text-center'>Query is Idle</p>}
						<div className='flex w-full justify-between'>
							<button
								onClick={() => refetch}
								className='mt-4 rounded-lg bg-sky-600 px-5 py-2 shadow shadow-sky-600 hover:bg-sky-700 disabled:bg-sky-900 disabled:text-gray-400 disabled:shadow-none'
							>
								Try Again
							</button>
							<button
								onClick={() => router.push('/')}
								className='mt-4 rounded-lg bg-sky-600 px-5 py-2 shadow shadow-sky-600 hover:bg-sky-700 disabled:bg-sky-900 disabled:text-gray-400 disabled:shadow-none'
							>
								New Game
							</button>
						</div>
					</div>
				</main>
			</>
		);
	}

	return (
		<>
			<Head>
				<title>Game</title>
				<meta name='description' content='Split into teams fast' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='container mx-auto grid max-w-xs justify-items-center py-10'>
				<h1 className='mb-10 text-center text-3xl'>Game Created</h1>
				<div className='mb-10 w-full px-10'>
					<p className='flex justify-between'>
						<span>Game: </span>
						<span>{data.name}</span>
					</p>
					<p className='flex justify-between'>
						<span>Teams: </span>
						<span>{data.teamCount}</span>
					</p>
				</div>
				<h2 className='text-xl'>Copy Invite</h2>
				<div
					onClick={() => handleLinkClick(getJoinUrl())}
					className='se m-5 w-3/4 rounded-lg bg-sky-800 p-4 hover:bg-sky-700'
				>
					<p className='break-all'>{getJoinUrl()}</p>
				</div>

				<div className='mt-5'>
					{data.Teams.map((team) => (
						<div key={team.id} className='mb-5'>
							<p>Team: {teamOptions[team.id % teamOptions.length]?.name}</p>
							<ul>
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

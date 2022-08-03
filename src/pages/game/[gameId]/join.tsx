import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useLocalStorage from '../../../components/hooks/useLocalStorage';
import { teamOptions } from '../../../utils/teams';
import { trpc } from '../../../utils/trpc';

const Join: NextPage = () => {
	const router = useRouter();
	const { gameId } = router.query;
	const [memberId, setMemberId] = useLocalStorage<string | null>('memberId', null);
	const { data, isLoading, isError, error, refetch, isIdle } = trpc.useQuery(
		['game.join', { gameId: gameId as string, memberId }],
		{
			onSuccess: (data) => {
				if (data.memberId !== memberId) setMemberId(data.memberId);
			},
		}
	);

	if (isLoading) {
		return (
			<>
				<Head>
					<title>Join Team</title>
					<meta name='description' content='Split into teams fast' />
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<main className='container mx-auto grid max-w-xs justify-items-center py-10'>
					<h1 className='text-3xl'>Finding your team</h1>
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
						<button
							onClick={() => refetch}
							className='mt-4 rounded-lg bg-sky-600 px-5 py-2 shadow shadow-sky-600 hover:bg-sky-700 disabled:bg-sky-900 disabled:text-gray-400 disabled:shadow-none'
						>
							Try Again
						</button>
					</div>
				</main>
			</>
		);
	}

	const team = teamOptions.at(data.team.id % teamOptions.length);
	return (
		<>
			<Head>
				<title>Join Team</title>
				<meta name='description' content='Split into teams fast' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={`h-[100vh] ${team?.color}`}>
				<main className='${team?.color} grid h-1/3 items-center'>
					<h1 className='text-center text-5xl'>Team {team?.name}</h1>
				</main>
			</main>
		</>
	);
};

export default Join;

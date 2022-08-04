import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useLocalStorage from 'components/hooks/useLocalStorage';
import { Spinner } from 'components/ui/Loading';
import { teamOptions } from 'utils/teams';
import { trpc } from 'utils/trpc';

const Join: NextPage = () => {
	const router = useRouter();
	const { gameId } = router.query;
	const [memberId, setMemberId] = useLocalStorage<string | null>('memberId', null);
	const { data, isLoading, isError, error, refetch, isIdle } = trpc.useQuery(
		['member.joinGame', { gameId: gameId as string, memberId }],
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
						<Spinner />
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

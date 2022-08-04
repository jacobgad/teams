import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../../../utils/trpc';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { teamOptions } from '../../../utils/teams';
import { Spinner } from '../../../components/ui/Loading';

function getJoinUrl() {
	return document.URL + '/join';
}

const Game: NextPage = () => {
	const router = useRouter();
	const { gameId } = router.query;
	const { data, isLoading } = trpc.useQuery(['game.get', { gameId: gameId as string }], {
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

			<main className='container mx-auto grid max-w-xs justify-items-center py-10'>
				<h1 className='mb-10 text-center text-3xl'>Game Created</h1>
				<div className='mb-10 w-full px-10'>
					<p className='flex justify-between'>
						<span>Game: </span>
						<span>{data?.name}</span>
					</p>
					<p className='flex justify-between'>
						<span>Teams: </span>
						<span>{data?.teamCount}</span>
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
					{isLoading && <Spinner />}
					{data?.Teams.map((team) => (
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

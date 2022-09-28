import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useLocalStorage from 'components/hooks/useLocalStorage';
import { Spinner } from 'components/ui/Loading';
import { teamOptions } from 'utils/teams';
import { trpc } from 'utils/trpc';
import { useState } from 'react';
import { useIsFetching } from 'react-query';
import { Member } from '@prisma/client';

type StoredMember = Pick<Member, 'id' | 'name'>;

const Join: NextPage = () => {
	const router = useRouter();
	const gameId = router.query.gameId as string;
	const [message, setMessage] = useState('Finding game');
	const [member, setMember] = useLocalStorage<StoredMember | null>(
		'member',
		null
	);

	const fetches = useIsFetching();
	const { mutate, data } = trpc.useMutation(['member.joinGame'], {
		onSuccess: (data) => {
			if (JSON.stringify(data.member) !== JSON.stringify(member)) {
				setMember(data.member);
			}
		},
		onError: (error) => {
			if (error instanceof Error) {
				setMessage(error.message);
			}
		},
	});

	const { data: game } = trpc.useQuery(['member.getGame', { gameId }], {
		onSuccess: (data) => {
			if (data.requireNames) {
				setMessage('Enter Name');
			} else {
				setMessage('Finding your Team');
				mutate({ gameId, member });
			}
		},
		onError: (error) => {
			if (error instanceof Error) {
				setMessage(error.message);
			}
		},
	});

	const team = data ? teamOptions.at(data.team.id % teamOptions.length)! : null;

	return (
		<>
			<Head>
				<title>Join Team</title>
				<meta name='description' content='Split into teams fast' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className={`h-[100vh] ${team?.color}`}>
				<main className='grid h-1/3 items-center'>
					<h1 className='text-center text-5xl'>
						{team === null ? message : `Team ${team.name}`}
					</h1>
					{fetches && <Spinner />}
					{game?.requireNames && <p>FORM</p>}
				</main>
			</div>
		</>
	);
};

export default Join;

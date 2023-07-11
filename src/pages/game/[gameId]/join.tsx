import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useLocalStorage from 'components/hooks/useLocalStorage';
import { Spinner } from 'components/ui/Loading';
import { teamOptions } from 'utils/teams';
import { trpc } from 'utils/trpc';
import { useMemo, useState } from 'react';
import { Member } from '@prisma/client';
import MemberNameForm from 'components/MemberNameForm';
import { isEqualObject } from 'utils/members';
import TeamTable from 'components/ui/TeamTable';

const Join: NextPage = () => {
	const router = useRouter();
	const gameId = router.query.gameId as string;
	const utils = trpc.useContext();
	const [message, setMessage] = useState('Finding Team');
	const [member, setMember] = useLocalStorage<Member | null>('member', null);

	const { mutate, isLoading } = trpc.member.joinGame.useMutation({
		onSuccess: (data) => {
			if (!isEqualObject(data, member)) setMember(data);
			utils.member.getGame.invalidate();
		},
		onError: (error) => {
			if (error instanceof Error) {
				setMessage(error.message);
			}
		},
	});

	const { data, isLoading: isLoadingGame } = trpc.member.getGame.useQuery(
		{ gameId, memberId: member?.id },
		{
			enabled: !!gameId,
			refetchInterval: 5000,
			onSuccess: (data) => {
				if (data.game.requireNames) return setMessage('Enter Name');
				mutate({ gameId, member: member ?? undefined });
			},
			onError: (error) => {
				if (error instanceof Error) {
					setMessage(error.message);
				}
			},
		}
	);

	const team = useMemo(() => data?.team ?? null, [data?.team]);

	return (
		<>
			<Head>
				<title>Join Team</title>
				<meta name='description' content='Split into teams fast' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className={`h-[100vh] ${team?.theme?.color.main}`}>
				<main className='container mx-auto grid w-full max-w-xs justify-items-center gap-10 pt-10'>
					<div className='h-9'>
						{data?.game && <h2 className='text-center text-3xl'>{data.game.name}</h2>}
					</div>
					<h1 className='text-center text-5xl'>
						{team === null ? message : `Team ${team.theme?.name}`}
					</h1>

					{isLoadingGame && !isLoading && <Spinner />}
					{!team && data?.game?.requireNames && (
						<div className='w-full px-5'>
							<MemberNameForm
								defaultName={member?.name}
								isLoading={isLoading}
								onSubmit={(data) =>
									mutate({
										gameId,
										member: { id: member?.id, name: data.name },
									})
								}
							/>
						</div>
					)}
					{data?.game.requireNames && data?.team && (
						<TeamTable team={data.team} theme={teamOptions[0]} />
					)}
				</main>
			</div>
		</>
	);
};

export default Join;

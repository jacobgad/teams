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

const Join: NextPage = () => {
	const router = useRouter();
	const gameId = router.query.gameId as string;
	const utils = trpc.useContext();
	const [message, setMessage] = useState('Finding Team');
	const [member, setMember] = useLocalStorage<Member | null>('member', null);

	const { mutate, isLoading } = trpc.useMutation(['member.joinGame'], {
		onSuccess: (data) => {
			if (!isEqualObject(data, member)) setMember(data);
			utils.invalidateQueries(['member.getGame']);
		},
		onError: (error) => {
			if (error instanceof Error) {
				setMessage(error.message);
			}
		},
	});

	const { data, isLoading: isLoadingGame } = trpc.useQuery(
		['member.getGame', { gameId, memberId: member?.id }],
		{
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

	const team = useMemo(
		() =>
			data?.team?.id
				? teamOptions.at(data.team.id % teamOptions.length)!
				: null,
		[data]
	);

	return (
		<>
			<Head>
				<title>Join Team</title>
				<meta name='description' content='Split into teams fast' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className={`h-[100vh] ${team?.color}`}>
				<main className='container mx-auto grid w-full max-w-xs justify-items-center gap-10 pt-10'>
					<div className='h-9'>
						{data?.game && (
							<h2 className='text-center text-3xl'>{data.game.name}</h2>
						)}
					</div>
					<h1 className='text-center text-5xl'>
						{team === null ? message : `Team ${team.name}`}
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
						<div className='w-full overflow-hidden rounded-lg bg-slate-600 shadow'>
							<div className='flex w-full justify-between bg-slate-700 px-4 py-2 text-center text-xl'>
								<h2>Members</h2>
								<h2>{data.team.members.length}</h2>
							</div>
							<ul className='w-full'>
								{data.team.members.map((member, i) => (
									<li
										className={`w-full px-4 py-1 text-lg ${
											i % 2 && 'bg-slate-500'
										}`}
										key={member.id}
									>
										{member.name}
									</li>
								))}
							</ul>
						</div>
					)}
				</main>
			</div>
		</>
	);
};

export default Join;

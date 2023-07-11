import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { trpc } from 'utils/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { teamOptions } from 'utils/teams';
import TextField from 'components/ui/TextField';
import { getSession } from 'next-auth/react';
import NavBar from 'components/ui/layout/NavBar';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	if (!session) return { redirect: { destination: '/' }, props: {} };
	return { props: {} };
};

const schema = z.object({
	name: z.string().min(4),
	teamCount: z.number().min(2).max(teamOptions.length),
	requireNames: z.boolean(),
});

export default function NewGame() {
	const router = useRouter();

	const { register, formState, handleSubmit } = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: { requireNames: true },
	});

	const { isLoading, mutate } = trpc.game.new.useMutation({
		onError: (error) => toast.error(error.message),
		onSuccess: (data) => {
			toast.success(`Game ${data.name} Created`);
			router.push(`/game/${data.id}`);
		},
	});

	return (
		<>
			<Head>
				<title>Teams</title>
				<meta name='description' content='Split into teams fast' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<NavBar />
			<main className='container mx-auto max-w-xs p-5'>
				<h1 className='mb-8 text-center text-3xl'>New Game</h1>

				<form
					onSubmit={handleSubmit((data) => mutate(data))}
					className='grid justify-items-center gap-1'
				>
					<TextField
						id='name'
						type='text'
						label='Name of Game'
						{...register('name')}
						error={formState.errors.name?.message}
					/>
					<TextField
						id='teamCount'
						type='number'
						label='Number of Teams'
						{...register('teamCount', { valueAsNumber: true })}
						error={formState.errors.teamCount?.message}
					/>
					<div className='flex w-full items-center justify-between'>
						<label htmlFor='requireNames'>Require Names</label>
						<input
							id='requireNames'
							type='checkbox'
							{...register('requireNames')}
							className='mr-1 h-5 w-5 rounded'
						/>
					</div>
					<button
						type='submit'
						disabled={!formState.isValid || isLoading}
						className='mt-4 w-2/3 rounded-lg bg-sky-600 py-2 shadow shadow-sky-600 hover:bg-sky-700 disabled:bg-sky-900 disabled:text-gray-400 disabled:shadow-none'
					>
						{isLoading ? 'Loading...' : 'Create'}
					</button>
				</form>
			</main>
		</>
	);
}

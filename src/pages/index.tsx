import type { NextPage } from 'next';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { trpc } from '../utils/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { teamOptions } from '../utils/teams';

const schema = z.object({
	name: z.string().min(4),
	teamCount: z.number().min(2).max(teamOptions.length),
});

type Schema = z.infer<typeof schema>;

const Home: NextPage = () => {
	const router = useRouter();
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm<Schema>({
		resolver: zodResolver(schema),
		mode: 'onChange',
	});
	const { isLoading, mutate } = trpc.useMutation(['game.new'], {
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(`Game ${data.name} Created`);
			router.push(`/game/${data.id}`);
		},
	});

	const onSubmit: SubmitHandler<Schema> = (data) => mutate(data);

	return (
		<>
			<Head>
				<title>Teams</title>
				<meta name='description' content='Split into teams fast' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='container mx-auto max-w-xs py-10'>
				<h1 className='mb-10 text-center text-3xl'>New Game</h1>

				<form onSubmit={handleSubmit(onSubmit)} className='grid justify-items-center gap-4'>
					<div className='w-full'>
						<label htmlFor='name' className='mb-2 block w-full'>
							Name of Game
						</label>
						<input
							{...register('name')}
							type='text'
							id='name'
							className='w-full rounded-lg text-black'
						/>
						<span className='text-sm text-red-500'>{errors.name?.message}</span>
					</div>
					<div className='w-full'>
						<label htmlFor='teams' className='mb-2 block w-full'>
							Number of Teams
						</label>
						<input
							{...register('teamCount', { valueAsNumber: true })}
							type='number'
							id='teams'
							className='w-full rounded-lg text-black'
						/>
						<span className='text-sm text-red-500'>{errors.teamCount?.message}</span>
					</div>
					<button
						type='submit'
						disabled={!isValid || isLoading}
						className='mt-4 w-2/3 rounded-lg bg-sky-600 py-2 shadow shadow-sky-600 hover:bg-sky-700 disabled:bg-sky-900 disabled:text-gray-400 disabled:shadow-none'
					>
						{isLoading ? 'Loading...' : 'Create'}
					</button>
				</form>
			</main>
		</>
	);
};

export default Home;

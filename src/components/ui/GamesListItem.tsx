import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Game } from '@prisma/client';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { trpc } from 'utils/trpc';

interface Props {
	game: Game;
}

export default function GamesListItem({ game }: Props) {
	const router = useRouter();
	const utils = trpc.useContext();
	const { isLoading, mutate } = trpc.useMutation(['game.delete'], {
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(`Deleted ${data.name}`);
			utils.invalidateQueries(['game.getAll']);
		},
	});

	return (
		<div className='flex h-full gap-4'>
			<button
				onClick={() => router.push(`/game/${game.id}`)}
				disabled={isLoading}
				className='flex w-full justify-between rounded-full bg-gray-700 px-8 py-4 transition ease-out 
        hover:scale-105 hover:bg-gray-600 active:scale-100 disabled:bg-gray-800'
			>
				<p>{game.name}</p>
				<div className='flex gap-4'>
					<p>{game.teamCount} Teams</p>
				</div>
			</button>
			<button
				onClick={() => mutate({ gameId: game.id })}
				disabled={isLoading}
				className='aspect-square h-full rounded-full bg-red-500 p-4 text-white 
        hover:scale-105 hover:bg-red-600 active:scale-100 active:bg-red-600 disabled:scale-100 disabled:bg-gray-800'
			>
				{isLoading ? <ArrowPathIcon className='animate-spin' /> : <TrashIcon />}
			</button>
		</div>
	);
}

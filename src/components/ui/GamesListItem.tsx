import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid';
import type { Game } from '@prisma/client';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { trpc } from 'utils/trpc';

interface Props {
	game: Game;
}

export default function GamesListItem({ game }: Props) {
	const utils = trpc.useContext();
	const { isLoading, mutate } = trpc.game.delete.useMutation({
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(`Deleted ${data.name}`);
			utils.game.getAll.invalidate();
		},
	});

	return (
		<div className='flex h-full gap-4'>
			<Link
				href={`/game/${game.id}`}
				className='flex min-w-0 flex-grow justify-between gap-4 rounded-full bg-gray-700 px-6 py-4 transition ease-out hover:bg-gray-600 active:scale-95 disabled:bg-gray-800'
			>
				<span className='truncate'>{game.name}</span>
				<span className='flex-shrink-0'>{game.teamCount} Teams</span>
			</Link>
			<button
				onClick={() => mutate({ gameId: game.id })}
				disabled={isLoading}
				className='aspect-square h-full rounded-full bg-red-500 p-4 text-white hover:bg-red-600 active:scale-95 active:bg-red-600 disabled:scale-100 disabled:bg-gray-800'
			>
				{isLoading ? <ArrowPathIcon className='animate-spin' /> : <TrashIcon />}
			</button>
		</div>
	);
}

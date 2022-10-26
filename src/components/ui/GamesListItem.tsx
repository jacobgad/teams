import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Game } from '@prisma/client';
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
			<Link href={`/game/${game.id}`} className='w-full'>
				<button
					disabled={isLoading}
					className='ease-outhover:bg-gray-600 flex w-full justify-between rounded-full bg-gray-700 px-8 py-4 transition active:scale-95 disabled:bg-gray-800'
				>
					<p>{game.name}</p>
					<div className='flex gap-4'>
						<p>{game.teamCount} Teams</p>
					</div>
				</button>
			</Link>
			<button
				onClick={() => mutate({ gameId: game.id })}
				disabled={isLoading}
				className='text-whitehover:bg-red-600 aspect-square h-full rounded-full bg-red-500 p-4 active:scale-95 active:bg-red-600 disabled:scale-100 disabled:bg-gray-800'
			>
				{isLoading ? <ArrowPathIcon className='animate-spin' /> : <TrashIcon />}
			</button>
		</div>
	);
}

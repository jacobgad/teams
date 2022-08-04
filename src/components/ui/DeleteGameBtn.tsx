import { RefreshIcon, TrashIcon } from '@heroicons/react/solid';
import { Game } from '@prisma/client';
import React from 'react';
import toast from 'react-hot-toast';
import { trpc } from 'utils/trpc';

interface Props {
	gameId: Game['id'];
}

export default function DeleteGameBtn({ gameId }: Props) {
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
		<button
			onClick={() => mutate({ gameId })}
			disabled={isLoading}
			className='aspect-square h-full rounded-full bg-red-500 p-4 text-white 
    hover:scale-105 hover:bg-red-600 active:scale-95 active:bg-red-600 disabled:scale-100 disabled:bg-gray-800'
		>
			{isLoading ? <RefreshIcon className='animate-spin' /> : <TrashIcon />}
		</button>
	);
}

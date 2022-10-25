import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function AuthButton() {
	const session = useSession();
	const router = useRouter();

	function handleOnClick() {
		if (session.status === 'loading') return;
		if (session.status === 'authenticated') {
			signOut();
			router.push('/');
		}
		const promise = signIn('google');
		toast.promise(promise, {
			loading: 'Checking with google...',
			success: 'Welcome',
			error: 'Oops there was an error',
		});
	}

	return (
		<button
			disabled={session.status === 'loading'}
			onClick={handleOnClick}
			className='flex h-10 w-24 justify-center rounded bg-sky-600 py-2 shadow hover:bg-sky-400 hover:text-black active:scale-95 disabled:scale-100 disabled:bg-gray-600 disabled:shadow-none'
		>
			{session.status === 'authenticated' && 'Sign Out'}
			{session.status === 'unauthenticated' && 'Sign In'}
			{session.status === 'loading' && (
				<ArrowPathIcon className='h-full animate-spin' />
			)}
		</button>
	);
}

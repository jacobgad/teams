import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

export default function SignInButton() {
	const session = useSession();

	function handleOnClick() {
		const promise = signIn('google');
		toast.promise(promise, {
			loading: 'Checking with google...',
			success: 'Welcome',
			error: 'Oops there was an error',
		});
	}

	return (
		<button
			onClick={handleOnClick}
			className='flex h-10 w-24 justify-center rounded bg-sky-600 py-2 shadow hover:bg-sky-400 hover:text-black active:scale-95 disabled:scale-100'
		>
			{session.status === 'unauthenticated' && 'Sign In'}
		</button>
	);
}

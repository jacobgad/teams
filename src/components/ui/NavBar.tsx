import { HomeIcon } from '@heroicons/react/24/solid';
import { signOut, signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function NavBar() {
	const { data: session } = useSession();
	const router = useRouter();

	return (
		<nav className='flex items-center justify-between bg-slate-800 py-2 px-4'>
			<Link href={session ? '/game' : '/'}>
				<button className='w-8 transition ease-in-out hover:scale-110 hover:text-sky-400 active:scale-100'>
					<HomeIcon />
				</button>
			</Link>
			{session && (
				<div className='flex items-center gap-4'>
					<Image
						src={
							session.user?.image
								? session.user.image
								: `https://avatars.dicebear.com/api/bottts/${
										session.user?.email?.split('@')[0]
								  }.svg`
						}
						width='40px'
						height='40px'
						className='rounded-full'
						alt='user image'
					/>
					<p>{session.user?.name}</p>
				</div>
			)}
			{session ? (
				<button
					onClick={() => router.push('/').then(() => signOut())}
					className='hover:text-bg-slate-800 rounded px-3 py-2 ring-1 ring-slate-400 
					hover:bg-slate-400 hover:bg-opacity-25'
				>
					Sign Out
				</button>
			) : (
				<button
					onClick={() => {
						const promise = signIn('google');
						toast.promise(promise, {
							loading: 'Checking with google...',
							success: 'Welcome',
							error: 'Oops there was an error',
						});
					}}
					className='rounded bg-sky-600 px-5 py-2 hover:bg-sky-400 hover:text-black'
				>
					Sign In
				</button>
			)}
		</nav>
	);
}

import { HomeIcon } from '@heroicons/react/24/solid';
import { signOut, signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function NavBar() {
	const session = useSession();

	return (
		<nav className='flex items-center justify-between bg-slate-800 py-2 px-4'>
			<Link href={session ? '/game' : '/'}>
				<button className='w-8 transition ease-in-out hover:text-sky-400 active:scale-95'>
					<HomeIcon />
				</button>
			</Link>
			{session.status === 'authenticated' && (
				<div className='flex items-center gap-4'>
					<Image
						src={
							session.data?.user?.image
								? session.data?.user.image
								: `https://avatars.dicebear.com/api/bottts/${
										session.data?.user?.email?.split('@')[0]
								  }.svg`
						}
						width='40px'
						height='40px'
						className='rounded-full'
						alt='user image'
					/>
					<p>{session.data?.user?.name}</p>
				</div>
			)}
			{session.status === 'authenticated' ? (
				<Link href={'/'}>
					<button
						onClick={() => signOut()}
						className='hover:text-bg-slate-800 ring-slate-40 rounded px-3 py-2 ring-1 hover:bg-slate-400 hover:bg-opacity-25 active:scale-95'
					>
						Sign Out
					</button>
				</Link>
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
					className='rounded bg-sky-600 px-5 py-2 hover:bg-sky-400 hover:text-black active:scale-95'
				>
					Sign In
				</button>
			)}
		</nav>
	);
}

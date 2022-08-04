import { HomeIcon } from '@heroicons/react/solid';
import { signOut, signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
	const { data: session } = useSession();

	return (
		<nav className='flex items-center justify-between bg-slate-800 py-2 px-4'>
			<Link href={'/'}>
				<button className='w-8 transition ease-in-out hover:scale-110 hover:text-sky-400 active:scale-95'>
					<HomeIcon />
				</button>
			</Link>
			{session && (
				<div className='flex items-center gap-4'>
					<Image
						src={session.user?.image ? session.user.image : ''}
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
					onClick={() => signOut()}
					className='rounded px-2 py-1 hover:bg-slate-400 hover:text-black'
				>
					Sign Out
				</button>
			) : (
				<button
					onClick={() => signIn()}
					className='rounded bg-sky-600 px-2 py-1 hover:bg-sky-400 hover:text-black'
				>
					Sign In
				</button>
			)}
		</nav>
	);
}

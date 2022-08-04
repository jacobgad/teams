import { signOut, signIn, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function NavBar() {
	const { data: session } = useSession();

	return (
		<nav className='flex items-center justify-between bg-slate-800 py-2 px-4'>
			{session && (
				<div className='flex items-center gap-4'>
					<Image
						src={session.user?.image ? session.user.image : ''}
						width='40px'
						height='40px'
						className='rounded-full'
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

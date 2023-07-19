import { HomeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import SignInButton from './SignInButton';
import UserMenu from './UserMenu';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

export default function NavBar() {
	const session = useSession();

	return (
		<nav className='flex h-14 items-center justify-between bg-slate-800 px-4'>
			<Link href={session ? '/game' : '/'}>
				<button className='w-8 transition ease-in-out hover:text-sky-400 active:scale-95'>
					<HomeIcon />
				</button>
			</Link>
			<p className='text-2xl'>Teams</p>
			{session.status === 'loading' && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='h-10 w-10 animate-pulse rounded-full bg-slate-400'
				/>
			)}
			{session.status === 'unauthenticated' && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					<SignInButton />
				</motion.div>
			)}
			{session.status === 'authenticated' && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='flex items-center'>
					<UserMenu />
				</motion.div>
			)}
		</nav>
	);
}

import { HomeIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import AuthButton from './AuthButton';

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
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='flex items-center gap-4'
				>
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
				</motion.div>
			)}
			<AuthButton />
		</nav>
	);
}

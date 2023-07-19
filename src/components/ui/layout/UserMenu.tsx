import { Menu } from '@headlessui/react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function UserMenu() {
	const session = useSession();
	const router = useRouter();

	const menuItems = [
		{
			id: 2,
			name: 'Sign Out',
			icon: <ArrowLeftOnRectangleIcon className='h-full' />,
			onClick: () => {
				if (session.status === 'authenticated') {
					signOut();
					router.push('/');
				}
			},
		},
	];

	return (
		<Menu as='div' className='relative inline-block h-10 text-left'>
			<Menu.Button>
				<Image
					src={
						session.data?.user?.image
							? session.data?.user.image
							: `https://avatars.dicebear.com/api/bottts/${session.data?.user?.email?.split(
									'@'
							  )[0]}.svg`
					}
					width={40}
					height={40}
					className='rounded-full'
					alt='user image'
				/>
			</Menu.Button>
			<Menu.Items
				as={motion.div}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className='absolute right-0 grid w-36 divide-y overflow-hidden rounded bg-slate-100 p-1 text-black shadow-lg'
			>
				<p className='rounded px-2 py-1 text-center font-medium'>{session.data?.user?.name}</p>
				{menuItems.map((menuItem) => (
					<Menu.Item key={menuItem.id}>
						{({ active }) => (
							<button
								onClick={menuItem.onClick}
								className={`flex items-center gap-3 rounded px-2 py-1 text-left ${
									active && 'bg-sky-600 text-white'
								}`}
							>
								<div className={`h-6 ${active && 'text-white'}`}>{menuItem.icon}</div>
								{menuItem.name}
							</button>
						)}
					</Menu.Item>
				))}
			</Menu.Items>
		</Menu>
	);
}

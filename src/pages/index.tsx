import type { NextPage } from 'next';
import Head from 'next/head';
import NavBar from 'components/ui/NavBar';
import Link from 'next/link';

interface ItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	href: string;
}

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Teams</title>
				<meta name='description' content='Split into teams fast' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<NavBar />
			<main className='container mx-auto max-w-2xl py-5 px-8'>
				<h1 className='mb-5 text-center text-3xl'>Teams</h1>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
					<Item label='My Games' href='/game' />
					<Item label='New Game' href='/game/new' />
					<Item label='Join Game' href='/game/join' disabled />
				</div>
			</main>
		</>
	);
};

function Item({ label, href, ...rest }: ItemProps) {
	return (
		<Link href={href}>
			<button
				{...rest}
				className='aspect-video w-full rounded-lg bg-sky-700 shadow-md shadow-black transition ease-in-out 
				hover:scale-105 active:scale-100 disabled:scale-100 disabled:bg-gray-700 disabled:shadow-none'
			>
				<p className='text-lg'>{label}</p>
			</button>
		</Link>
	);
}

export default Home;

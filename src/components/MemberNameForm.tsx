import TextField from './ui/TextField';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
	defaultName?: string;
	isLoading: boolean;
	onSubmit: (data: z.infer<typeof schema>) => void;
}

const schema = z.object({
	name: z.string().min(3),
});

export default function MemberNameForm(props: Props) {
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: { name: props.defaultName },
	});

	return (
		<form onSubmit={handleSubmit(props.onSubmit)} className='w-full'>
			<TextField id='name' type='text' {...register('name')} error={errors.name?.message} />
			<button
				type='submit'
				disabled={!isValid || props.isLoading}
				className='mt-4 w-full rounded-lg bg-sky-600 py-2 shadow shadow-sky-600 hover:bg-sky-700 disabled:bg-sky-900 disabled:text-gray-400 disabled:shadow-none'
			>
				{props.isLoading ? 'Loading...' : 'Join'}
			</button>
		</form>
	);
}

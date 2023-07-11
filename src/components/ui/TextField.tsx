import { forwardRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label?: string;
	error?: string;
}

export type Ref = HTMLInputElement;

const TextField = forwardRef<Ref, Props>(function TextField({ id, label, error, ...rest }, ref) {
	return (
		<div className='w-full'>
			<label htmlFor={id} className='mb-2 block w-full'>
				{label}
			</label>
			<input {...rest} ref={ref} id={id} className='w-full rounded-lg text-black' />
			<div className='h-5 px-1'>
				<span className='text-sm text-red-500'>{error}</span>
			</div>
		</div>
	);
});

export default TextField;

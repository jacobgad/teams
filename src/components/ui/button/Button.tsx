import { ArrowPathIcon } from '@heroicons/react/24/outline';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export type ButtonProps = {
	text: string;
	Icon?: React.ElementType;
} & VariantProps<typeof buttonStyles> &
	React.ComponentProps<'button'>;

const buttonStyles = cva(
	[
		'inline-flex items-center border border-transparent font-medium shadow-sm disabled:shadow-none',
		'focus:outline-none focus:ring-2 transition',
	],
	{
		variants: {
			variant: {
				primary:
					'bg-sky-600 text-sky-50 hover:bg-sky-700 disabled:bg-sky-900 disabled:hover:bg-sky-900 disabled:text-sky-600 focus:ring-sky-800',
				danger:
					'bg-red-500 text-red-50 hover:bg-red-600 disabled:bg-red-800 disabled:hover:bg-red-800 disabled:text-red-600 focus:ring-red-800',
			},
			size: {
				small: 'rounded px-2.5 py-1.5 text-xs',
				medium: 'rounded-md px-4 py-2 text-sm',
				large: 'rounded-md px-6 py-3 text-base',
			},
			fullWidth: {
				true: 'w-full',
			},
			isLoading: {
				true: 'justify-center shadow-none',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'medium',
		},
	}
);

const iconStyles = cva(['-ml-1 mr-3'], {
	variants: {
		size: {
			small: 'h-4 w-4',
			medium: 'h-5 w-5',
			large: 'h-6 w-6',
		},
	},
	defaultVariants: {
		size: 'medium',
	},
});

export default function Button({
	text,
	Icon,
	variant,
	size,
	fullWidth,
	isLoading,
	className,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			disabled={props.disabled || (isLoading ?? undefined)}
			className={buttonStyles({
				variant,
				size,
				fullWidth,
				isLoading,
				className,
			})}
		>
			<span className={`flex ${isLoading && 'opacity-0'}`}>
				{Icon && <Icon className={iconStyles({ size })} />}
				{text}
			</span>
			{isLoading && <ArrowPathIcon className='absolute h-5 animate-spin opacity-100' />}
		</button>
	);
}

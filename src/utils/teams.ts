export interface TeamOption {
	name: string;
	rgb: { r: number; g: number; b: number };
	color: {
		main: string;
		dark: string;
		divide: string;
	};
}

export const teamOptions: TeamOption[] = [
	{
		name: 'Slate',
		rgb: { r: 71, g: 85, b: 105 },
		color: {
			main: 'bg-slate-600',
			dark: 'bg-slate-700',
			divide: 'divide-slate-700',
		},
	},
	{
		name: 'Zinc',
		rgb: { r: 82, g: 82, b: 91 },
		color: {
			main: 'bg-zinc-600',
			dark: 'bg-zinc-700',
			divide: 'divide-zinc-700',
		},
	},
	{
		name: 'Stone',
		rgb: { r: 87, g: 83, b: 78 },
		color: {
			main: 'bg-stone-600',
			dark: 'bg-stone-700',
			divide: 'divide-stone-700',
		},
	},
	{
		name: 'Red',
		rgb: { r: 220, g: 38, b: 38 },
		color: {
			main: 'bg-red-600',
			dark: 'bg-red-700',
			divide: 'divide-red-700',
		},
	},
	{
		name: 'Orange',
		rgb: { r: 234, g: 88, b: 12 },
		color: {
			main: 'bg-orange-600',
			dark: 'bg-orange-700',
			divide: 'divide-orange-700',
		},
	},
	{
		name: 'Amber',
		rgb: { r: 217, g: 119, b: 6 },
		color: {
			main: 'bg-amber-600',
			dark: 'bg-amber-700',
			divide: 'divide-amber-700',
		},
	},
	{
		name: 'Yellow',
		rgb: { r: 202, g: 138, b: 4 },
		color: {
			main: 'bg-yellow-600',
			dark: 'bg-yellow-700',
			divide: 'divide-yellow-700',
		},
	},
	{
		name: 'Lime',
		rgb: { r: 101, g: 163, b: 13 },
		color: {
			main: 'bg-lime-600',
			dark: 'bg-lime-700',
			divide: 'divide-lime-700',
		},
	},
	{
		name: 'Green',
		rgb: { r: 22, g: 163, b: 74 },
		color: {
			main: 'bg-green-600',
			dark: 'bg-green-700',
			divide: 'divide-green-700',
		},
	},
	{
		name: 'Emerald',
		rgb: { r: 5, g: 150, b: 105 },
		color: {
			main: 'bg-emerald-600',
			dark: 'bg-emerald-700',
			divide: 'divide-emerald-700',
		},
	},
	{
		name: 'Teal',
		rgb: { r: 13, g: 148, b: 136 },
		color: {
			main: 'bg-teal-600',
			dark: 'bg-teal-700',
			divide: 'divide-teal-700',
		},
	},
	{
		name: 'Cyan',
		rgb: { r: 8, g: 145, b: 178 },
		color: {
			main: 'bg-cyan-600',
			dark: 'bg-cyan-700',
			divide: 'divide-cyan-700',
		},
	},
	{
		name: 'Sky',
		rgb: { r: 2, g: 132, b: 199 },
		color: {
			main: 'bg-sky-600',
			dark: 'bg-sky-700',
			divide: 'divide-sky-700',
		},
	},
	{
		name: 'Blue',
		rgb: { r: 37, g: 99, b: 235 },
		color: {
			main: 'bg-blue-600',
			dark: 'bg-blue-700',
			divide: 'divide-blue-700',
		},
	},
	{
		name: 'Indigo',
		rgb: { r: 79, g: 70, b: 229 },
		color: {
			main: 'bg-indigo-600',
			dark: 'bg-indigo-700',
			divide: 'divide-indigo-700',
		},
	},
	{
		name: 'Violet',
		rgb: { r: 124, g: 58, b: 237 },
		color: {
			main: 'bg-violet-600',
			dark: 'bg-violet-700',
			divide: 'divide-violet-700',
		},
	},
	{
		name: 'Purple',
		rgb: { r: 147, g: 51, b: 234 },
		color: {
			main: 'bg-purple-600',
			dark: 'bg-purple-700',
			divide: 'divide-purple-700',
		},
	},
	{
		name: 'Fuchsia',
		rgb: { r: 192, g: 38, b: 211 },
		color: {
			main: 'bg-fuchsia-600',
			dark: 'bg-fuchsia-700',
			divide: 'divide-fuchsia-700',
		},
	},
	{
		name: 'Pink',
		rgb: { r: 219, g: 39, b: 119 },
		color: {
			main: 'bg-pink-600',
			dark: 'bg-pink-700',
			divide: 'divide-pink-700',
		},
	},
	{
		name: 'Rose',
		rgb: { r: 255, g: 29, b: 72 },
		color: {
			main: 'bg-rose-600',
			dark: 'bg-rose-700',
			divide: 'divide-rose-700',
		},
	},
];

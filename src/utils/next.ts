export default function paramToString(param: string | string[] | undefined): string {
	if (!param) return '';
	if (typeof param === 'string') return param;
	if (param.length > 0) return param.at(-1) ?? '';
	return '';
}

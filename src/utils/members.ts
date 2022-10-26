export function isEqualObject(
	obj1: Record<string, unknown> | null,
	obj2: Record<string, unknown> | null
): boolean {
	if (JSON.stringify(obj1) === JSON.stringify(obj2)) return true;
	return false;
}

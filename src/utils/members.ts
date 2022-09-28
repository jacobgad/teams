export function isEqualObject(obj1: {} | null, obj2: {} | null): boolean {
	if (JSON.stringify(obj1) === JSON.stringify(obj2)) return true;
	return false;
}

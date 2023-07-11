import { useEffect, useState } from 'react';

const prefix = 'teams.gad.engineer.';

function getSavedValue<T>(key: string, initialValue: T) {
	if (typeof window === 'undefined') return initialValue;
	const valueString = localStorage.getItem(prefix + key);
	const savedValue = valueString ? JSON.parse(valueString) : null;
	if (savedValue !== null) return savedValue;
	if (initialValue instanceof Function) return initialValue();
	return initialValue;
}

export default function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => getSavedValue<T>(key, initialValue));

	useEffect(() => {
		localStorage.setItem(prefix + key, JSON.stringify(value));
	}, [value, key]);

	const state: [T, React.Dispatch<React.SetStateAction<T>>] = [value, setValue];
	return state;
}

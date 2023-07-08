import { describe, it, expect } from 'vitest';
import { getTeamTheme } from './getTeamTheme';

describe('Get next theme function', () => {
	it('should return teams of maximally different colors', () => {
		const theme1 = getTeamTheme(0, 0);
		expect(theme1.name).toBe('Slate');

		const theme2 = getTeamTheme(0, 1);
		expect(theme2.name).toBe('Yellow');

		const theme3 = getTeamTheme(0, 2);
		expect(theme3.name).toBe('Cyan');
	});

	it('should vary the start color based on the game index', () => {
		const theme1 = getTeamTheme(3, 0);
		expect(theme1.name).toBe('Red');

		const theme2 = getTeamTheme(4, 0);
		expect(theme2.name).toBe('Orange');

		const theme3 = getTeamTheme(5, 0);
		expect(theme3.name).toBe('Amber');
	});
});

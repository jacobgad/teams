import { describe, it, expect } from 'vitest';
import { RGBValue, deltaE } from './deltaE';

describe('Delta-E color comparison function', () => {
	const color1: RGBValue = { r: 255, g: 255, b: 255 };
	const color2: RGBValue = { r: 0, g: 0, b: 0 };

	const color3: RGBValue = { r: 255, g: 80, b: 33 };
	const color4: RGBValue = { r: 120, g: 16, b: 178 };

	it('should be zero if same color', () => {
		const distance = deltaE(color1, color1);
		expect(distance).toBe(0);
	});

	it('should be zero if same color', () => {
		const distance = deltaE(color1, color2);
		expect(distance.toFixed(3)).toBe('100.000');
	});

	it('should calculate the correct delta-E based on known value', () => {
		const distance = deltaE(color3, color4);
		expect(distance.toFixed(3)).toBe('58.798');
	});
});

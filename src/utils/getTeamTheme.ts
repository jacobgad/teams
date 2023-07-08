import { deltaE } from './deltaE';
import { TeamOption, teamOptions } from './teams';

export function getTeamTheme(gameId: number, teamNumber: number) {
	const rootTheme = teamOptions[gameId % teamOptions.length];
	if (!rootTheme) throw new Error('Unable to find root theme');
	if (teamNumber === 0) return rootTheme;

	const activeThemes: TeamOption[] = [rootTheme];
	for (let i = 0; i < teamNumber; i++) {
		const theme = getNextTheme(activeThemes);
		activeThemes.push(theme);
	}

	const teamTheme = activeThemes.at(-1);
	if (!teamTheme) throw new Error('No active teams');
	return teamTheme;
}

function getNextTheme(activeThemes: TeamOption[]) {
	const availableThemes = teamOptions.filter(
		(team) => !activeThemes.find((theme) => theme.name === team.name)
	);

	let nextTheme = { theme: activeThemes[0], distance: 0 };

	for (const availableTheme of availableThemes) {
		let distance = 0;
		for (const activeTheme of activeThemes) {
			distance += deltaE(availableTheme.rgb, activeTheme.rgb);
		}
		if (distance > nextTheme.distance)
			nextTheme = { theme: availableTheme, distance };
	}

	if (!nextTheme.theme) throw new Error('Next theme not found');
	return nextTheme.theme;
}

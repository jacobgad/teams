/** @type {import("prettier").Config} */
module.exports = {
	tabWidth: 2,
	useTabs: true,
	printWidth: 100,
	semi: true,
	trailingComma: 'es5',
	arrowParens: 'always',
	singleQuote: true,
	jsxSingleQuote: true,
	plugins: [require.resolve('prettier-plugin-tailwindcss')],
};

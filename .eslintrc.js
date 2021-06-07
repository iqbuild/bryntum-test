module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'@vue/airbnb',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'import/no-extraneous-dependencies': 0,
		'vue/component-definition-name-casing': [1, 'kebab-case'],
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error'],
		'@typescript-eslint/ban-ts-comment': 0,
		"@typescript-eslint/no-this-alias": [
			"error",
			{
				"allowDestructuring": true,
				"allowedNames": ["self"]
			}
		]
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)',
			],
			env: {
				jest: true,
			},
		},
	],
};

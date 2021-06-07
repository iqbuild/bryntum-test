module.exports = {
	preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'^.+\\.[tj]sx?$': 'babel-jest',
		'^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
	},
	snapshotSerializers: ['jest-serializer-vue'],
};

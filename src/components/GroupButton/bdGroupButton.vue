<template>
	<div class="bd-group-btn">
		<Group
			class="group"
			v-model:value="x"
			@change="options[x].onPress()"
			:buttonStyle="buttonType"
		>
			<Button
				class="button"
				v-for="(item, index) in options"
				:key="index"
				:value="index"
				>{{ item.label }}</Button
			>
		</Group>
	</div>
</template>
<script lang="ts">
import { Radio } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';

const { Group, Button } = Radio;

interface Options {
	label: string;
	onPress: () => void;
}

export default defineComponent({
	name: 'bd-group-btn',

	props: {
		buttonType: { type: String, default: 'default' },
		options: { type: Array as () => Options[] },
	},

	components: {
		Group,
		Button,
	},

	setup(props) {
		return { x: ref(0) };
	},
});
</script>

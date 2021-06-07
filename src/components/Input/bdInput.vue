<template>
	<div class="bd-input">
		<Input
			:placeholder="placeholder"
			v-model:value="textValue"
			:disabled="disabled"
			@input="input"
		>
			<template v-if="suffixIcon" #suffix>
				<Icon
					:name="suffixIcon.name"
					:family="suffixIcon.family"
					:type="suffixIcon.type"
					:size="suffixIcon.size"
					:color="suffixIcon.color"
				/>
			</template>
			<template v-if="prefixIcon" #prefix>
				<Icon
					:name="prefixIcon.name"
					:family="prefixIcon.family"
					:type="prefixIcon.type"
					:size="prefixIcon.size"
					:color="prefixIcon.color"
				/>
			</template>
		</Input>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Input } from 'ant-design-vue';
import Icon from '../Icon/bdIcon.vue';

export default defineComponent({
	name: 'bd-input',

	components: { Input, Icon },

	props: {
		placeholder: { type: String },
		value: { type: String, required: true },
		disabled: { type: Boolean },
		suffixIcon: { type: Object },
		prefixIcon: { type: Object },
	},

	setup(props, { emit }) {
		const textValue = ref(props.value);
		const input = (e: Event) => {
			emit('onChange', (e.target as HTMLInputElement).value);
		};

		return { input, textValue };
	},
});
</script>

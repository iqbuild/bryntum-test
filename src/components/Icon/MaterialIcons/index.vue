<template>
	<i
		:class="[type]"
		:style="{
			color,
			fontSize: `${size}px`,
		}"
	>
		<slot>{{ name }}</slot>
	</i>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

enum Type {
	MaterialIcons = 'material-icons',
	MaterialIconsOutline = 'material-icons-outlined',
}

export default defineComponent({
	name: 'material-icon',

	props: {
		name: { type: String, required: true },
		color: { type: String, default: null },
		type: {
			type: String,
			default: Type.MaterialIcons,
			validator: (value: Type) => Object.values(Type).includes(value),
		},
		size: {
			type: Number,
			default: 16,
		},
	},
});
</script>

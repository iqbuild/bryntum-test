<template>
	<i
		:class="[type, `fa-${name}`]"
		:style="{
			color,
			fontSize: `${size}px`,
		}"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

enum Type {
	fas = 'fas',
	fab = 'fab',
	far = 'far',
	fal = 'fal',
	fad = 'fad',
}

export default defineComponent({
	name: 'font-awesome',

	props: {
		name: {
			type: String,
			required: true,
		},
		color: { type: String, default: null },
		type: {
			type: String,
			default: Type.fas,
			validator: (value: Type) => Object.values(Type).includes(value),
		},
		size: {
			type: Number,
			default: 22,
		},
	},
});
</script>

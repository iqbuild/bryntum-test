<template>
	<template v-if="family === 'FontAwesome'">
		<FontAwesome :name="name" :type="type" :size="size" :color="color" />
	</template>
	<template v-else>
		<MaterialIcons :name="name" :type="type" :size="size" :color="color" />
	</template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FontAwesome from './FontAwesome/index.vue';
import MaterialIcons from './MaterialIcons/index.vue';

enum Family {
	'FontAwesome',
	'MaterialIcons',
}

export default defineComponent({
	name: 'bd-icon',

	components: {
		FontAwesome,
		MaterialIcons,
	},

	props: {
		name: {
			type: String,
			required: true,
		},
		family: {
			type: String,
			default: Family.FontAwesome,
			validator: (value: Family) => Object.values(Family).includes(value),
		},
		type: {
			type: String,
		},
		size: {
			type: Number,
			default: 22,
			required: false,
		},
		color: {
			type: String,
			default: '#000000',
		},
	},
});
</script>

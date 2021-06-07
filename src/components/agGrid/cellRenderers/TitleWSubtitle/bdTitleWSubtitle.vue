<template>
	<div
		class="bd-title-w-subtitle-cell-renderer"
		:class="{
			'reverse-row': icon && icon.position === 'right',
		}"
	>
		<Icon
			v-if="icon"
			:icon="icon.name"
			family="FontAwesome"
			:color="icon.color"
			style="cursor: pointer"
			:style="{
				'margin-left': icon.position === 'right' ? '1rem' : '0',
				'margin-right': icon.position === 'left' ? '1rem' : '0',
			}"
			@click="() => icon.onPress()"
		/>
		<div class="labels-container">
			<span class="title">{{ title }}</span>
			<span>{{ subtitle }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { ICellRendererParams } from 'ag-grid-community';
import { defineComponent, PropType } from 'vue';
import Icon from '../../../Icon/bdIcon.vue';
import './styles.scss';

interface IIcon {
	name: string;
	position: 'right' | 'left';
	color: string;
	onPress: () => void;
}

const DEFAULT_ICON = {
	name: '',
	position: 'left',
	color: '#1285FF',
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onPress: () => {},
};

export default defineComponent({
	name: 'title-with-subtitle-cell-renderer',

	components: {
		Icon,
	},

	props: {
		params: {
			type: Object as PropType<ICellRendererParams>,
		},
	},

	constants: {
		DEFAULT_ICON,
	},

	computed: {
		title(): string {
			return this.params?.value?.title ?? '';
		},

		subtitle(): string {
			return this.params?.value?.subtitle ?? '';
		},

		icon(): IIcon | undefined {
			const icon = this.params?.value.icon;

			if (icon) {
				if (!icon.position) {
					icon.position = DEFAULT_ICON.position;
				}
				if (!icon.color) {
					icon.color = DEFAULT_ICON.color;
				}
				if (!icon.onPress) {
					icon.onPress = DEFAULT_ICON.onPress;
				}

				return icon;
			}

			return undefined;
		},
	},
});
</script>

<template>
	<div class="bd-tabs">
		<Tabs v-model:activeKey="activeKey" @change="options[activeKey].onPress()">
			<TabPane
				v-for="(tab, index) in tabList"
				:key="index"
				:tab="tab.label"
				class="bd-tab-pane"
			></TabPane>
		</Tabs>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { Tabs } from 'ant-design-vue';

const { TabPane } = Tabs;

interface Options {
	label: string;
	onPress: () => void;
}

export default defineComponent({
	name: 'bd-tabs',

	components: { Tabs, TabPane },

	props: {
		options: {
			type: Array as () => Options[],
			default: () => {
				return [];
			},
		},

		keyIndex: {
			type: Number,
			default: 0,
		},
	},

	setup(props) {
		const getValidatedLabel = (label: string): string => {
			return label.length <= 12 ? label : `${label.substr(0, 12)}...`;
		};

		const tabList = props.options?.map((tab) => {
			const newTab = { ...tab };
			newTab.label = getValidatedLabel(newTab.label);
			return newTab;
		});

		const activeKey = ref(props.keyIndex);
		const tabIndex = computed(() => props.keyIndex);

		watch(tabIndex, () => {
			activeKey.value = tabIndex.value;
		});

		return {
			activeKey,
			tabList,
		};
	},
});
</script>

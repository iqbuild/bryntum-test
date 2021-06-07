<template>
	<div class="bd-dropdown-btn">
		<Dropdown class="dropdown">
			<a class="ant-dropdown-link" @click.prevent>
				{{ label }}
				<DownOutlined />
			</a>
			<template #overlay>
				<Menu>
					<Item v-for="(item, index) in options" :key="index">
						<a @click="item.onPress()" href="javascript:;">{{ item.label }}</a>
					</Item>
				</Menu>
			</template>
		</Dropdown>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
import { Dropdown, Menu } from 'ant-design-vue';

const { Item } = Menu;

interface Options {
	label: string;
	onPress: () => void;
}

export default defineComponent({
	name: 'bd-dropdown-btn',

	props: {
		label: {
			type: String,
			default: 'Más',
		},
		options: { type: Array as () => Options[] },
	},

	components: {
		DownOutlined,
		Dropdown,
		Item,
		Menu,
	},

	setup(props) {
		if (props.label.length > 12) {
			const labell = `${props.label.substring(0, 9)}...`;
			return { label: labell };
		}
	},
});
</script>

<template lang="pug">
f7-page
	f7-list
		f7-list-item(
			title="Описание"
			view=".view-main"
			link="/about/"
			panel-close="left"
		)
		f7-list-item(
			title="Настройки"
			view=".view-main"
			link="/form/"
			panel-close="left"
		)
		f7-list-item(
			v-if="isValidDate"
			title="Календарь"
			view=".view-main"
			link="/calendar/"
			panel-close="left"
		)
		f7-list-item(
			title="Секунды"
			view=".view-main"
			link="https://ilushinvanya.github.io/linear-clock/"
			external
			target="_blank"
			panel-close="left"
		)
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'framework7-vue';
import { isValid } from 'date-fns'

export default {
	setup() {
		const storeBirthday = useStore('birthday');
		const isValidDate = computed(() => {
			return isValid(storeBirthday.value);
		});
		return {
			isValidDate,
		}
	},
}
</script>

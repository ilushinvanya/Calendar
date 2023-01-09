<template lang="pug">
f7-page
	f7-list
		f7-list-item(
			title="Описание"
			link="/"
			view=".view-main"
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
			title="Мгновении"
			view=".view-main"
			link="/timer/"
			panel-close="left"
		)
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'framework7-vue';
import isValid from 'date-fns/isValid'
export default {
	setup() {
		const storeBirthday = useStore('birthday');
		const isValidDate = computed(() => {
			return isValid(storeBirthday.value);
		});
		// console.log(isValidDate.value);
		return {
			isValidDate,
		}
	},
}
</script>

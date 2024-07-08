<template lang="pug">
f7-page(name='form')
	f7-navbar
		f7-nav-left
			f7-link(
				icon-ios='f7:menu'
				icon-aurora='f7:menu'
				icon-md='material:menu'
				panel-open='left'
			)
		f7-nav-title Настройки
	.grid.medium-grid-cols-3
		div
		div
			f7-list.no-margin-horizontal(
				strong-ios dividers-ios inset-ios
				form
				:inline-labels="isDesktop"
				no-hairlines
			)
				f7-list-input.no-margin-horizontal(
					:value="[birthday]"
					label="День рождения"
					type="datepicker"
					:calendar-params="{ maxDate: new Date(), dateFormat: 'dd.mm.yyyy' }"
					@calendar:change="onBirthdayChange"
				)
				f7-list-input.no-margin-horizontal(
					v-model:value="gender"
					label="Выбор пола"
					type="select"
				)
					option(value="2") Мужской
					option(value="1") Женский
					option(value="0") Не знаю

				f7-list-input(
					v-model:value="allYears"
					label="Сколько показать всего лет"
				)
				f7-list-input(
					v-model:value="measure"
					label="В чем измерять"
					type="select"
				)
					option(value="months") Месяцы
					option(value="weeks") Недели
	.grid.grid-cols-3.grid-gap
		div
		.margin-horizontal-half
			f7-button(
				fill
				@click='saveData'
			) Сохранить
</template>
<script>
	import { ref } from 'vue';
	import { useStore } from 'framework7-vue';
	import { getDevice } from 'framework7';
	import store from '../js/store'
	export default {
		props: {
			f7router: Object,
		},
		setup(props) {
			const device = getDevice();
			const storeBirthday = useStore('birthday');
			const storeGender = useStore('gender');
			const storeAllYears = useStore('allYears');
			const storeMeasure = useStore('measure');

			let gender = ref(storeGender);
			let birthday = ref(storeBirthday);
			const allYears = ref(storeAllYears);
			const measure = ref(storeMeasure);

			const saveData = () => {
				store.dispatch('setBirthday', new Date(birthday.value));
				store.dispatch('setGender', +gender.value);
				store.dispatch('setMeasure', measure.value);
				store.dispatch('setAllYears', +allYears.value);
				props.f7router.navigate('/calendar/');
			}
			const onBirthdayChange = (value) => {
				birthday.value = value[0];
			}
			return {
				isMobile: !device.desktop,
				isDesktop: device.desktop,
				allYears,
				birthday,
				gender,
				measure,
				saveData,
				onBirthdayChange,
			};
		},
	};
</script>

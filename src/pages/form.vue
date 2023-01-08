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
	f7-list(
		:style="isDesktop ? 'width: 60%; left: 20%' : ''"
		form
		:inline-labels="isDesktop"
		no-hairlines
	)
		f7-list-input(
			:value="[birthday]"
			label="День рождения"
			type="datepicker"
			outline
			:calendar-params="{ maxDate: new Date(), dateFormat: 'dd.mm.yyyy' }"
			@calendar:change="onBirthdayChange"
		)
		f7-list-input(
			v-model:value="gender"
			label="Выбор пола"
			type="select"
			outline
		)
			option(value="2") Мужской
			option(value="1") Женский
			option(value="0") Не знаю

		f7-list-input(
			v-model:value="allYears"
			label="Сколько показать всего лет"
			outline
		)
		f7-list-input(
			v-model:value="measure"
			label="В чем измерять"
			type="select"
			outline
		)
			option(value="months") Месяцы
			option(value="weeks") Недели
	//f7-block-title Выбор пола
	//f7-list
	//	f7-list-item(radio radio-icon="end" title="Мужской" name="gender" v-model:checked="gender2" value="2" input-value="2")
	//	f7-list-item(radio radio-icon="end" title="Женский" name="gender" v-model:checked="gender1" value="1" input-value="1")
	//	f7-list-item(radio radio-icon="end" title="Не знаю" name="gender" v-model:checked="gender0" value="0" input-value="0")
	//f7-block-title В чем измерять один год
	//f7-list
	//	f7-list-item(radio radio-icon="end" title="Недели" text="Lor" name="measures"  value="weeks" input-value="weeks")
	//	f7-list-item(radio radio-icon="end" title="Месяцы" text="Lor" name="measures"  value="months" input-value="months")
	f7-row
		f7-col
		f7-col
			f7-button(
				fill
				@click='saveData'
			) Сохранить
		f7-col
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
			let birthday = storeBirthday.value;
			const allYears = ref(storeAllYears);
			const measure = ref(storeMeasure);

			const saveData = () => {
				store.dispatch('setBirthday', new Date(birthday));
				store.dispatch('setGender', +gender.value);
				store.dispatch('setMeasure', measure.value);
				store.dispatch('setAllYears', +allYears.value);
				props.f7router.navigate('/calendar/');
			}
			const onBirthdayChange = (value) => {
				birthday = value;
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

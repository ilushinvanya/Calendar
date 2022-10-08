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
	f7-block(strong no-hairlines)
		f7-list(form inline-labels no-hairlines)
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
				label="Пол"
				type="select"
				outline
			)
				option(value="2") Мужской
				option(value="1") Женский
				option(value="0") Не знаю
			f7-list-input(
				v-model:value="allYears"
				label="Сколько лет показывать"
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
				option(value="moments") Мгновения
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
	import store from '../js/store'
	// import format from 'date-fns/format'
	// import parse from 'date-fns/parse';
	// import isValid from 'date-fns/isValid'
	export default {
		props: {
			f7router: Object,
		},
		setup(props) {
			const storeBirthday = useStore('birthday');
			const storeGender = useStore('gender');
			const storeAllYears = useStore('allYears');
			const storeMeasure = useStore('measure');

			const gender = ref(storeGender);
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
				allYears,
				birthday,
				gender,
				measure,
				saveData,
				onBirthdayChange
			};
		},
	};
</script>

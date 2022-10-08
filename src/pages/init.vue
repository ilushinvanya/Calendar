<template lang="pug">
f7-page(name='init')
</template>
<script>
// import { onMounted } from 'vue';
import parse from 'date-fns/parse'
import isValid from 'date-fns/isValid'
import store from '../js/store';
import bridge from '@vkontakte/vk-bridge';
export default {
	props: {
		f7router: Object,
	},
	setup(props) {
		async function initBridge() {
			await bridge.send('VKWebAppInit', {});
			try {
				const userInfo = await bridge.send('VKWebAppGetUserInfo')
				// console.log(userInfo);
				if(userInfo.bdate) {
					const parseBDate = parse(userInfo.bdate, 'dd.M.yyyy', new Date());
					if(isValid(parseBDate)) {
						await store.dispatch('setBirthday', parseBDate);
					}
				}
				if(userInfo.sex) {
					await store.dispatch('setGender', userInfo.sex);
				}
			}
			catch (e) {
				console.error("Ошибка: " + e.error_type, e.error_data);
			}

			// если первый раз то в описание
			// в описании смотрим заполнены ли данные
			// если не первый раз то тут смотрим на заполнение данных
			props.f7router.navigate('/about/');
		}
		initBridge();
	},
}
</script>

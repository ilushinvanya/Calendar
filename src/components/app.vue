<template lang="pug">
f7-app(v-bind='f7params')
	f7-panel(
		left
		cover
	)
		f7-view
			Menu
	f7-view(
		main
		url='/'
	)
</template>
<script>
	import routes from '../js/routes.js';
	import store from '../js/store';
	import Menu from '../pages/menu.vue';
	export default {
		components: { Menu },
		setup() {
			const f7params = {
				name: 'Calendar of your life', // App name
				theme: 'auto', // Automatic theme detection
				store: store,
				routes: routes,
				serviceWorker: process.env.NODE_ENV ==='production' ? {
					path: '/service-worker.js',
				} : {},
			};
			return {
				f7params
			}
		},
	}
</script>

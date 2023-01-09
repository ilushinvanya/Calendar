import Calendar from '../pages/calendar.vue';
import Form from '../pages/form.vue';
import Timer from '../pages/timer.vue';

import NotFoundPage from '../pages/404.vue';

const routes = [
	{
		path: '/',
		// component: Init,
		redirect: '/form',
	},
	{
		path: '/calendar',
		component: Calendar,
	},
	{
		path: '/form',
		component: Form,
	},
	{
		path: '/timer',
		component: Timer,
	},
	{
		path: '(.*)',
		component: NotFoundPage,
	},
];

export default routes;

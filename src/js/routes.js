import Calendar from '../pages/calendar.vue';
import About from '../pages/about.vue';
import Form from '../pages/form.vue';
import Timer from '../pages/timer.vue';
import Init from '../pages/init.vue';

import NotFoundPage from '../pages/404.vue';

const routes = [
	{
		path: '/',
		// component: Init,
		redirect: '/about',
	},
	{
		path: '/calendar',
		component: Calendar,
	},
	{
		path: '/about',
		component: About,
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

import Calendar from '../pages/calendar.vue';
import Form from '../pages/form.vue';
import About from '../pages/about.vue';

import NotFoundPage from '../pages/404.vue';

const routes = [
	{
		path: '/',
		redirect: '/form',
	},
	{
		path: '/about',
		component: About,
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
		path: '(.*)',
		component: NotFoundPage,
	},
];

export default routes;

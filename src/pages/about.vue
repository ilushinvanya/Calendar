<template lang="pug">
f7-page(name="about")
	f7-navbar
		f7-nav-left
			f7-link(
				icon-ios='f7:menu'
				icon-aurora='f7:menu'
				icon-md='material:menu'
				panel-open='left'
			)
		f7-nav-title Описание
	f7-block
		.grid.medium-grid-cols-3
			div
			div
				iframe(
					width="560" height="315"
					src="https://www.youtube.com/embed/KGfFunFV2Ck"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				)
			div
		p
		f7-link(href="https://interesno.co/myself/5ec6770b787b" target="_blank" external) Референс вдохновение
		p
		f7-link(href="https://irinaberg.com/zhizn-v-nedelyax-prostoj-kalendar-dlya-moshhnoj-motivacii/" target="_blank" external) Интересное описание
		p
		p Календарь жизни в неделях — это мощный инструмент для тех, кто стремится жить осознанно и максимально использовать каждую неделю своей жизни.
		p Концепция календаря жизни в неделях основывается на идее, что визуализация времени может помочь людям лучше понять и ценить его. Вот несколько ключевых аспектов этой идеи:
		ul
			li
				strong Визуализация:
				span Календарь обычно представлен в виде сетки, где каждая ячейка соответствует одной неделе жизни. Чаще всего сетка рассчитана на 90 лет, что составляет около 4680 недель.
			li
				strong Осознание времени:
				span Видя перед собой всю свою жизнь в виде ячеек, человек начинает лучше осознавать, сколько времени уже прошло и сколько еще остается. Это может вызвать глубокие размышления о том, как он проводит свое время.
			li
				strong Мотивация:
				span Понимание того, что каждая неделя уникальна и неповторима, может мотивировать людей ставить перед собой цели, планировать свои действия и стремиться к самореализации.

	f7-block
		.grid.medium-grid-cols-2.grid-gap
			div
				f7-button(fill href="/form/") Перейти в настройки
			div
				f7-button(
					v-if="isValidDate"
					fill
					href="/calendar/"
				) Перейти в календарь
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'framework7-vue';
import { isValid } from 'date-fns'

const storeBirthday = useStore('birthday');
const isValidDate = computed(() => {
	return isValid(storeBirthday.value);
});
</script>

<style lang="stylus">
iframe
	width 100%
	height calc(calc(100vw / 3) / 1.7)
	@media (max-width: 768px)
		height calc(100vw / 1.7)
</style>

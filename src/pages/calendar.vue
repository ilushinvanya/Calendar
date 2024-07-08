<template lang="pug">
f7-page(name='calendar')
	f7-navbar
		f7-nav-left
			f7-link(
				icon-ios='f7:menu'
				icon-aurora='f7:menu'
				icon-md='material:menu'
				panel-open='left'
			)
		f7-nav-title Жизнь {{dates.length - 2}}-летнего человека в {{isWeeks ? 'неделях' : 'месяцах'}}
	// Page content
	f7-block
		f7-range.margin-bottom(
			:min="10"
			:max="100"
			:step="1"
			v-model:value="containerWidth"
		)
		.calendar-wrapper(
			:style="`width: ${containerWidth}%; left: ${containerLeft}%`"
		)
			div.years-wrapper
				div.year-row(v-for="(year, index) in dates")
					.age {{index - 1}}
					.dots-wrapper
						.dot(
							v-for="dot in year"
							:style="{ backgroundColor: dot.color, width: dotWidth, paddingTop: dotPaddingTop }"
							:class="{ 'open': dot.clickable }"
							:msg="dot.msg"
						)

</template>
<script>
	import { ref, computed } from 'vue';
	import { useStore } from 'framework7-vue';
	import { getDevice } from 'framework7';
	import {
		addYears,
		subDays,
		subMonths,
		format,
		eachMonthOfInterval,
		eachWeekOfInterval,
		isWithinInterval,
		endOfDay
	} from 'date-fns'

	export default {
		setup() {
			const device = getDevice();
			const storeBirthday = useStore('birthday');
			const storeGender = useStore('gender');
			const storeAllYears = useStore('allYears');
			const storeMeasure = useStore('measure');
			const allYears = storeAllYears.value + 2;
			const malePension = 65;
			const femalePension = 60;
			const firstYear = storeBirthday.value.getFullYear() - 2;

			const isMonths = storeMeasure.value === 'months';
			const isWeeks = storeMeasure.value === 'weeks';
			const dotWidth = isWeeks ? 'calc(100% / 52)' : isMonths ? 'calc(100% / 12)' : '';
			const dotPaddingTop = isWeeks ? '2%' : isMonths ? '8%' : '';

			const bDate = storeBirthday.value ?? new Date();
			const nowDate = new Date();

			const bDateMinusNineMonths = subMonths(bDate, 9);
			const bDateMinusOneYear = subMonths(bDateMinusNineMonths, 3);
			const dayOfMalePension = addYears(bDate, malePension);
			const dayOfFemalePension = addYears(bDate, femalePension);
			let allDates = [];
			for(let i = 0; i < allYears; i++) {
				const nowYear = addYears(bDateMinusOneYear, i);
				const addYear = addYears(bDateMinusOneYear, i + 1);
				if(isMonths) {
					allDates.push(eachMonthOfInterval({
						start: nowYear,
						end: addYear,
					}));
				}
				if(isWeeks) {
					allDates.push(eachWeekOfInterval({
						start: nowYear,
						end: addYear,
					}, {
						weekStartsOn: 1
					}));
				}
			}

			let color = '#eaeaea'
			const allUnits = isMonths ? 12 : isWeeks ? 52 : 0;
			const dateMsgFormat = isMonths ? 'MM.yyyy' : 'dd.MM.yyyy';
			const datesArray = allDates.map(year => {
				return year.filter((week, index) => index < allUnits).map((date, index, array) => {
					let localColor = color;
					let msg = format(new Date(date), dateMsgFormat);
					let clickable = false;
					const startWeek = date;
					if(!array[index + 1]) return {
						date,
						msg,
						color,
					}
					const endWeek = endOfDay(subDays(array[index + 1], 1));

					const isPregnancy = isWithinInterval(bDateMinusNineMonths, {
						start: startWeek,
						end: endWeek
					});
					const isBirthDay = isWithinInterval(bDate, {
						start: startWeek,
						end: endWeek
					});
					const nowDay = isWithinInterval(nowDate, {
						start: startWeek,
						end: endWeek
					});
					const isMalePension = isWithinInterval(dayOfMalePension, {
						start: startWeek,
						end: endWeek
					});
					const isFemalePension = isWithinInterval(dayOfFemalePension, {
						start: startWeek,
						end: endWeek
					});
					if (isPregnancy) {
						localColor = 'gray';
						msg += '\nза 9 месяцев до твоего рождения';
						clickable = true;
					}
					if (isBirthDay) {
						color = '#bfd6bf';
						localColor = '#c0f6c0';
						msg += '\nТы родился';
						clickable = true;
					}
					if (nowDay) {
						color = '#eae7e7';
						localColor =  '#d5d550';
						msg += '\nСегодня';
						clickable = true;
					}
					if (isMalePension && storeGender.value === 2) {
						localColor = '#2196f3';
						msg += '\nТы начнешь получать пенсию';
						clickable = true;
					}
					if (isFemalePension && storeGender.value === 1) {
						localColor = '#ff2d55';
						msg += '\nТы начнешь получать пенсию';
						clickable = true;
					}

					return {
						date,
						msg,
						color: localColor,
						clickable,
					}
				})
			});

			const containerWidth = ref(100);
			const containerLeft = computed(() => {
				return (100 - containerWidth.value)/2
			});
			return {
				isMobile: !device.desktop,
				isDesktop: device.desktop,
				dates: datesArray,
				allYears,
				firstYear,
				dotWidth,
				dotPaddingTop,
				isMonths,
				isWeeks,
				containerWidth,
				containerLeft,
			}
		}
	}
</script>

<style lang="stylus">
.range-slider
	align-self: start;
.calendar-wrapper
	display flex
	position relative
	.age
		width 2vw
		font-size 1vw
		text-align right
		display flex
		align-items center
	.years-wrapper
		width 100%
		.year-row
			display flex
			.dots-wrapper
				width 100%
				display flex
				align-items center
				&:hover .dot
					box-shadow inset 0 0 0 2px #dedddd
				.dot
					box-shadow inset 0 0 0 1px #fff
					position relative
					span
						text-align: center;
						display: block;
						line-height: 14px;
						color: #000000;
					&:before
						content attr(msg)
						position absolute
						border 1px white solid
						background rgba(40, 40, 40, 0.9)
						color white
						z-index 9999
						display none
						text-wrap nowrap
						white-space pre
						padding 6px 10px;
						top 100%
						left 50%
						transform translateX(-14%)
						pointer-events none
						border-radius 10px
					&:after
						content ''
						position absolute
						opacity 0
						border 4px transparent solid
						border-bottom 4px rgba(40, 40, 40, 0.9) solid
						color white
						z-index 9999
						pointer-events none
						left 50%
						transform translateX(-50%)
						bottom -1px
					&:hover
						box-shadow inset 0 0 5px 2px #fff
						&:before, &:after
							opacity 1
							display block
					&.open
						&:before, &:after
							opacity 1
							display block

</style>


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
		f7-nav-title Календарь в неделях
	// Page content
	f7-block(strong no-hairlines)
		.calendar-wrapper
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
	import format from 'date-fns/format'
	import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'
	import eachMonthOfInterval from 'date-fns/eachMonthOfInterval'
	import subMonths from 'date-fns/subMonths'
	import subDays from 'date-fns/subDays'
	import addYears from 'date-fns/addYears'
	import isWithinInterval from 'date-fns/isWithinInterval'
	// import parse from 'date-fns/parse'
	// import endOfWeek from 'date-fns/endOfWeek'
	import endOfDay from 'date-fns/endOfDay'
	import { useStore } from 'framework7-vue';
	export default {
		setup() {
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
			const dotPaddingTop = isWeeks ? '2%' : isMonths ? '5%' : '';

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
			const allUnits = isMonths ? 12 : isWeeks ? 53 : 0;
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

			return {
				dates: datesArray,
				allYears,
				firstYear,
				dotWidth,
				dotPaddingTop,
			}
		}
	}
</script>

<style lang="stylus">
.calendar-wrapper
	display flex
	width 100%
	.age
		width 20px
		font-size 10px
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
				&:hover .dot
					box-shadow inset 0 0 0 2px #dedddd
				.dot
					box-shadow inset 0 0 0 1px #fff
					position relative
					border-radius 4px
					span
						text-align: center;
						display: block;
						line-height: 14px;
						color: #000000;
					&:before
						content attr(msg)
						position absolute
						border 1px black solid
						background white
						z-index 9999
						opacity 0
						text-wrap nowrap
						white-space pre
						padding 2px 6px
						bottom: 0
						left: 100%
						pointer-events none
					&:hover
						box-shadow inset 0 0 5px 2px #fff
						&:before
							opacity 1
					&.open
						&:before
							opacity 1

</style>


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
		f7-nav-title Мгновении
	// Page content
	f7-block(strong no-hairlines)
		canvas(id="canvas")
</template>
<script>
	// import format from 'date-fns/format'
	// import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'
	// import eachMonthOfInterval from 'date-fns/eachMonthOfInterval'
	// import subMonths from 'date-fns/subMonths'
	// import subDays from 'date-fns/subDays'
	// import addYears from 'date-fns/addYears'
	// import isWithinInterval from 'date-fns/isWithinInterval'
	// import parse from 'date-fns/parse'
	// import endOfWeek from 'date-fns/endOfWeek'
	// import { useStore } from 'framework7-vue';
	export default {
		setup() {
			const canvas = document.querySelector('canvas')
			const c = canvas.getContext('2d')
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
			const center = canvas.width / 2;
			const mouse = {
				x: undefined,
				y: undefined
			}

			// Event Listeners
			addEventListener('mousemove', event => {
				mouse.x = event.clientX
				mouse.y = event.clientY
			})
			addEventListener('resize', () => {
				canvas.width = innerWidth
				canvas.height = innerHeight
				init()
			})

			// Objects
			function Line(x, date) {
				this.x = x
				this.date = date
			}

			Line.prototype.draw = function() {
				c.beginPath()
				let yStart = 200;
				const yEnd = 300;

				const second = new Date(this.date).getSeconds();
				const minutes = new Date(this.date).getMinutes();
				const hours = new Date(this.date).getHours();

				if(second == 0) {
					yStart = 130;
				}

				if(minutes == 0) {
					yStart = 200;
				}
				if(hours == 0) {
					yStart = 260;
				}

				c.moveTo(this.x, yStart)
				c.lineTo(this.x, yEnd)

				if(this.x < center){
					c.strokeStyle = 'gray'
					c.lineWidth = 1
				}
				else {
					c.strokeStyle = 'gray'
					c.lineWidth = 4
				}

				c.stroke()
				c.closePath()


				if(this.x < center){
					c.fillStyle = 'gray'
				}
				else {
					c.fillStyle = "#000";
				}

				c.font = "8pt Arial";
				const textWidth = c.measureText(second).width;

				c.fillText(second , this.x - (textWidth / 2), 314);
			}

			Line.prototype.update = function() {
				this.x -= 1;
				this.draw()

				if(this.x < -30) {
					circles.shift();
					const last_elem = circles[circles.length - 1];
					circles.push(new Line(last_elem.x + 20, last_elem.date + 1000));
				}



			}

			// Implementation
			let circles = [];
			function init() {
				c.clearRect(0, 0, canvas.width, canvas.height);
				circles = [];
				const date = Date.now();

				const all_lines = Math.floor(canvas.width / 20);
				for (let i = 0; i < all_lines; i++) {

					if(i === 0) {
						circles.push(new Line(center, date))
					}
					else {
						const next_x = center + i*100;
						const prev_x = center - i*100;

						const next_second = date + i*1000;
						const prev_second = date - i*1000;
						circles.push(new Line(next_x, next_second))
						circles.push(new Line(prev_x, prev_second))
					}


				}

				circles.sort((a,b) => {
					return a.x - b.x;
				})

			}

			// Animation Loop
			function animate() {
				c.clearRect(0, 0, canvas.width, canvas.height) // Erase whole canvas
				circles.forEach(circle => {
					circle.update()
				})

				c.beginPath()
				c.moveTo(canvas.width / 2, 150)
				c.lineTo(canvas.width / 2, 350)
				c.strokeStyle = 'black'
				c.lineWidth = 2
				c.stroke()
				c.closePath()

				c.fillStyle = "#000";
				c.font = "12pt Arial";
				const date = new Date();
				const hours = date.getHours();
				const minutes = date.getUTCMinutes();
				const seconds = date.getSeconds();
				const textString = `${hours}:${minutes}:${seconds}`;
				const textWidth = c.measureText(textString).width;

				// c.fillText(textString , this.x - (textWidth / 2), 314);
				c.fillText(textString, canvas.width / 2 - (textWidth / 2), 370);
			}



			const date_now = Date.now();
			const start_date = Math.floor(date_now / 1000) * 1000 + 1000; // + sec
			const diff = start_date - date_now;

			setTimeout(() => {
				init()
				setInterval(animate, 10)
			}, diff)

		}
	}
</script>

<style>
#canvas {
	width: 100%;
	height: 100%;
}
</style>

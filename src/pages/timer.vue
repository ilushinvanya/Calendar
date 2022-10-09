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
	import { onMounted } from 'vue';
	import format from 'date-fns/format';
	// import format from 'date-fns/format'
	// import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'
	// import eachMonthOfInterval from 'date-fns/eachMonthOfInterval'
	// import subMonths from 'date-fns/subMonths'
	// import subDays from 'date-fns/subDays'
	// import addYears from 'date-fns/addYears'
	// import isWithinInterval from 'date-fns/isWithinInterval'
	// import parse from 'date-fns/parse'
	// import endOfWeek from 'date-fns/endOfWeek'
	// import { mount } from 'framework7-vue';
	export default {
		setup() {
			onMounted(() => {
				const canvas = document.querySelector('canvas')
				const c = canvas.getContext('2d')
				canvas.width = window.innerWidth
				canvas.height = window.innerHeight
				const center = canvas.width / 2;
				const mouse = {
					x: undefined,
					y: undefined
				}
				const all_lines = 20;
				const widthLine = Math.floor(canvas.width / all_lines);

				addEventListener('mousemove', event => {
					mouse.x = event.clientX
					mouse.y = event.clientY
				})

				// Objects
				class Line {
					constructor(x, date) {
						this.x = x
						this.date = date
					}
					draw() {
							c.beginPath()
							let yStart = 220;
							const yEnd = 300;

							const second = new Date(this.date).getSeconds();
							const minutes = new Date(this.date).getMinutes();
							const hours = new Date(this.date).getHours();

							if(second === 0) {
								yStart = 200;
								if(minutes === 0) {
									yStart = 180;
									if(hours === 0) {
										yStart = 160;
									}
								}

							}

							c.moveTo(this.x, yStart)
							c.lineTo(this.x, yEnd)

							if(this.x <= center){
								c.strokeStyle = 'gray'
								c.lineWidth = 1
							}
							else {
								c.strokeStyle = 'black'
								c.lineWidth = 2
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

							// tooltip for second
							if(second === 22) {
								c.beginPath()
								c.strokeStyle = 'black'
								c.lineWidth = 1
								let start = { x: center,   y: 80  };
								let cp1 =   { x: center,   y: 150  };
								let cp2 =   { x: this.x,   y: 150  };
								let end =   { x: this.x,   y: 210 };

								c.beginPath();
								c.moveTo(start.x, start.y);
								c.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
								c.stroke();
								c.closePath();

								const text = 'Вот эта секунда больше никогда не повторится ' +
									' Она уникальная раз в жизни \n Её координаты ' + format(this.date, 'y MM dd HH:mm:ss');
								c.font = '10pt Arial';
								c.lineWidth = 1;
								const opacity = () => {
									// 0 to 1 throw 0.2
									const diff = canvas.width - this.x;
									if(diff < 100) {
										return diff / 100;
									}
									return 1;
									// if(this.x < canvas.width && this.x < canvas.width) return 1;
									// canvas.width - this.x ? 1 : 0;
									// this.x < 22 ? 1 : 0.5
								}
								c.fillStyle = `rgba(0,0,0,${ opacity() })`;
								const textWidth = c.measureText(text).width;

								c.fillText(text , center - (textWidth / 2), 70);

								c.beginPath();
								c.moveTo(end.x - 6, end.y - 6);
								c.lineTo(end.x, end.y);
								c.lineTo(end.x + 6, end.y - 6);
								c.closePath();
								c.stroke();
								c.fill()
							}
						}
					update() {
						this.x -= 1;
						this.draw()

						if(this.x < -widthLine) {
							lines.shift();
							const last_elem = lines[lines.length - 1];
							lines.push(new Line(last_elem.x + widthLine, last_elem.date + 1000));
						}
					}
				}
				class Clock {
					draw() {
						const halfCanvasWidth = canvas.width / 2;
						c.beginPath()
						c.fillStyle = '#000';
						c.font = '12pt Arial';
						const textString = format(new Date(), 'HH:mm:ss');
						const textWidth = c.measureText(textString).width;
						c.fillText(textString, center - (textWidth / 2), 370);

						c.rect((halfCanvasWidth - textWidth/2) - 10, 160, textWidth + 20, 230)
						c.strokeStyle = 'black'
						c.lineWidth = 1
						c.stroke()
						c.closePath()
					}
				}

				// Implementation
				let lines = [];
				let clock;
				function init() {
					c.clearRect(0, 0, canvas.width, canvas.height);
					lines = [];
					const date = Date.now();

					for (let i = 0; i <= all_lines / 2; i++) {
						if(i === 0) {
							lines.push(new Line(center, date))
						}
						else {
							const next_x = center + i * widthLine;
							const prev_x = center - i * widthLine;

							const next_second = date + i*1000;
							const prev_second = date - i*1000;
							lines.push(new Line(next_x, next_second))
							lines.push(new Line(prev_x, prev_second))
						}
					}
					lines.sort((a,b) => {
						return a.x - b.x;
					})
					clock = new Clock();
					animate();
				}

				// Animation Loop
				function animate() {
					c.clearRect(0, 0, canvas.width, canvas.height) // Erase whole canvas
					c.fillStyle = '#f2f4f6';
					c.fillRect(0, 0, canvas.width, canvas.height);
					lines.forEach(line => {
						line.update()
					})

					clock.draw();
				}



				const date_now = Date.now();
				const start_date = Math.floor(date_now / 1000) * 1000 + 1000; // + sec
				const diff = start_date - date_now;

				setTimeout(() => {
					init()
					setInterval(animate, 1000 / widthLine)
				}, diff)
			});


		}
	}
</script>

<style>
#canvas {
	width: 100%;
	height: 100%;
}
</style>

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
				canvas.height = 700;
				const center = canvas.width / 2;
				const mouse = {
					x: undefined,
					y: undefined
				}
				const all_lines = 40;
				const widthBetweenLines = Math.floor(canvas.width / all_lines);

				addEventListener('mousemove', event => {
					mouse.x = event.clientX
					mouse.y = event.clientY
				})

				const opacity = (currentX) => {
					const rightDiff = canvas.width - currentX;
					if(rightDiff < 100) {
						return rightDiff / 100;
					}

					const leftDiff = currentX;
					// const leftDiff = (0 - currentX)*-1;
					if(leftDiff < 100) {
						return leftDiff / 100;
					}

					return 1;
				}
				const printAtCenter = (text, y, lineHeight) => {
					const lines = text.split('\n');
					// const lineHeight = 15;

					for (let i = 0; i < lines.length; i++) {
						const textWidth = c.measureText(lines[i]).width;
						const x = center - (textWidth / 2);
						c.fillText(lines[i], x, y + (i*lineHeight) );
					}
				}
				const printAtLeft = (text, y, offset, lineHeight) => {
					const lines = text.split('\n');
					// const lineHeight = 16;

					for (let i = 0; i < lines.length; i++) {
						// const lineHeight = c.measureText(lines[i]).actualBoundingBoxDescent;
						c.fillText(lines[i], offset, y + (i * lineHeight));
					}
				}
				const printAtRight = (text, y, offset, lineHeight) => {
					const lines = text.split('\n');
					// const lineHeight = 16;

					for (let i = 0; i < lines.length; i++) {
						const lineWidth = c.measureText(lines[i]).width;
						const x = canvas.width - lineWidth - offset;
						c.fillText(lines[i], x, y + (i * lineHeight));
					}
				}

				// Objects
				class Line {
					x = 0;
					yEnd = 300;
					constructor(date) {
						this.date = date
					}
					draw() {
						let yStart = 220;

						const second = new Date(this.date).getSeconds();
						const minutes = new Date(this.date).getMinutes();
						const hours = new Date(this.date).getHours();

						const pxDiff = widthBetweenLines / 1000;
						const timeDiff = Date.now() - this.date;
						this.x = center - (timeDiff * pxDiff);
						const isPast = timeDiff >= 0;
						const isFuture = timeDiff < 0;
						if(isPast) {
							// past
							c.strokeStyle = 'gray'
							c.lineWidth = 1
							c.fillStyle = 'gray'
						}
						if(isFuture) {
							// future
							c.strokeStyle = '#000';
							c.lineWidth = 2;
							c.fillStyle = '#000';
						}
						if(second === 0) {
							yStart = 200;
							if(minutes === 0) {
								yStart = 180;
								if(hours === 0) {
									yStart = 160;
								}
							}
						}
						c.beginPath()
						c.moveTo(this.x, yStart)
						c.lineTo(this.x, this.yEnd)
						c.stroke()
						c.closePath()


						c.font = '8pt Arial';
						const textWidth = c.measureText(second).width;

						c.fillText(second , this.x - (textWidth / 2), 314);


						if(second === 2) {
							c.strokeStyle = `rgba(0,0,0,${ isFuture ? opacity(this.x) : 0 })`;
							c.lineWidth = 1
							let start = { x: center + 180,   y: 420  };
							let cp1 =   { x: this.x,   y: 590  };
							let cp2 =   { x: this.x,   y: 390  };
							let end =   { x: this.x,   y: 340 };

							c.beginPath();
							c.moveTo(start.x, start.y);
							c.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
							c.stroke();
							c.closePath();

							c.fillStyle = `rgba(0,0,0,${ isFuture ? opacity(this.x) : 0 })`;
							c.beginPath();
							c.moveTo(end.x + 6, end.y + 6);
							c.lineTo(end.x, end.y);
							c.lineTo(end.x - 6, end.y + 6);
							c.stroke();
							c.fill()
							c.closePath();

							c.font = '14pt Arial';
							c.lineWidth = 1;
							c.fillStyle = `rgba(0,0,0,${ opacity(this.x) })`;
							let text = 'Вот эта секунда больше никогда не повторится \n' +
								' Она уникальная раз в жизни \n Её координаты ' + format(this.date, 'y.MM.dd..HH.mm.ss');

							if(isPast) {
								text = 'Всё, она прошла'
							}
							printAtCenter(text, 400, 20);

							if(isFuture) {
								const textTitle = 'Там будущее ➡️';
								const textSubTitle = 'На него можно повлиять\nЕсли делать дела';

								c.fillStyle = `rgba(0,0,0,${ opacity(this.x) })`;
								c.font = '26pt Arial';
								c.lineWidth = 2;
								printAtRight(textTitle, 70, 100, 30);

								c.fillStyle = `rgba(0,0,0,${ opacity(this.x) - 0.2 })`;
								c.font = '18pt Arial';
								c.lineWidth = 1;
								printAtRight(textSubTitle, 110, 100, 26);
							}

							if(isPast) {
								const textTitle = '⬅️ Там прошлое';
								const textSubTitle = 'Его не изменить, время прошло\nостались только история, опыт и воспоминания';
								c.fillStyle = `rgba(0,0,0,${ opacity(this.x) })`;

								c.font = '26pt Arial';
								c.lineWidth = 2;
								printAtLeft(textTitle, 70, 100, 30);

								c.font = '18pt Arial';
								c.lineWidth = 1;
								printAtLeft(textSubTitle, 110, 100, 26);
							}
						}
					}
					update() {
						this.draw()

						if(this.x < -widthBetweenLines) {
							lines.shift();
							const last_elem = lines[lines.length - 1];
							lines.push(new Line(last_elem.date + 1000));
						}
					}


				}
				class Clock {
					now = new Date;
					draw() {
						c.font = '12pt Arial';
						const textString = format(this.now, 'HH:mm:ss');
						const textWidth = c.measureText(textString).width;

						c.fillStyle = '#f2f4f6';
						c.fillRect(center - (textWidth / 2) - 10, 250, textWidth + 20, 30);

						c.fillStyle = '#000';
						c.fillText(textString, center - (textWidth / 2), 270);

						c.strokeStyle = 'black'
						c.lineWidth = 2
						c.beginPath()
						c.arc(center, 260, textWidth + 30, 0, Math.PI * 2);
						c.stroke()
						c.closePath()

						c.beginPath()
						c.arc(center, 260, textWidth + 22, 0, Math.PI * 2);
						c.stroke()
						c.closePath()
					}
					update() {
						this.now = new Date;
						this.draw();
					}
				}

				// Implementation
				let lines = [];
				let clock;
				function init() {
					c.clearRect(0, 0, canvas.width, canvas.height);
					lines = [];
					const date = Date.now();

					for (let i = 0; i <= all_lines / 2 + 1; i++) {
						if(i === 0) {
							lines.push(new Line(date))
						}
						else {
							const next_second = date + i*1000;
							const prev_second = date - i*1000;
							lines.push(new Line(next_second))
							lines.push(new Line(prev_second))
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

					lines.forEach(line => {
						line.update()
					})
					clock.update();
				}

				const date_now = Date.now();
				const start_date = Math.floor(date_now / 1000) * 1000 + 1000; // + sec
				const diff = start_date - date_now;

				setTimeout(() => {
					init()
					setInterval(animate, 1000 / widthBetweenLines)
				}, diff)
			});


		}
	}
</script>

<style>
#canvas {
	width: 100%;
	height: 700px;
	background: #f2f4f6;
}
</style>

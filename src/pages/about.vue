<template lang="pug">
f7-page(name="about")
	f7-block-title About My App
	f7-block(strong)
		iframe(width="560" height="315" src="https://www.youtube.com/embed/KGfFunFV2Ck" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)
		p
		f7-link(href="https://interesno.co/myself/5ec6770b787b" target="_blank" external) Реф вдохновитель
		p Жизнь кажется бесконечно длинной, а ее конец настолько же далек, как и тот час, когда солнце, исчерпав свой ресурс, в конце концов, перестанет светить.
		p Инфографика творит чудеса, представляя вещи, которые сложно понять, удерживая их в голове, в наглядном виде. Без лишних слов, давайте просто посмотрим, как выглядит наша жизнь в неделях:
		p Каждый квадратик – одна неделя. Участок времени от выходных – до следующих. Один ряд состоит из 52-х отрезков – ровно столько полных недель в году.
		p https://irinaberg.com/zhizn-v-nedelyax-prostoj-kalendar-dlya-moshhnoj-motivacii/ @IrinaVBerg Возможно всё!
	f7-block
		f7-row
			f7-col
				f7-button(
					fill
					href="/form/"
				) Форма
			f7-col
				f7-button(
					fill
					href="/calendar/"
				) Календарь
			f7-col
				f7-button(
					fill
					href="/timer/"
				) Мгновении
</template>

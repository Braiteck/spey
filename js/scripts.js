$(() => {
	// Основной слайдер на главной
	if ($('.main_slider > .swiper-container').length) {
		new Swiper('.main_slider > .swiper-container', {
			loop: true,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			}
		})
	}


	// Промо товары
	if ($('.promo_products .swiper-container').length) {
		new Swiper('.promo_products .swiper-container', {
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			autoplay: {
				delay: 3000
			}
		})
	}


	// Страница товара
	if ($('.product_info .images').length) {
		const productThumbs = new Swiper('.product_info .thumbs .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 3,
			slidesPerView: 3,
			navigation: {
				nextEl: '.thumbs-swiper-button-next',
				prevEl: '.thumbs-swiper-button-prev'
			}
		})

		const productSlider = new Swiper('.product_info .big .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			thumbs: {
				swiper: productThumbs
			},
			on: {
				slideChange: swiper => {
					$('.product_info .images .view360_btn').removeClass('active')
					$('.product_info .images .view360').fadeOut(200)
				}
			}
		})
	}

	// Страница товара - просмотр на 360
	if ($('.product_info .images .view360').length) {
		let Magic360Lang = {
			fullscreen: true,
			'hint-text': 'Вращайте',
			'mobile-hint-text': 'Вращайте'
		}

		$('.product_info .images .view360_btn').click(function (e) {
			e.preventDefault()

			if (!$(this).hasClass('active')) {
				$(this).addClass('active')
				$('.product_info .images .view360').fadeIn(300)
			} else {
				$(this).removeClass('active')
				$('.product_info .images .view360').fadeOut(200)
			}
		})
	}


	// Боковая колонка - Категории товаров
	$('aside .categories .category .arrow').click(function (e) {
		e.preventDefault()

		let category = $(this).closest('.category')

		!category.hasClass('active')
			? category.toggleClass('active').next().slideDown(300)
			: category.toggleClass('active').next().slideUp(200)
	})


	// Страница товара - ГДЕ КУПИТЬ?
	$('.product_info .where_buy .head').click(function (e) {
		e.preventDefault()

		!$(this).hasClass('active')
			? $(this).toggleClass('active').next().slideDown(300)
			: $(this).toggleClass('active').next().slideUp(200)
	})


	// Боковая колонка - Текстовый сполйер
	$('.product_info .instruction .title.spoler_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	// Подвал - волна
	$('footer .menu .item').mouseover(function () {
		let position = $(this).offset()

		$('footer .wave').css('left', position.left)
		$('footer .wave').addClass('show')
	})


	// Контакты - смена региона
	$('.contacts_info .region select').change(function () {
		let regionIndex = $(this).val()

		$('.contacts_info .region_info, .contacts_info .region_map').hide()
		$('.contacts_info .region' + regionIndex + '_info, .contacts_info .region' + regionIndex + '_map').fadeIn(300)
	})


	// Отправка форм
	$('.feedback form').submit(function (e) {
		e.preventDefault()

		$('.feedback .seccess_message').fadeIn(300)
	})
})


$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})


	// Фикс. шапка
	headerInit = true,
		headerHeight = $('header').outerHeight()

	$('header').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')


	// Статьи - сетка
	let articles = $('.articles .masonry'),
		articlesGutter = parseInt(articles.css('--articles_gutter'))

	masonry = articles.masonry({
		percentPosition: true,
		gutter: articlesGutter,
		itemSelector: '.article',
		columnWidth: articles.find('.article').width()
	})
})



$(window).resize(() => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})


	// Фикс. шапка
	headerInit = false
	$('.header_wrap').height('auto')

	setTimeout(() => {
		headerInit = true
		headerHeight = $('header').outerHeight()

		$('.header_wrap').height(headerHeight)

		headerInit && $(window).scrollTop() > headerHeight
			? $('header').addClass('fixed')
			: $('header').removeClass('fixed')
	}, 100)
})



$(window).scroll(() => {
	// Фикс. шапка
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product')

	$products.find('.name, .desc').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish).find('.name'))
		setHeight($products.slice(start, finish).find('.desc'))

		start = start + step
		finish = finish + step
	})
}
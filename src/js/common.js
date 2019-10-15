import $ from "jquery"
import {Swiper, Pagination, Navigation, Lazy, Keyboard, EffectFade} from "swiper/dist/js/swiper.esm.js"

Swiper.use([Pagination, Navigation, Lazy, Keyboard, EffectFade])

window.$ = $;
window.jQuery = $;

window.get$ = (element) => {
	return $(element)
}

let isFancyboxReady = false;

import("./jquery.fancybox.js")
	.then(() => {
		const event = document.createEvent("HTMLEvents");

		event.initEvent("fancyboxReady", false, true)

		document.dispatchEvent(event);
		isFancyboxReady = true

	})

require("../css/jquery.fancybox.css")

window.fancyboxReady = callback => {
	if (isFancyboxReady)
		callback()
	else
		document.addEventListener("fancyboxReady", callback)
}

// require("./jquery.fancybox.js")


document.addEventListener("DOMContentLoaded", function(){
	fancyboxReady(initFancybox)

	for (const sliderBlock of document.querySelectorAll(".show__slider"))
		new Swiper(sliderBlock.querySelector(".show-slider"), {
			slidesPerView: 1,
			loop: true,
			spaceBetween: 97,
			lazy: {
				loadPrevNext: 3,
				loadOnTransitionStart: true
			},
			navigation: {
				prevEl: sliderBlock.querySelector(".swiper-button-prev"),
				nextEl: sliderBlock.querySelector(".swiper-button-next")
			},
			pagination: {
				el: sliderBlock.querySelector(".swiper-pagination"),
				type: "bullets",
				clickable: true,
			},
			keyboard: {
				enabled: true,
				onlyInViewport: true
			},
			breakpoints: {
				1000: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				660: {
					slidesPerView: 1,
					spaceBetween: 20
				}
			}
		})

	const partnersSlider = new Swiper(".partners-list", {
		slidesPerView: 4,
		spaceBetween: 30,
		dynamicBullets: true,
		keyboard: {
			enabled: true,
			onlyInViewport: true
		},
		pagination: {
			el: ".partners-list .swiper-pagination",
			type: "bullets",
			clickable: true,
		},
		breakpoints: {
			660: {
				slidesPerView: 2
			}
		}
	})

	$(".partners__title .main-title").click(function(){
		const id = $(this).attr("data-target");

		const slidesForDisable = partnersSlider.el
			.querySelectorAll(`.swiper-slide:not([data-id="${id}"])`);

		$(".partners__title .main-title.active").removeClass("active")
		$(this).addClass("active")

		for (const slide of slidesForDisable)
			slide.style.display = "none"

		for (const slide of partnersSlider.el
			.querySelectorAll(`.swiper-slide[data-id="${id}"]`))
			slide.style.display = "block"

		partnersSlider.update()
	})

	$(".partners__title select").change(function(){
		const id = $(this).val();

		const slidesForDisable = partnersSlider.el
			.querySelectorAll(`.swiper-slide:not([data-id="${id}"])`);

		for (const slide of slidesForDisable)
			slide.style.display = "none"

		for (const slide of partnersSlider.el
			.querySelectorAll(`.swiper-slide[data-id="${id}"]`))
			slide.style.display = "block"

		partnersSlider.update()
	})

	new Swiper(".main-banner", {
		effect: "fade",
		pagination: {
			el: ".main-banner .swiper-pagination",
			clickable: true,
		},
		lazy: {
			loadOnTransitionStart: true,
			loadPrevNext: true
		}
	})
	
	for (const slider of document.querySelectorAll(".it-was"))
		new Swiper(slider.querySelector(".was-slider"), {
			slidesPerView: 3,
			spaceBetween: 60,
			lazy: {
				loadPrevNext: true,
				loadOnTransitionStart: true,
			},
			navigation: {
				prevEl: slider.querySelector(".swiper-button-prev"),
				nextEl: slider.querySelector(".swiper-button-next"),
			},
			pagination: {
				el: ".it-was__pagination .swiper-pagination",
				clickable: true,
				dynamicBullets: true,
				dynamicMainBullets: 4
			},
			breakpoints: {
				1000: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				660: {
					slidesPerView: 1,
					spaceBetween: 20
				}
			}
		})

	$(".main-banner__scroll").click(function(){
		$("html, body").animate({
			scrollTop: $(".counters").offset().top - $(".head").height()
		}, 300)
	})

	$(".scrollto").click(function(e){
		const targetId = $(this).attr("href"),
			$menu = $(this).closest(".menu");

		e.preventDefault()
		
		$("html, body").animate({
			scrollTop: $(targetId).offset().top - $(".head").height()
		}, 300)

		// $menu[0].scrollLeft = $(this).closest("li").position().left

		$(".scrollto.active").removeClass("active").closest("li").removeClass("active")

		$(this).addClass("active").closest("li").addClass("active")
	})
})

const initFancybox = () => {
	$(".fancybox").fancybox({
		trapFocus: false,
		touch : {
  			vertical : false,
  		},
		loop: true,
		clickSlide: false,
  		clickOutside: false,
		buttons: ["fullscreen", "slideShow", "close", "thumbs"],
		image: {
			preload: true,
		},
		transitionEffect: "slide",
	});
}
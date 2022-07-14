import {Swiper, Navigation, Pagination} from "swiper";
Swiper.use([Navigation, Pagination]);

export default function reviewsSlider() {
  const container = document.querySelector('.js-reviews-slider');
  if (!container) return;

  const instance = new Swiper(container, {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: container.querySelector('.pagination'),
      bulletClass: "pagination__item",
      bulletActiveClass: "active",
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: container.querySelector('.slider-button.--right'),
      prevEl: container.querySelector('.slider-button.--left'),
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 60
      }
    }
  });
}
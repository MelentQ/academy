import {Swiper, Navigation, Pagination} from "swiper";
Swiper.use([Navigation, Pagination]);

export default function reviewsSlider() {
  const container = document.querySelector('.js-reviews-slider');
  if (!container) return;

  const instance = new Swiper(container, {
    slidesPerView: 3,
    spaceBetween: 60,
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
    loop: true
  });
}
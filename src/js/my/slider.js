import {Swiper, Navigation, Autoplay, Pagination} from "swiper";
Swiper.use([Navigation, Autoplay, Pagination]);

export default function slider() {
  const container = document.querySelector('.js-init-slider');
  if (!container) return;

  const instance = new Swiper(container.querySelector('.swiper'), {
    slidesPerView: 1,
    spaceBetween: 8,
    navigation: {
      nextEl: container.querySelector('.slider-button.--right'),
      prevEl: container.querySelector('.slider-button.--left'),
    },
    pagination: {
      el: container.querySelector('.pagination'),
      bulletClass: "pagination__item",
      bulletActiveClass: "active",
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        autoHeight: false
      },
      768: {
        slidesPerView: 3,
        autoHeight: false
      }
    }
  });
}
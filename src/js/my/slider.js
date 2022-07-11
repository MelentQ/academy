import {Swiper, Navigation, Autoplay} from "swiper";
Swiper.use([Navigation, Autoplay]);

export default function slider() {
  const container = document.querySelector('.js-init-slider');
  if (!container) return;

  const instance = new Swiper(container.querySelector('.swiper'), {
    slidesPerView: 3,
    spaceBetween: 8,
    navigation: {
      nextEl: container.querySelector('.slider-button.--right'),
      prevEl: container.querySelector('.slider-button.--left'),
    },
    loop: true
  });
}
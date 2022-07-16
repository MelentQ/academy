import {
  Swiper,
  Navigation,
  EffectFade,
  Pagination
} from "swiper";
Swiper.use([Navigation, Pagination, EffectFade]);

import gsap from 'gsap';

export default function quizTabs() {
  const containers = document.querySelectorAll('.js-quiz-tabs');
  containers.forEach(container => {
    const progressbarLabel = container.querySelector('.quiz__progressbar-label');

    const slider = new Swiper(container.querySelector('.swiper'), {
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      allowTouchMove: false,
      autoHeight: true,
      navigation: {
        nextEl: container.querySelector('.quiz__step-next'),
        prevEl: container.querySelector('.quiz__step-prev'),
      },
      pagination: {
        el: ".quiz__progressbar",
        type: "progressbar",
        progressbarFillClass: "quiz__progressbar-fill"
      },
      on: {
        slideChange: (swiper) => {
          progressbarLabel.textContent = `Шаг ${swiper.activeIndex + 1} из ${swiper.slides.length}`
        }
      }
    });
  });
}
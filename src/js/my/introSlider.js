import {Swiper, Navigation, Autoplay, EffectFade, Thumbs} from "swiper";
Swiper.use([Navigation, Autoplay, EffectFade, Thumbs]);

import gsap from 'gsap';

export default function introSlider() {
  const container = document.querySelector('.js-init-intro-slider');
  if (!container) return;

  const thumbs = container.querySelectorAll('.intro__thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      e.preventDefault();
    });
  })

  const thumbsSlider = new Swiper(container.querySelector('.intro__thumbs'), {
    slidesPerView: 4,
    spaceBetween: 60
  });

  const imageSlider = new Swiper(container.querySelector('.intro__images'), {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    allowTouchMove: false,
    thumbs: {
      swiper: thumbsSlider,
      multipleActiveThumbs: false
    }
  });

  const animation = gsap.timeline();

  function lineAnimation() {
    if (window.lastThumbLine) {
      gsap.set(window.lastThumbLine, { xPercent: -100 });
    };
    
    const currentThumbLine = thumbsSlider.slides[imageSlider.activeIndex].querySelector('.intro__thumb-fill');
    window.lastThumbLine = currentThumbLine;
    animation.clear();
    animation.eventCallback('onComplete', null);
    animation.fromTo(currentThumbLine, {
        xPercent: -100,
      }, {
        ease: "none",
        xPercent: 0,
        duration: 5,
      }
    );
    animation.eventCallback('onComplete', () => {
      if(imageSlider.isEnd) {
        imageSlider.slideTo(0);
      }
      else {
        imageSlider.slideNext();
      }
    });
  }

  lineAnimation();

  console.log(imageSlider.thumbs);

  imageSlider.on("slideChange", lineAnimation);
}
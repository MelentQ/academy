import {Swiper, Navigation, Autoplay, EffectFade, Thumbs, Controller} from "swiper";
Swiper.use([Navigation, Autoplay, EffectFade, Thumbs, Controller]);

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
    slidesPerView: 1,
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

  const mobileSlider = new Swiper(container.querySelector('.intro__mobile-slider'), {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    controller: {
      control: imageSlider
    },
    navigation: {
      nextEl: container.querySelector('.slider-button.--right'),
      prevEl: container.querySelector('.slider-button.--left'),
    }
  });

  if (window.matchMedia("(min-width: 1440px)").matches) {

    const animation = gsap.timeline();

    thumbsSlider.slides.forEach(slide => {
      const line = slide.querySelector('.intro__thumb-fill');
      gsap.set(line, { xPercent: -100 });
    })

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

    imageSlider.on("slideChange", lineAnimation);
  }
}
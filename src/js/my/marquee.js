import  'jquery.marquee';

export default function marquee() {
  $('.js-marquee').marquee({
    duration: 7000,
    gap: 80,
    delayBeforeStart: 0,
    direction: 'left',
    duplicated: true
  });
}
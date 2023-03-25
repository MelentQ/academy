import noUiSlider from 'nouislider';

export default function rangeSlider() {
  const containers = document.querySelectorAll('.js-range-slider');
  containers.forEach(container => {
    const hiddenInput = container.querySelector('input[type="hidden"]');
    const slider = container.querySelector('.range-slider__slider');

    const instance = noUiSlider.create(slider, {
      start: [Number(container.dataset.min), Number(container.dataset.max) / 2],
      step: Number(container.dataset.step),
      connect: true,
      range: {
        'min': Number(container.dataset.min),
        'max': Number(container.dataset.max)
      },
      tooltips: true,
      format: {
        from: function (formattedValue) {
          return Number(formattedValue);
        },
        to: function(numericValue) {
          return Math.round(numericValue);
        }
      }
    });

    instance.on('update', (values) => {
      hiddenInput.value = `${Math.round(values[0])}:${Math.round(values[1])}`;
    });
  });
}
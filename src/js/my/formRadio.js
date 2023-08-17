export default function formRadio() {
  const containers = document.querySelectorAll('.js-form-radio');
  containers.forEach(container => {
    const hiddenInput = container.querySelector('input[type="hidden"]');
    const buttonsContainer = container.querySelector('.form-radio__list');
    const buttons = buttonsContainer.querySelectorAll('.js-button');
    const mobileSelectButton = container.querySelector('.form-radio__select');
    const mobileSelectButtonLabel = mobileSelectButton.querySelector('.form-radio__select-label');
    const mobileSelectImageWrapper = mobileSelectButton.querySelector('.form-radio__select-image-small-wrapper');
    const mobileSelectImage = mobileSelectButton.querySelector('img');
    let activeButtonIndex = 0;

    const tooltips = [];

    buttons.forEach((button, index) => {
      const buttonImage = button.querySelector('img');
      const tooltip = button.parentNode.querySelector('.tooltip');

      if (tooltip) {
        tooltip.userParentNode = tooltip.parentNode;
        tooltips.push(tooltip);
      }

      button.addEventListener('click', (e) => {
        e.preventDefault();
        if (button.classList.contains('active')) return;

        tooltips.forEach(tt => {
          tt.userParentNode.append(tt);
        })

        if (mobileSelectImageWrapper) {
          mobileSelectImageWrapper.style.display = 'none';
        }

        button.classList.add('active');
        buttons[activeButtonIndex].classList.remove('active');
        activeButtonIndex = index;
        hiddenInput.value = button.dataset.value;
        mobileSelectButtonLabel.textContent = button.dataset.value;
        buttonsContainer.classList.remove('active');
        mobileSelectButton.classList.remove('active');
        if (mobileSelectImageWrapper) {
          mobileSelectImageWrapper.style.display = 'block';
        }
        if (mobileSelectImage && buttonImage) {
          mobileSelectImage.src = buttonImage.src;
        }

        if (matchMedia('only screen and (max-width: 640px)').matches && tooltip) {
          container.parentElement.append(tooltip);
        }
      })
    })

    mobileSelectButton.addEventListener('click', () => {
      buttonsContainer.classList.toggle('active');
      mobileSelectButton.classList.toggle('active');
    })

    window.addEventListener('click', e => {
      const target = e.target
      if (!target.closest('.form-radio__list') && !target.closest('.form-radio__select')) {
        buttonsContainer.classList.remove('active');
        mobileSelectButton.classList.remove('active');
      }
    })
  })
}

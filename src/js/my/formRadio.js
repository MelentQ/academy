export default function formRadio() {
  const containers = document.querySelectorAll('.js-form-radio');
  containers.forEach(container => {
    const hiddenInput = container.querySelector('input[type="hidden"]');
    const buttonsContainer = container.querySelector('.form-radio__list');
    const buttons = buttonsContainer.querySelectorAll('.js-button');
    const mobileSelectButton = container.querySelector('.form-radio__select');
    const mobileSelectButtonLabel = mobileSelectButton.querySelector('.form-radio__select-label');
    let activeButtonIndex = 0;

    buttons.forEach((button, index) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        button.classList.add('active');
        buttons[activeButtonIndex].classList.remove('active');
        activeButtonIndex = index;
        hiddenInput.value = button.dataset.value;
        mobileSelectButtonLabel.textContent = button.dataset.value;
        buttonsContainer.classList.remove('active');
        mobileSelectButton.classList.remove('active');
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
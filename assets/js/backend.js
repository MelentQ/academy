document.addEventListener('DOMContentLoaded', () => {
  handleSubmitForm();
});

function handleSubmitForm() {
  const forms = Array.from(document.querySelectorAll('.js-handle-form'));
  forms.forEach(form => {
    const url = form.action;
    const submitBtn = form.querySelector('.js-submit-form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      submitBtn.classList.add('disabled');

      const formData = new FormData(form);

      fetch(url, {
          body: formData,
          method: "POST"
        })
        .then(response => {
          if (response.ok) {
            debugForm(formData, response.status);
            window.modals.open('#error');
          } else {
            // У квиза свое окно с сообщением
            if (form.classList.contains('js-success-message')) {
              window.openSuccessQuizTab(form);
            } else {
              window.modals.open('#success');
            }
            form.reset();
            debugForm(formData, response.status);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          submitBtn.classList.remove('disabled');
        })
    })
  })
}

function debugForm(formData, status) {
  let string = "Данные, которые отправятся на бекенд: \n";
  formData.forEach(function (value, key) {
    string += `${key}: ${value} \n`;
  });

  if (status) {
    string += `Статус: ${status}`;
  }

  alert(string);
}
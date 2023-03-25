document.addEventListener('DOMContentLoaded', () => {
  handleSubmitForm();
});

function handleSubmitForm() {
  const forms = Array.from(document.querySelectorAll('.js-handle-form'));
  forms.forEach(form => {
      let url = "/wp-content/themes/cmon/amo/add_lead_2022.php";
      const submitBtn = form.querySelector('.js-submit-form');

      form.addEventListener('submit', (e) => {
          e.preventDefault();

          submitBtn.classList.add('disabled');

          const formData = new FormData(form);

          const name = form.name.value || "Не указано";
          const phone = form.phone.value || "Не указано";
          const string = getFormDataString(form, formData);

          url += `?name=${encodeURI(name)}&phone=${encodeURI(phone)}&message=${encodeURI(string)}`;

          fetch(url)
              .then(response => {
                  if (response.ok) {
                      if (form.classList.contains('js-success-message')) {
                          window.openSuccessQuizTab(form);
                      } else {
                          window.modals.open('#success');
                      }
                      form.reset();
                  } else {
                      window.modals.open('#error');
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

function getFormDataString(form, formData) {
  let string = "Данные с формы на сайте: \n";

  const quizFormHiddenInput = form.querySelector('.js-quiz-path');
  const blockedInputs = [];
  if (quizFormHiddenInput) {
      const path = JSON.parse(quizFormHiddenInput.value);
      const tabs = [...form.querySelectorAll('[data-index]')];
      const blockedTabs = tabs.filter(item => !path.includes(item.dataset.index));
      blockedTabs.forEach(tab => {
          const hiddenInput = tab.querySelector('input[type="hidden"]');
          blockedInputs.push(hiddenInput.name);
      })
  }

  formData.forEach(function (value, key) {
      if (!blockedInputs.includes(key)) {
          string += `${key}: ${value} <<<>>>`;
      }
  });

  return string;
}
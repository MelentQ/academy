export default function quizTabs() {
  const containers = document.querySelectorAll('.js-quiz-tabs');
  containers.forEach(container => {
    const progressbar = container.querySelector('.quiz__progressbar');
    const progressbarLabel = container.querySelector('.quiz__progressbar-label');
    const progressbarFill = progressbar.querySelector('.quiz__progressbar-fill');
    const nextButton = container.querySelector('.quiz__step-next');
    const prevButton = container.querySelector('.quiz__step-prev');
    const tabs = container.querySelectorAll('.quiz__step');
    let activeTabIndex = 0;

    function checkButtons(index) {
      if (prevButton) {
        if (tabs[index - 1]) {
          prevButton.classList.remove('disabled');
        } else {
          prevButton.classList.add('disabled');
        }
      }

      if (nextButton) {
        if (tabs[index + 1]) {
          nextButton.classList.remove('disabled');
        } else {
          nextButton.classList.add('disabled');
        }
      }
    }

    function setProgressBar() {
      const percent = `${(activeTabIndex + 1) / tabs.length * 100 - 100}%`;
      progressbarFill.style.transform = `translateX(${percent})`;
      progressbarLabel.textContent = `Шаг ${activeTabIndex + 1} из ${tabs.length}`;
    }

    function setActiveTab(index) {
      if (tabs[index]) {
        tabs[activeTabIndex].classList.remove('active');
        tabs[index].classList.add('active');
        activeTabIndex = index;

        checkButtons(index);
        setProgressBar();
      }
    }

    prevButton.addEventListener('click', () => {
      setActiveTab(activeTabIndex - 1);
    });

    nextButton.addEventListener('click', () => {
      setActiveTab(activeTabIndex + 1);
    });

    // Кнопка в сообщении об успехе
    const successTab = container.querySelector('.quiz__message');
    const progressbarSuccessLabel = container.querySelector('.quiz__progressbar-success');
    const navigation = container.querySelector('.quiz__navigation');
    const successTabButton = successTab.querySelector('.button')

    successTabButton.addEventListener('click', () => {
      setActiveTab(0);
      successTab.classList.remove('visible');
      progressbarSuccessLabel.classList.remove('visible');
      progressbarLabel.classList.remove('hidden');
      navigation.classList.remove('hidden');
    });
  })

  function openSuccessQuizTab(form) {
    if (form) {
      const tabs = form.querySelectorAll('.quiz__step');
      const successTab = form.querySelector('.quiz__message');
      const progressbarLabel = form.querySelector('.quiz__progressbar-label');
      const progressbarSuccessLabel = form.querySelector('.quiz__progressbar-success');
      const navigation = form.querySelector('.quiz__navigation');

      tabs.forEach(tab => {
        tab.classList.remove('active');
      })
      successTab.classList.add('visible');
      progressbarSuccessLabel.classList.add('visible');
      progressbarLabel.classList.add('hidden');
      navigation.classList.add('hidden');
    }
  }

  window.openSuccessQuizTab = openSuccessQuizTab;
}
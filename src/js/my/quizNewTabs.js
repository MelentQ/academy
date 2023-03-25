export default function quizNewTabs() {
    const containers = document.querySelectorAll('.js-quiz-new-tabs');
    containers.forEach(container => {
        const progressbar = container.querySelector('.quiz__progressbar');
        const progressbarLabel = container.querySelector('.quiz__progressbar-label');
        const progressbarFill = progressbar.querySelector('.quiz__progressbar-fill');
        const nextButton = container.querySelector('.quiz__step-next');
        const prevButton = container.querySelector('.quiz__step-prev');
        const tabs = [...container.querySelectorAll('[data-index]')];

        const hiddenPathInput = container.querySelector('.js-quiz-path');

        let activeTabIndex = null;
        const indexesPath = [];

        const activeTab = container.querySelector('.active[data-index]');
        if (activeTab) {
            activeTabIndex = activeTab.dataset.index;
        } else {
            const firstTab = container.querySelector('[data-index]');
            activeTabIndex = firstTab.dataset.index;
        }

        const firstIndex = activeTabIndex;
        const lastTab = container.querySelector('.last[data-index]');
        if (!lastTab) {
            tabs[tabs.length - 1].classList.add('last');
        }
        const lastIndex = container.querySelector('.last[data-index]').dataset.index;

        const levels = new Set(tabs.map(item => item.dataset.level));

        setActiveTab(activeTabIndex);

        container.classList.remove('loading');

        function checkButtons(index) {
            if (index == firstIndex) {
                prevButton.classList.add('disabled');
                nextButton.classList.remove('disabled');
            } else if (index == lastIndex) {
                prevButton.classList.remove('disabled');
                nextButton.classList.add('disabled');
            } else {
                prevButton.classList.remove('disabled');
                nextButton.classList.remove('disabled');
            }
        }

        tabs.forEach(tab => {
            const controls = tab.querySelectorAll('*[data-tab]');
            controls.forEach(control => {
                control.addEventListener('click', () => {
                    nextButton.dataset.tab = control.dataset.tab;
                })
            })
        })

        function setActiveTab(index) {
            if (!indexesPath.includes(index)) {
                indexesPath.push(index);
            }

            const newTab = tabs.find(item => item.dataset.index == index);
            const oldTab = tabs.find(item => item.dataset.index == activeTabIndex);

            if (newTab) {
                if (oldTab) {
                    oldTab.classList.remove('active');
                }
                newTab.classList.add('active');
                activeTabIndex = index;

                const controls = newTab.querySelectorAll('*[data-tab]');
                if (controls.length) {
                    const activeButton = newTab.querySelector('.active[data-tab]');
                    if (activeButton) {
                        nextButton.dataset.tab = activeButton.dataset.tab;
                    }
                } else {
                    if (newTab.dataset.next) {
                        nextButton.dataset.tab = newTab.dataset.next;
                    } else {
                        nextButton.dataset.tab = lastIndex
                    }
                }

                checkButtons(index);

                progressbarFill.style.transform = `translateX(${([...levels].indexOf(newTab.dataset.level) + 1) / [...levels].length * 100 - 100}%)`;
                progressbarLabel.textContent = `Шаг ${[...levels].indexOf(newTab.dataset.level) + 1} из ${[...levels].length}`;
            }

            if (hiddenPathInput) {
                hiddenPathInput.value = JSON.stringify(indexesPath);
            }
        }

        prevButton.addEventListener('click', () => {
            indexesPath.pop()
            setActiveTab(indexesPath[indexesPath.length - 1]);
        });

        nextButton.addEventListener('click', () => {
            setActiveTab(nextButton.dataset.tab);
        });

        // Кнопка в сообщении об успехе
        const successTab = container.querySelector('.quiz__message');
        const progressbarSuccessLabel = container.querySelector('.quiz__progressbar-success');
        const navigation = container.querySelector('.quiz__navigation');
        const successTabButton = successTab.querySelector('.button')

        successTabButton.addEventListener('click', () => {
            setActiveTab(firstIndex);
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
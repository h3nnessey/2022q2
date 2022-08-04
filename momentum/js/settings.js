const showSett = document.querySelector('.settings-show');
const settingsWrap = document.querySelector('.settings-wrapper');

showSett.addEventListener('click', () => {
    settingsWrap.classList.toggle('active');
});

settingsWrap.addEventListener('click', (e) => {
    if (e.target.classList.contains('settings-wrapper')) {
        settingsWrap.classList.toggle('active');
    }
});

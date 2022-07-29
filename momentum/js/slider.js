(function () {
    const slideNext = document.querySelector('.slide-next');
    const slidePrev = document.querySelector('.slide-prev');
    let randomNum;

    function getTimeOfDay() {
        const time = new Date().getHours() / 6;
        if (time > 0 && time < 1) {
            return 'night';
        }
        if (time > 1 && time < 2) {
            return 'morning';
        }
        if (time > 2 && time < 3) {
            return 'afternoon';
        }
        return 'evening';
    }

    function getRandomNum() {
        randomNum = Math.floor(Math.random() * 20) + 1;
    }
    getRandomNum();

    function setBg() {
        const img = new Image();
        const timeOfDay = getTimeOfDay();
        const bgNum = randomNum.toString().padStart(2, '0');
        const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
        img.src = url;
        img.addEventListener('load', () => (document.body.style.backgroundImage = `url(${url})`));
    }
    setBg();

    function getSlideNext() {
        randomNum = randomNum++ === 20 ? (randomNum = 1) : randomNum++;
        setBg();
    }
    function getSlidePrev() {
        randomNum = randomNum-- === 1 ? (randomNum = 20) : randomNum--;
        setBg();
    }

    slideNext.addEventListener('click', getSlideNext);
    slidePrev.addEventListener('click', getSlidePrev);
})();

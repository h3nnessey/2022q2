(function () {
    const slideNext = document.querySelector('.slide-next');
    const slidePrev = document.querySelector('.slide-prev');
    const [min, max] = [1, 20];
    let randomNum = getRandomNum(min, max);

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
    
    function getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function setBg() {
        const img = new Image();
        const timeOfDay = getTimeOfDay();
        const bgNum = randomNum.toString().padStart(2, '0');
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
        img.addEventListener(
            'load',
            () => (document.body.style.backgroundImage = `url(${img.src})`)
        );
    }

    function getSlideNext() {
        randomNum = randomNum++ === max ? (randomNum = min) : randomNum++;
        setBg();
    }

    function getSlidePrev() {
        randomNum = randomNum-- === min ? (randomNum = max) : randomNum--;
        setBg();
    }

    window.addEventListener('load', setBg);
    slideNext.addEventListener('click', getSlideNext);
    slidePrev.addEventListener('click', getSlidePrev);
})();

function slider() {
    const slideNext = document.querySelector('.slide-next');
    const slidePrev = document.querySelector('.slide-prev');
    const bgSrc = document.querySelector('.bg-source-input');
    const bgInput = document.querySelector('#bg-input');
    const bgBtns = document.querySelectorAll('.bg-source-input input');
    const [min, max] = [1, 20];
    let randomNum = getRandomNum(min, max);
    let isFlickr = false;
    let isUnsplash = false;
    let bgTag = '';

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

    function flickr(tag) {
        const API_KEY = '9adeed85c1215f11b0aa26290ae7cc4b';
        const timeOfDay = getTimeOfDay();
        tag = tag.replace(' ', ',');
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${
            tag ? tag : 'nature,' + timeOfDay
        }&tag_mode=all&extras=url_h&format=json&nojsoncallback=1&safe_search=1`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const filteredPhotos = data.photos.photo.filter((arr) => {
                    return arr.width_h > 1599;
                });
                const img = new Image();
                img.src = filteredPhotos[getRandomNum(0, filteredPhotos.length)].url_h;
                img.addEventListener('load', () => {
                    document.body.style.backgroundImage = `url(${img.src})`;
                });
            })
            .catch((error) => console.log(error));
    }

    function unsplash(tag) {
        const API_KEY = 'LREbfIzYLJSYzv7HZBStb1P9QdY-k8kLbFsAxMoB2aA';
        const timeOfDay = getTimeOfDay();
        tag = tag.replace(' ', '%20');
        const url = `https://api.unsplash.com/photos/random?query=${
            tag ? tag : 'nature%20' + timeOfDay
        }&client_id=${API_KEY}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const img = new Image();
                img.src = data.urls.regular;
                img.addEventListener('load', () => {
                    document.body.style.backgroundImage = `url(${img.src})`;
                });
            })
            .catch((error) => console.log(error));
    }

    function getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function setBg() {
        const img = new Image();
        const timeOfDay = getTimeOfDay();
        const bgNum = randomNum.toString().padStart(2, '0');
        img.src = `https://raw.githubusercontent.com/h3nnessey/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
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

    bgInput.addEventListener('change', (e) => {
        bgTag = bgInput.value;
        if (isFlickr) flickr(bgTag);
        if (isUnsplash) unsplash(bgTag);
    });

    bgSrc.addEventListener('change', (e) => {
        if (e.target.value === 'flickr') {
            isFlickr = true;
            isUnsplash = false;
            bgInput.disabled = false;
            bgInput.value = bgTag;
            flickr(bgTag);
        }
        if (e.target.value === 'unsplash') {
            isFlickr = false;
            isUnsplash = true;
            bgInput.disabled = false;
            bgInput.value = bgTag;
            unsplash(bgTag);
        }
        if (e.target.value === 'github') {
            isFlickr = false;
            isUnsplash = false;
            bgInput.disabled = true;
            bgInput.value = '';
            setBg();
        }
    });

    window.addEventListener('beforeunload', () => {
        localStorage.setItem('api', JSON.stringify({ isFlickr: isFlickr, isUnsplash: isUnsplash }));
        localStorage.setItem('bgTag', bgInput.value);
    });

    window.addEventListener('load', () => {
        if (localStorage.getItem('api')) {
            const api = JSON.parse(localStorage.getItem('api'));
            isFlickr = api.isFlickr;
            isUnsplash = api.isUnsplash;
            bgBtns[1].checked = isFlickr;
            bgBtns[2].checked = isUnsplash;
        }
        if (localStorage.getItem('bgTag')) {
            bgTag = localStorage.getItem('bgTag');
            bgInput.value = bgTag;
        }
        if (isFlickr) {
            bgInput.disabled = false;
            bgTag = bgInput.value;
            flickr(bgTag);
        } else if (isUnsplash) {
            bgInput.disabled = false;
            bgTag = bgInput.value;
            unsplash(bgTag);
        } else {
            bgInput.disabled = true;
            setBg();
        }
    });

    slideNext.addEventListener('click', () => {
        if (isFlickr) {
            flickr(bgTag);
        } else if (isUnsplash) {
            unsplash(bgTag);
        } else {
            getSlideNext();
        }
    });

    slidePrev.addEventListener('click', () => {
        if (isFlickr) {
            flickr(bgTag);
        } else if (isUnsplash) {
            unsplash(bgTag);
        } else {
            getSlidePrev();
        }
    });
}

export default slider;

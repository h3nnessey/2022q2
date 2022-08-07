import playList from './playList.js';

function player() {
    const audio = new Audio();
    const playListElement = document.querySelector('.play-list');
    const [prevBtn, playBtn, nextBtn] = document.querySelector('.player-controls').children;
    const volumeBtn = document.querySelector('.volume-btn');
    const [currentTime, , duration] = document.querySelector('.audio-time').children;
    const [timeSlider, timeThumb, timeProgress] =
        document.querySelector('.time-range-slider').children;
    const [volumeSlider, volumeThumb, volumeProgress] =
        document.querySelector('.volume-range-slider').children;
    const [title, subtitle] = document.querySelector('.audio-about').children;
    const counter = document.querySelector('.audio-counter');
    let songIndex = 0,
        currentVolume,
        timer;
        
    playList.forEach((el, idx) => {
        const li = document.createElement('li');
        li.classList.add('play-item');
        [li.textContent, li.id] = [`${el.title} - ${el.subtitle}`, idx];
        li.addEventListener('click', (e) => {
            if (+e.target.id !== songIndex) {
                songIndex = +e.target.id;
                loadSong(songIndex);
                playSong();
            } else {
                toggleSound(e);
            }
        });
        playListElement.append(li);
    });

    function loadSong(songIndex) {
        clearInterval(timer);
        currentTime.textContent = '00:00';
        duration.textContent = '00:00';
        timeProgress.style.width = 0;
        timeThumb.style.left = 0;
        timeSlider.value = 0;
        audio.src = playList[songIndex].src;
        audio.load();
        title.textContent = playList[songIndex].title;
        subtitle.textContent = playList[songIndex].subtitle;
        counter.textContent = `#${songIndex + 1} of ${playList.length}`;
        setCurrentSong(songIndex);
        playListElement.scrollTop =
            playListElement.children[songIndex].offsetTop - playListElement.offsetTop;
        timer = setInterval(setTime, 1000);
    }
    loadSong(songIndex);

    function playSong(e) {
        audio.play();
        playBtn.classList.add('pause');
        setActive(songIndex);
    }

    function pauseSong(e) {
        audio.pause();
        playBtn.classList.remove('pause');
        const currentSong = playListElement.children[songIndex];
        if (currentSong.classList.contains('item-active')) {
            currentSong.classList.remove('item-active');
        }
    }

    function playNext() {
        songIndex++;
        if (songIndex > playList.length - 1) {
            songIndex = 0;
        }
        loadSong(songIndex);
        playSong();
    }

    function playPrev() {
        songIndex--;
        if (songIndex < 0) {
            songIndex = playList.length - 1;
        }
        loadSong(songIndex);
        playSong();
    }

    function setTime() {
        let currVal = 0;
        if (!isNaN(audio.duration)) {
            currVal = audio.currentTime * (100 / audio.duration);
            timeSlider.value = currVal;
            const currentMinutes = Math.floor(audio.currentTime / 60);
            const currTime = audio.currentTime;
            if (currTime > 59) {
                currentTime.textContent = `${setPadStart(currentMinutes)}:${setPadStart(
                    Math.floor(currTime - currentMinutes * 60)
                )}`;
            } else {
                currentTime.textContent = `${setPadStart(currentMinutes)}:${setPadStart(
                    Math.floor(currTime)
                )}`;
            }
            duration.textContent = playList[songIndex].duration;
        }
    }

    function setActive(songIndex) {
        playListElement.childNodes.forEach((el, idx) => {
            idx !== songIndex
                ? el.classList.remove('item-active')
                : el.classList.add('item-active');
        });
    }

    function setCurrentSong(songIndex) {
        playListElement.childNodes.forEach((el, idx) => {
            idx !== songIndex ? el.classList.remove('current') : el.classList.add('current');
        });
    }

    function toggleSound(e) {
        playBtn.classList.contains('pause') ? pauseSong(e) : playSong(e);
    }

    function setVolume() {
        audio.volume = volumeSlider.value / 100;
        currentVolume = audio.volume;
        const currentVolumePercentage = audio.volume * 100;
        volumeSlider.value = currentVolumePercentage;
        volumeProgress.style.width = `${currentVolumePercentage}%`;
        volumeThumb.style.left = `${currentVolumePercentage}%`;
        if (!audio.volume) {
            volumeBtn.classList.add('muted');
        } else {
            volumeBtn.classList.remove('muted');
        }
    }

    function toggleVolume() {
        if (audio.volume) {
            currentVolume = audio.volume;
            audio.volume = 0;
            volumeSlider.value = 0;
            volumeProgress.style.width = 0;
            volumeThumb.style.left = 0;
            volumeBtn.classList.add('muted');
        } else {
            audio.volume = currentVolume;
            const volumePercentage = currentVolume * 100;
            volumeSlider.value = volumePercentage;
            volumeProgress.style.width = `${volumePercentage}%`;
            volumeThumb.style.left = `${volumePercentage}%`;
            volumeBtn.classList.remove('muted');
        }
        if (!currentVolume) {
            audio.volume = 0.3;
            volumeSlider.value = 30;
            volumeProgress.style.width = '30%';
            volumeThumb.style.left = '30%';
            volumeSlider.classList.toggle('muted');
        }
    }

    function setTimeOnTimeUpdate() {
        const currentAudioTime = Math.floor(audio.currentTime);
        const timePercentage = `${(currentAudioTime / audio.duration) * 100}%`;
        timeProgress.style.width = timePercentage;
        timeThumb.style.left = timePercentage;
    }

    function setTimeOnInput() {
        const val = `${(timeSlider.value / audio.duration) * 100}%`;
        timeProgress.style.width = val;
        timeThumb.style.left = val;
        audio.currentTime = timeSlider.value;
        setTime();
    }

    function setOnLoadMeta() {
        setTime();
        timeSlider.setAttribute('max', audio.duration);
    }

    function setPadStart(el) {
        return el.toString().padStart(2, '0');
    }

    function setStorage() {
        localStorage.setItem('vol', (audio.volume * 100).toString());
    }

    function getStorage() {
        const val = localStorage.getItem('vol');
        if (val) {
            volumeSlider.value = val;
        }
        setVolume();
    }

    audio.addEventListener('loadedmetadata', setOnLoadMeta);
    audio.addEventListener('timeupdate', setTimeOnTimeUpdate);
    audio.addEventListener('ended', playNext);
    timeSlider.addEventListener('input', setTimeOnInput);
    playBtn.addEventListener('click', toggleSound);
    nextBtn.addEventListener('click', playNext);
    prevBtn.addEventListener('click', playPrev);
    volumeSlider.addEventListener('input', setVolume);
    volumeSlider.addEventListener('change', setVolume);
    volumeBtn.addEventListener('click', toggleVolume);
    window.addEventListener('beforeunload', setStorage);
    window.addEventListener('load', getStorage);
}

export default player;

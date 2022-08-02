import playList from './playList.js';

const playListElement = document.querySelector('.play-list');
const audio = document.querySelector('.audio');
const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.play-next');
const prevBtn = document.querySelector('.play-prev');
const volume = document.querySelector('.audio-volume');
const volumeBtn = document.querySelector('.volume-btn');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const title = document.querySelector('.audio-title');

let songIndex = 0,
    currentVolume;

playList.forEach((el, idx) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    [li.textContent, li.id] = [el.title, idx];
    li.addEventListener('click', () => {
        songIndex = +li.id;
        loadSong(songIndex);
        playSong();
    });
    playListElement.append(li);
});

function loadSong(songIndex) {
    audio.src = playList[songIndex].src;
    title.textContent = playList[songIndex].title;
    setActive(songIndex);
}
loadSong(songIndex);

function playSong() {
    audio.play();
    playBtn.classList.add('pause');
}

function pauseSong() {
    audio.pause();
    playBtn.classList.remove('pause');
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

function setActive(songIndex) {
    playListElement.childNodes.forEach((el, idx) => {
        idx !== songIndex ? el.classList.remove('item-active') : el.classList.add('item-active');
    });
}

function toggleSound() {
    playBtn.classList.contains('pause') ? pauseSong() : playSong();
}

function setVolume() {
    audio.volume = volume.value / 100;
    currentVolume = audio.volume;
    volume.value = audio.volume * 100;
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
        volume.value = 0;
        volumeBtn.classList.add('muted');
    } else {
        audio.volume = currentVolume;
        volume.value = currentVolume * 100;
        volumeBtn.classList.remove('muted');
    }
    if (!currentVolume) {
        audio.volume = 0.3;
        volume.value = 30;
        volume.classList.toggle('muted');
    }
}

function setPadStart(el) {
    return el.toString().padStart(2, '0');
}

function setTime() {
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
    setTimeout(setTime, 1000);
}

function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
}

function setStorage() {
    localStorage.setItem('vol', (audio.volume * 100).toString());
}

function getStorage() {
    const val = localStorage.getItem('vol');
    if (val) {
        volume.value = val;
    }
}

audio.addEventListener('loadedmetadata', setTime);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', playNext);
progressContainer.addEventListener('click', setProgress);
playBtn.addEventListener('click', toggleSound);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);
volume.addEventListener('input', setVolume);
volume.addEventListener('change', setVolume);
volumeBtn.addEventListener('click', toggleVolume);
window.addEventListener('beforeunload', setStorage);
window.addEventListener('load', () => {
    getStorage();
    setVolume();
});

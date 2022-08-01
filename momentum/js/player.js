import playList from './playList.js';

const playListElement = document.querySelector('.play-list');
const audio = document.querySelector('.audio');
const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.play-next');
const prevBtn = document.querySelector('.play-prev');
const volume = document.querySelector('.audio-volume');
const volumeBtn = document.querySelector('.volume-btn');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration')
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const title = document.querySelector('.audio-title')

let songIndex = 0,
    currentVolume;

playList.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
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
    if (audio.volume === 0) {
        volumeBtn.classList.add('muted');
    } else {
        volumeBtn.classList.remove('muted')
    }
}

function toggleVolume() {
    if (audio.volume !== 0) {
        currentVolume = audio.volume
        audio.volume = 0;
        volumeBtn.classList.add('muted')
    } else {
        audio.volume = currentVolume
        volumeBtn.classList.remove('muted')
    }
    if (currentVolume === 0) {
        audio.volume = 0.3;
        volume.value = 30;
        volume.classList.toggle('muted')
    }
}

function setPadStart(el) {
    return el.toString().padStart(2, '0')
}

function setTime() {
    // const time = audio.duration;
    // const minutes = Math.floor(time / 60);
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currTime = audio.currentTime;
    if (currTime > 59) {
        currentTime.textContent = `${setPadStart(currentMinutes)}:${setPadStart(Math.floor(currTime - (currentMinutes * 60)))}`;
    } else {
        currentTime.textContent = `${setPadStart(currentMinutes)}:${setPadStart(Math.floor(currTime))}`;
    }
    duration.textContent = playList[songIndex].duration
    // if (isNaN(time)) {
    //     duration.textContent = '00:00';
    // } else {
    //     duration.textContent = `${setPadStart(minutes)}:${setPadStart(Math.floor(time - minutes * 60))}`;
    // }
    setTimeout(setTime, 1000)
}
// duration в json)))))

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function setStorage() {
    localStorage.setItem('vol', (audio.volume * 100).toString())
}

function getStorage() {
    const val = localStorage.getItem('vol');
    if (val) {
        volume.value = val;
    }
}

audio.addEventListener('loadedmetadata', setTime)
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
})
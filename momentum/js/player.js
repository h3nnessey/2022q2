import playList from './playList.js';

const playListElement = document.querySelector('.play-list');
const audio = document.querySelector('.audio');
const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.play-next');
const prevBtn = document.querySelector('.play-prev');
const volume = document.querySelector('.audio-volume');
const volumeBtn = document.querySelector('.volume-btn'); // заменить
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration')
const progress = document.querySelector('.progress-bar');

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
    const time = audio.duration;
    const minutes = Math.floor(time / 60);
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currTime = audio.currentTime;
    if (currTime > 59) {
        currentTime.textContent = `${setPadStart(currentMinutes)}:${setPadStart(Math.floor(currTime - (currentMinutes * 60)))}`;
    } else {
        currentTime.textContent = `${setPadStart(currentMinutes)}:${setPadStart(Math.floor(currTime))}`;
    }
    duration.textContent = `${setPadStart(minutes)}:${setPadStart(Math.floor(time - minutes * 60))}`;
    updateProgress()
    setTimeout(setTime, 1000)
} // refactor this shit


function updateProgress() {
    let progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
    progress.value = progressPercent
}

function setProgress() {
    audio.currentTime = (progress.value / 100) * audio.duration;
}

// function setStorage() {
//     localStorage.setItem('volume', audio.volume.toString())
// }

// function getStorage() {
//     let volumeValue = localStorage.getItem('volume');
//     audio.volume = +volumeValue;
//     volume.value = +volumeValue * 100;
// }


progress.addEventListener('input', setProgress)
audio.addEventListener('loadedmetadata', setTime)
playBtn.addEventListener('click', toggleSound);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);
audio.addEventListener('ended', playNext);
volume.addEventListener('input', setVolume);
volumeBtn.addEventListener('click', toggleVolume);
// window.addEventListener('beforeunload', setStorage)
// window.addEventListener('load', getStorage);
import playList from './playList.js';

const playListElement = document.querySelector('.play-list');
const audio = document.querySelector('.audio');
const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.play-next');
const prevBtn = document.querySelector('.play-prev');
const volume = document.querySelector('.audio-volume');

playList.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    playListElement.append(li);
});

let songIndex = 0;

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
        if (idx !== songIndex) {
            el.classList.remove('item-active');
        } else {
            el.classList.add('item-active');
        }
    });
}

playBtn.addEventListener('click', () => {
    const isPlay = playBtn.classList.contains('pause');
    if (isPlay) {
        pauseSong();
    } else {
        playSong();
    }
});

nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);
audio.addEventListener('ended', playNext);
volume.addEventListener('input', () => {
    audio.volume = +volume.value / 100;
});

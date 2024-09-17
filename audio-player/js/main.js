const player = document.querySelector(".player");
const btnPlay = document.querySelector(".btn-play");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const audio = document.querySelector(".audio");
const progressWrap = document.querySelector(".player__progress-wrapper");
const progress =  document.querySelector(".player__progress");
const img = document.querySelector(".player__cover-img");
const nameTrack = document.querySelector(".player__track-name");
const artist = document.querySelector(".player__track-artist");
const icon = document.querySelector(".img__src");

// названия треков
const tracks = ["Love and Sex and Magic", "Takie devchonki", "Dont start now"];

// первый трек
let trackIndex = 0;

//init
function loadTrack(track) {
    nameTrack.innerHTML = track
    audio.src = `audio/${track}.mp3`
    img.src = `img/covers/${trackIndex + 1}.jpg`
}

loadTrack(tracks[trackIndex])

//play
function playTrack() {
    player.classList.add('play');
    icon.src = 'img/pause.png'
    audio.play();
}

//pause
function pauseTrack() {
    player.classList.remove('play');
    icon.src = 'img/play.png'
    audio.pause();
}

btnPlay.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play');
    if (isPlaying) {
        pauseTrack()
    } else {
        playTrack();
    }
})

//next track
function nextTrack() {
    trackIndex++

    if (trackIndex > tracks.length - 1) {
        trackIndex = 0;
    }

    loadTrack(tracks[trackIndex]);
    playTrack();
}

btnNext.addEventListener('click', () => {
    nextTrack();
})

//prev track
function prevTrack() {
    trackIndex--

    if (trackIndex < 0) {
        trackIndex = tracks.length - 1;
    }

    loadTrack(tracks[trackIndex]);
    playTrack();
}

btnPrev.addEventListener('click', () => {
    prevTrack();
})

// progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`

}

audio.addEventListener('timeupdate', updateProgress)

// set progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;


}

progressWrap.addEventListener('click', setProgress);

// autoplay

audio.addEventListener('ended', nextTrack)
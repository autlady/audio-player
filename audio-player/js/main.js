const player = document.querySelector(".player");
const btnPlay = document.querySelector(".btn-play");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const audio = document.querySelector(".audio");
const totalTime = document.querySelector(".player__time .time-total");
const current = document.querySelector(".player__time .time-current");
const progressWrap = document.querySelector(".player__progress-wrapper");
const progress =  document.querySelector(".player__progress");
const img = document.querySelector(".player__cover-img");
const nameTrack = document.querySelector(".player__track-name");
const artistTrack = document.querySelector(".player__track-artist");
const icon = document.querySelector(".img__src");
const volume = document.querySelector(".btn-sound");
const volumeIcon = document.querySelector(".img__sound");

// названия треков
const tracks = ["Love and Sex and Magic", "Takie devchonki", "Dont start now"];

// названия исполнителей
const artists = ["Purple Avenue", "Mumii Troll", "Dua Lipa"];

// первый трек
let trackIndex = 0;

//init
function loadTrack(track, artist) {
    nameTrack.innerHTML = track
    audio.src = `audio/${track}.mp3`
    img.src = `img/covers/${trackIndex + 1}.jpg`
    artistTrack.innerHTML = artist
    setTime()
}

loadTrack(tracks[trackIndex], artists[trackIndex])


//set time
function setTime() {
    audio.addEventListener("loadeddata", () => {
        const audioDuration = audio.duration;
        totalTime.textContent = getTimeCodeFromNum(audioDuration);
    })
}

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
    let sec = parseInt(num);
    let min = parseInt(sec / 60);
    sec -= min * 60;
    const hours = parseInt(min / 60);
    min -= hours * 60;

    if (hours === 0) return `${min}:${String(sec % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${min}:${String(
      sec % 60
    ).padStart(2, 0)}`;
  }

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

    loadTrack(tracks[trackIndex], artists[trackIndex]);
    setTime();
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

    loadTrack(tracks[trackIndex], artists[trackIndex]);
    setTime();
    playTrack();
}

btnPrev.addEventListener('click', () => {
    prevTrack();
})

//sound button
function soundOn() {
    volumeIcon.src = 'img/sound.png'
    player.classList.remove('muted');
}

function soundOff() {
    volumeIcon.src = 'img/no-sound.png'
    player.classList.add('muted');
}

volume.addEventListener('click', () => {
    audio.muted = !audio.muted

   const isSound = player.classList.contains('muted');
    if (isSound) {
        soundOn();
    } else {
        soundOff();
    }
})


// progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`

    const audioCurrentTime = audio.currentTime;
    current.textContent = getTimeCodeFromNum(audioCurrentTime);
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
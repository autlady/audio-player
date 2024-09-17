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
let trackIndex = 1;

//init
function loadTrack(track) {
    nameTrack.innerHTML = track
    audio.src = 'audio/${track}.mp3'
    img.src = './img/covers/${trackIndex + 1}.jpg'
}

loadTrack(tracks[trackIndex])

//play track
// function playTrack(track) {

// }
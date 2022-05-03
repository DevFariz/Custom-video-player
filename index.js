//creating varibales
const videoPlayer = document.querySelector(".video-player");
const video = document.querySelector('.viewer');
const progress = document.querySelector('.video-progress');
const progressBar = videoPlayer.querySelector(".progress__filled");
const progressDefault = videoPlayer.querySelector(".video-progress-default");
const progressBarDefault = videoPlayer.querySelector(".progress__filled-default");
const playButton = document.querySelector(".player__button");
const ranges = document.querySelector('.player__slider');
const volume = videoPlayer.querySelector(".voice__slider");
const currentTimeElement = videoPlayer.querySelector(".current");
const durationTimeElement = videoPlayer.querySelector(".duration");
const mute = videoPlayer.querySelector(".mute");
const fullscreen = videoPlayer.querySelector(".fullscreen");

// adding play pause
function togglePlay(){
    if(video.paused){
        video.play();
        document.querySelector(".play-pause").style.display = "none";
    }
    else{
        video.pause();
        document.querySelector(".play-pause").style.display = "block";
    }
}

function updateButton(){
    const icon = this.paused ? "►" : "❚❚";
    playButton.textContent = icon;
}

video.addEventListener("click", togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton)
playButton.addEventListener("click", togglePlay);
document.querySelector(".play-pause").addEventListener('click', togglePlay);

// adding volume functionality
volume.addEventListener('mousemove', (e) => {
    video.volume = e.target.value;

    if(video.volume == 0){
        mute.classList.add('muted');
    }
    else{
        mute.classList.remove('muted');
    }

     let volPercentage = video.volume * 100;
     document.querySelector(".voice__slider").style.background = `linear-gradient( to right, rgb(180, 170, 170) 0%, rgb(180, 170, 170) ${volPercentage}%, rgb(56, 50, 50) ${volPercentage}%, rgb(56, 50, 50) 100% )`;

});

// adding current time and duration
const currentTime = () => {
    let currentMinutes = Math.floor(video.currentTime / 60);
    let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(video.duration / 60);
    let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

    currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
    durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds}`;
}

video.addEventListener("timeupdate", currentTime)

// Progress bar
video.addEventListener("timeupdate", () => {
    const precentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${precentage}%`;
    progressBarDefault.style.width = `${precentage}%`; //hjg
});

progress.addEventListener('click', (e) =>{
    const progressTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = progressTime;
  });



  // mute button
mute.addEventListener("click", () => {

    video.muted = !video.muted;
    mute.classList.toggle('muted');


})

//fullscreen
function checkFullscreen(){
    if(videoPlayer.classList.contains("fullscreenActive")){
        document.exitFullscreen(); 
        videoPlayer.classList.remove("fullscreenActive");
    }
    else{
        videoPlayer.classList.add("fullscreenActive");
        videoPlayer.requestFullscreen();
    }
}

fullscreen.addEventListener("click", checkFullscreen)




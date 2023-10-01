let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songitems = Array.from(document.getElementsByClassName('songitems'));
let masterSongName = document.getElementById('masterSongName')

let songs = [
    {songName:'Agar tum saath ho', filepath:'songs/1.mp3', coverpath:'covers/1.jpg'},
    {songName:'Dildaara', filepath:'songs/2.mp3', coverpath:'covers/2.jpg'},
    {songName:'I am in love', filepath:'songs/3.mp3', coverpath:'covers/3.jpg'},
    {songName:'Kabira', filepath:'songs/4.mp3', coverpath:'covers/4.jpg'},
    {songName:'Kesariya', filepath:'songs/5.mp3', coverpath:'covers/5.jpg'},
    {songName:'Te amo(duet)', filepath:'songs/6.mp3', coverpath:'covers/6.jpg'},
    {songName:'Tera hone laga hu', filepath:'songs/7.mp3', coverpath:'covers/7.jpg'},
    {songName:'Tere Hawaale', filepath:'songs/8.mp3', coverpath:'covers/8.jpg'},
    {songName:'Tum hi ho Bandhu', filepath:'songs/9.mp3', coverpath:'covers/9.jpg'},
    {songName:'Tum se hi', filepath:'songs/10.mp3', coverpath:'covers/10.jpg'},
]

songitems.forEach(function(element,i){
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName;
})

//Handel play pause

masterPlay.addEventListener('click', function(){
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity= 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity= 0;
    }
});
//Listen to event
audioElement.addEventListener('timeupdate', function(){
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', function(){
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        masterSongName.innerHTML = songs[songIndex-1].songName;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex}.mp3`
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;    
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;  
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

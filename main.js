//Jukebox object holds all the songs and controlls playback
function jukebox(jukebox){
	this.jukebox=[]
	this.nowPlaying=0
}
//Song objects will provide the jukebox with songs to play
function song(name, audioSrc){
	this.name=name,
	this.audioSrc=new Audio(audioSrc);
}
//Make a prototype chain between jukebox and songs
jukebox.prototype=Object.create(song.prototype);

jukebox.prototype.addSong=function(song){
	this.jukebox.push(song)
}


var juke = new jukebox(juke)
var song1 = new song('Stand Back-Stevie Nicks','Songs/standBack.mp3')
var song2 = new song('Talk to Me-Stevie Nicks', 'Songs/talkToMe.mp3')
var song3 = new song('Gypsy-Fleetwood Mac', 'Songs/gypsy.mp3')
console.log(song1)
juke.addSong(song2)
juke.addSong(song1)
juke.addSong(song3)
console.log(juke)


var body = document.querySelector('body')
document.getElementById('startBtn').addEventListener('click', function(){
	var nowPlaying = document.createElement('div')
	nowPlaying.innerHTML = '<h4>' + juke.jukebox[0].name + '</h4>'
	var audio = juke.jukebox[0].audioSrc
	audio.play();
	nowPlaying.setAttribute('id', 'nowPlaying');
	body.appendChild(nowPlaying)
	document.getElementById('startBtn').style.display = 'none'
	document.getElementById('controlls-all').style.display = 'inline-block'
})

document.getElementById('pause').addEventListener('click', function(){
	len = juke.jukebox.length
	for(var x=0; x<len; x++){
		juke.jukebox[x].audioSrc.pause()
	}
	
})

//resume button
jukebox.prototype.resume = function(){
	var resume = juke.jukebox[this.nowPlaying].audioSrc
	resume.play();
}

document.getElementById('play').addEventListener('click', function(){
	juke.resume();
	
})





//skip button
jukebox.prototype.next = function(){
	juke.jukebox[this.nowPlaying].audioSrc.pause()
	this.nowPlaying++
	var playNow = juke.jukebox[this.nowPlaying].audioSrc
	console.log(playNow)
	playNow.play()
	var current = document.getElementById('nowPlaying')
		current.innerHTML = '<h4>' + juke.jukebox[this.nowPlaying].name + '</h4>';
		
}

document.getElementById('skip').addEventListener('click', function(){ 
		juke.next()
	
})
// 



//this gets the audio file to play
// var audio = song1.audioSrc
// 	audio.play()
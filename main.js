SC.initialize({
	client_id: 'fd4e76fc67798bfa742089ed619084a6'
})
//Jukebox object holds all the songs and controlls playback
function jukebox(jukebox){
	this.jukebox=[]
	this.nowPlaying=0
}
//Song objects will provide the jukebox with songs to play
function song(name, audioSrc){
	this.name='',
	this.audioSrc=''
	this.artwork=''
	this.artist=''
}
//Make a prototype chain between jukebox and songs
jukebox.prototype=Object.create(song.prototype);

jukebox.prototype.addSong=function(song){
	this.jukebox.unshift(song)
}

var songz = new song();
var songz2 = new song();
 var juke = new jukebox(juke)
// var song1 = new song('Stand Back-Stevie Nicks','Songs/standBack.mp3')
// var song2 = new song('Talk to Me-Stevie Nicks', 'Songs/talkToMe.mp3')
// var song3 = new song('Gypsy-Fleetwood Mac', 'Songs/gypsy.mp3')
// console.log(song1)
// juke.addSong(song2)
// juke.addSong(song1)
// juke.addSong(song3)
// console.log(juke)

SC.get('/tracks/122641911').then(function(song){
	console.log(song)
	songz.name=song.title
	songz.audioSrc=song.id
	songz.artwork=song.artwork_url
	songz.artist=song.user.username
	console.log(songz)
	juke.addSong(songz)
	})

SC.get('/tracks/122734045').then(function(song){
	console.log(song)
	songz2.name=song.title
	songz2.audioSrc=song.id
	songz2.artwork=song.artwork_url
	songz2.artist=song.user.username
	juke.addSong(songz2)
})

var body = $('body')
	$('#startBtn').click(function(){
		$('#card-songs').append('<img src="'+juke.jukebox[0].artwork+'">'+'<br>'+'<h4 id="playing">'+juke.jukebox[0].name+'<br>'+juke.jukebox[0].artist+'</h4>')
		SC.stream('/tracks/' + juke.jukebox[0].audioSrc).then(function(song){
				console.log(song.title);
				song.play();
		

	})
	
	
})


	

$('#startBtn').click(function(){
	$('#startBtn').fadeOut('slow',function(){
		$('#card-songs').fadeIn('slow')
		$('#controlls-all').fadeIn('slow')
	})
		
	})
	
// $('#pause').click(function(){
// 	// var stopNow = juke.jukebox[this.nowPlaying].audioSrc
// 	// console.log(stopNow)
// 		SC.stream('/tracks/' + juke.jukebox[this.nowPlaying].audioSrc).then(function(song){
// 			song.pause()
// 		})
			
// 		})



//resume button
// jukebox.prototype.resume = function(){
// 	var resume = juke.jukebox.[nowPlaying].audioSrc
// 	resume.play();
// }

// $('#play').click(function(){
// 	juke.resume();
	
// })





//skip button
jukebox.prototype.next = function(){
	var playNow = juke.jukebox[this.nowPlaying].audioSrc
	var playing = $('#playing')
	var len = juke.jukebox.length
	if(this.nowPlaying==len-1){
		this.nowPlaying = 0
		$('#card-songs').html('<img src="'+juke.jukebox[0].artwork+'">'+'<br>'+'<h4 id="playing">'+juke.jukebox[0].name+'<br>'+juke.jukebox[0].artist+'</h4>')
	
	SC.stream('/tracks/' + playNow).then(function(song){
				song.play();
			
})
	}else{
		this.nowPlaying++
	$('#card-songs').html('<img src="'+juke.jukebox[this.nowPlaying].artwork+'">'+'<br>'+'<h4 id="playing">'+juke.jukebox[this.nowPlaying].name+'<br>'+juke.jukebox[this.nowPlaying].artist+'</h4>')
	
	SC.stream('/tracks/' + playNow).then(function(song){
				//console.log(song);
				song.play();
	
	
	
		
})
}
}

$('#skip').click(function(){ 
		juke.next()
	
})

//back button
jukebox.prototype.back = function(){
	var playNow = juke.jukebox[this.nowPlaying].audioSrc
	var playing = $('#playing')
	var len = juke.jukebox.length
	this.nowPlaying--
	$('#card-songs').html('<img src="'+juke.jukebox[this.nowPlaying].artwork+'">'+'<br>'+'<h4 id="playing">'+juke.jukebox[this.nowPlaying].name+'<br>'+juke.jukebox[this.nowPlaying].artist+'</h4>')
	
	SC.stream('/tracks/' + playNow).then(function(song){
				song.play();
	
	
	
		
})
}


$('#back').click(function(){ 
		juke.next()
	
})

// Initializing Soundcloud API


// $('#card-songs').attr('<img src="'+juke.jukebox[this.nowPlaying].artwork+'">'+'<br>'+'<h4 id="playing">'+juke.jukebox[this.nowPlaying].name+'<br>'+juke.jukebox[this.nowPlaying].artist+'</h4>')


//$('#startBtn').click(function(){

	// SC.get('/playlists/284105495').then(function(playlist) {
	// 	len = playlist.tracks.length;
	// 	console.log(len);
	// 	for (i=0; i<len; i++){
	// 		$('#card-songs').append('<h5 class="tracklist" id="' + playlist.tracks[i].id + '">'+playlist.tracks[i].title+' <i class="fa fa-play-circle" aria-hidden="true"></i></h5>');
	// 	}
	// 	$('.tracklist').click(function(){
	// 		songId = this.id;
	// 		console.log(songId);
	// 		//$(this).attr('class', "fa fa-music")

	// 		SC.stream('/tracks/' + songId).then(function(song){
	// 			console.log(song.title);
	// 			song.play();
	// 			$('#pause').click(function(){
	// 				song.pause()
	// 				})
	// 			$('#play').click(function(){

	// 				song.play();
	// 			})
	// 			player.on('finish', function(){
	// 				var nextSong = $('h5').next(function(){
	// 					songId++
	// 					SC.stream('/tracks/'+songId).then(function(song){
	// 						song.play();
	// 					})
	// 				})
	// 			})
	// 					//ends SC.stream
	// 					})	
			

	// 		//ends tracklist Click
	// 		})
	// 	//ends SC.get	
	// 	})
	// //ends whole function	
	// //})
	



	


	


 

//closing document.ready


// 	SC.stream('/playlists/' + songId).then(function(song){
// 	console.log(song.title)
// 	song.play();
// })




//17100851
//$('body').append('<h1 id="songName">' + tracks.title + '</h1>')




      
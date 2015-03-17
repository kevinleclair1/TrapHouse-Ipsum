var app = {};
$trapLogo = $('.trapLogo');

app.url = 'http://api.lyricsnmusic.com/songs';
app.storageArray = [];
app.key = function(){
	var key = "d70fcbedbb1bc88d8e4eb73b8d639d";
	return key
}

app.init = function(){
	$('form').on('submit', function(e){
		e.preventDefault();
		app.swingChain();
		app.burr();
		if ($('.para')) {
			$('.resultsBox').empty();
		}
		var paraNum = $('select option:selected').val();
		app.getWords(paraNum);
	});
}

app.getWords = function(paraVal){
	var query = {
		api_key: app.key,
		artist: 'gucci mane',
	}
	$.ajax({
		url: app.url,
		type : 'GET',
		dataType: 'jsonp',
		data: query,
		success: function(data) { //function is a callback, will work when data is received 
			var storeArray = []
			for (var i = 0; i < data.data.length; i++) {
				//loop over each array item
				var snippet = data.data[i].snippet
				var lyrics = snippet.split('\r\n');
				lyrics.pop();
				console.log(lyrics);
				//filter through lyrics array here
				for (var x = 0; x < lyrics.length; x++) {
					if (!(lyrics[x] === '' || lyrics[x] === '[Chorus]' || lyrics[x] === '(GUCCI MANE VERSE#1)' || lyrics[x] === '("...')) {
						storeArray.push(lyrics[x]);
					};
				};
				//make sure there are no repeats with if statement
				// grab snippet
				// push string to new function
				
			};
			var lyricsArray = app.removeDup(storeArray);
			//choose random elements from lyricsArray to put into dom
			//write function to push paragraph onto page
			//for loop that takes drop down select value
			for (var i = 0; i < paraVal; i++) {
				app.insertParagraph(storeArray)
			};
		},
	});
};
app.removeDup = function(arr){
	var tempObj = {};
	var j = 1;
	for (var i = 0; i < arr.length; i++) {
		tempObj[arr[i]] = j;
		j++
	};
	var final = [];
	for (var key in tempObj) {
		final.push(key);
	} 	
	return final;
};
app.insertParagraph = function(arr){
	//empty array needed to push random array items into new sentence array
	var para = $('<div>').addClass('para');
	var paraText = $('<p>');
	for (var i = 0; i < 15; i++) {
		//loop through array and push 
		var phraseArray = []; 
		var num = Math.floor(Math.random()*arr.length);
		// var charArray = arr[i].split('')
		// find length of charArray, put value into variable
		// if last item is equal to ! ? . remove last item in charArray
		// loop over charArray and put back into new string
		var phrase = $('<span>').addClass('phrase').html(arr[num] + ' ' + '&#65284; ');
		paraText.append(phrase);
		para.append(paraText);
	};
	$('.resultsBox').append(para);
};
app.swingChain = function(){
	$trapLogo.addClass('animated swing');
	$trapLogo.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$trapLogo.removeClass('animated swing');
	});
};
app.burr = function(){
	var sounds = ['Sounds/airhorn.wav', 'Sounds/burr.wav', 'Sounds/versace.wav', 'Sounds/wucash.wav', 'Sounds/gunshot.wav'];
	var num = Math.floor(Math.random()*sounds.length);
	var randomSound = sounds[num];
	var sample = $('audio').attr('src', randomSound);
	sample.currentTime = 0;
	sample[0].play();
};

$(function() {
	app.init();
	app.swingChain();
});
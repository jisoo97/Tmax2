const NOTE_MARGIN = 2;

var pattern;
var firstNote = [];
var score = 0;
var time = 0;
var i=0;
var intervalID;
var numOfKey;

var is_gaming = false;
//===========================    Game  ================================
function startGame(difficulty, songName){
	if(pattern != null) {
		return;
	}

	numOfKey = getNumOfKey(difficulty);
	pattern = eval(difficulty + "_" + songName);
	//console.log(pattern);
	intervalID = window.setInterval(gameManager, 250);
	makeKeyPad();
	playMusic();
	i=0;
	score = 0;
	time= 0;
	updateScore();
	game_span1.innerHTML = "떨어지는 노트에 맞춰";
	game_span2.innerHTML = "Key를 누르세요!";
}

function getNumOfKey(difficulty){
	switch(difficulty){
		case "low":
			return 4;
		case "middle":
			return 6;
		case "high":
			return 8;
		}
}

//end game
function endGame(){
	window.clearInterval(intervalID);
	setTimeout(function() {
			audio.pause();
	}, 1000);
	game_span1.innerHTML = "GAME OVER </br> 최종점수는 : " +score+ " 입니다!";
	game_span2.innerHTML = "F5를 눌러 다시 게임을 시작하세요!";
	pattern = null;
}

//주기적으로 불리는 함수
function gameManager(){
	if(i >= pattern.length)
		endGame();

	if(pattern == null || pattern[i] == null) {
		return;
	}

	if(pattern[i][0] == time){
		makeNote(pattern[i]);
		moveNote(firstNote);
		sleep(1950);
		i++;
	}
	time = time+0.25;
}

//delay for deleteNote
function sleep (delay) {
	setTimeout(function() {
			deleteNote(null);
	}, delay);
}

//update score
function updateScore(){
	console.log("update score");
	var score_div = document.getElementById("score_div");
	score_div.innerHTML = score;
}

//play music
function playMusic(){
	audio.src = "../BULK/songs/" + songName + ".mp3";
	audio.muted = false;
	audio.play();
}

//print score
function printScore(score){
	var game_score_div = document.getElementById("game_score_div");
	game_score_div.innerHTML = score;

	setTimeout(function() {
		var game_score_div = document.getElementById("game_score_div");
		game_score_div.innerHTML = "";
	}, 700);
}

//===========================    Note ================================
//parameter : nope
//return : nope
function makeNote(noteLine){
	var note_div = document.getElementById("note_div");
	var customizedWidth = computeCustomizedWidth(numOfKey);
	for(var i=1; i<=numOfKey; i++)
	{
		var note= document.createElement('div');
		note.style.width = customizedWidth + "px";
		note.style.margin = NOTE_MARGIN + "px";
		note_div.appendChild(note);
		firstNote.push(note);
		if(noteLine[i])
			note.classList.add("note");
		else
			note.classList.add("note_none");
	}
}

//noteLine : note 1 line
//return : nope
function moveNote(noteLine){
	  //console.log("move note");
		for(var i=0; i<noteLine.length; i++){
			noteLine[i].animate(
				[
					// keyframes
					{ transform: 'translateY(0px)' },
					{ transform: 'translateY(380px)' }
				], {
					// timing options
					duration: 2000,
					iterations: 1
				});
		}
}

//index : index of certain note in firstNote
function deleteNote(index){
	//delete the first headed notes
	if(!index){//index == null
		for(var i=0; i<numOfKey; i++) {
			var headNode = firstNote.shift();
			if(headNode != null) {
				headNode.remove();
			}
		}
	}
	else {//make certain notes invisible
			firstNote[index].style.backgroundColor = "transparent";
	}
}

//parameter : nope
//return : note 1
function computeCustomizedWidth(){
	var note_div = document.querySelector('#note_div');
	var largeWidth = note_div.offsetWidth;
	var margin = NOTE_MARGIN;
	//border = 2px
	var border = window.getComputedStyle(note_div).borderWidth[0];
	return (largeWidth - (2*border))/numOfKey -(2*margin) -1;
}

//noteItem : element of one note
//return : score (score by poisition)
function getScoreByPosition(noteItem){
	if(pattern == null) {
		return '';
	}

	var offset = $(noteItem).offset();
	if(offset == null) {
		return 'bad';
	}
	var topPosition = offset.top;
	if (noteItem.className != "note")
		return 'bad';
	var score = "";
	if (topPosition<350 || topPosition>500) // 359> topPos  or 411 <topPos
		score = 'bad';
	else if(topPosition<450 && topPosition>400) // 380 < topPos < 390
		score = 'perfect';
	else//normal
		score = 'normal'
	return score;
}

//===========================   Key 愿��� =================================
var key4 = ['D','F','J','K'];
var key6 = ['S','D','F','J','K','L'];
var key8 = ['A','S','D','F','J','K','L',';'];

//parameter : nope
//return : nope
var padCreated = false;
function makeKeyPad(){
	if(padCreated == true) {
		return;
	}

	padCreated = true;
	var key_div = document.getElementById("key_div");
	var customizedWidth = computeCustomizedWidth(numOfKey);
	for(var i=0; i<numOfKey; i++)
	{
		var key= document.createElement('div');
		key.classList.add("key");
		key.style.width =customizedWidth +"px";
		key.style.margin = NOTE_MARGIN + "px";
		key_div.appendChild(key);

		var keyArr = eval("key" + numOfKey);
		key.innerHTML = keyArr[i];
		key.id = keyArr[i];
	}
}

//keyCode : code number of key pressed
//letter : the literal letter of key
function getPressedKey(keyCode){
	var letter;
	switch(keyCode){
		case 65:
			letter = 'A';
			break;
		case 83:
			letter = 'S';
			break;
		case 68:
			letter = 'D';
			break;
		case 70:
			letter = 'F';
			break;
		case 74:
			letter = 'J';
			break;
		case 75:
			letter = 'K';
			break;
		case 76:
			letter = 'L';
			break;
		case 186:
			letter = ';';
			break;
		default :
			letter = false;
	}
	return letter;
	//A=75; S=93; D=78; F=80; J=84; K=85; L=86; ;=69;
}

//change key color into red
function changeKeyColor(keyCode){
	var pressedKey = getPressedKey(keyCode);
	var key_div = document.getElementById(pressedKey);
	if(key_div == null) {
		return;
	}
	key_div.style.backgroundColor = "red";
}

//change key color back into pink
function changeKeyColorBack(keyCode){
	var pressedKey = getPressedKey(keyCode);
	var key_div = document.getElementById(pressedKey);
	if(key_div == null) {
		return;
	}
	key_div.style.backgroundColor = "black";
}

//Check note position and pressed key
function checkKeyWithNote(keyCode){
	if(pattern == null) {
		return;
	}

	var pressedKey = getPressedKey(keyCode);
	var keyArr = eval("key" + numOfKey);
	var index = keyArr.indexOf(pressedKey);
	var _score  = getScoreByPosition(firstNote[index]);
	if(_score == 'bad'){
		printScore('Miss');
		return;
	}
	else if(_score == 'normal'){//normal
		printScore("Good!");
		score+=50;
	}
	else if(_score == 'perfect'){//perfect
		printScore("Perfect!!");
		score+=100;
	}
	deleteNote(index); //normal or pefect deletes note
	updateScore();
}

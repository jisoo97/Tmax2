const NOTE_MARGIN = 2;

var pattern;
var firstNote = [];
var score = 0;
var time = 0;
var i=0;
var intervalID;
var numOfKey;
//===========================    Game 관련 ================================
function startGame(difficulty, songName){
		numOfKey = getNumOfKey(difficulty);
		pattern = eval(difficulty + "_" + songName);
		console.log(pattern);
		intervalID = window.setInterval(gameManager, 250);
		makeKeyPad();
		playMusic();
		game_end_div.innerHTML = "떨어지는 노트에 맞춰 키보드를 누르세요!";
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
	game_end_div.innerHTML = "GAME OVER </br> 최종점수는 : " +score+ " 점 입니다!";
}

//주기적으로 불리는 함수
function gameManager(){
	if(i >= pattern.length)
		endGame();

	if(pattern[i][0] == time){
		makeNote(pattern[i]);
		moveNote(firstNote);
		sleep(1050);
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

//===========================    Note 관련 ================================
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

//noteLine : note 한 줄의 배열
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
					duration: 1100,
					iterations: 1
				});
		}
}

//index : index of certain note in firstNote
function deleteNote(index){
	//delete the first headed notes
	if(!index){//index == null
		for(var i=0; i<numOfKey; i++)
			firstNote.shift().remove();
	}
	else {//make certain notes invisible
			firstNote[index].style.backgroundColor = "transparent";
	}
}

//parameter : nope
//return : note 1개의 넓이
function computeCustomizedWidth(){
	var note_div = document.querySelector('#note_div');
	var largeWidth = note_div.offsetWidth;
	var margin = NOTE_MARGIN;
	//border가 2px 라서 숫자만 가져옴
	var border = window.getComputedStyle(note_div).borderWidth[0];
	return (largeWidth - (2*border))/numOfKey -(2*margin) -1;
}

//noteItem : element of one note
//return : score (score by poisition)
function getScoreByPosition(noteItem){
	var topPosition = $(noteItem).offset().top;
	if (noteItem.className != "note")
		return 'bad';
	var score = "";
	if (topPosition<359 || topPosition>411) // 359> topPos  or 411 <topPos
		score = 'bad';
	else if(topPosition<390 && topPosition>380) // 380 < topPos < 390
		score = 'perfect';
	else//normal
		score = 'normal'
	return score;
}

//===========================   Key 관련 =================================
var key4 = ['D','F','J','K'];
var key6 = ['S','D','F','J','K','L'];
var key8 = ['A','S','D','F','J','K','L',';'];

//parameter : nope
//return : nope
function makeKeyPad(){
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

//keyCode : 문자의 코드(숫자)
//letter : 눌린 문자
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
	key_div.style.backgroundColor = "red";
}

//change key color back into pink
function changeKeyColorBack(keyCode){
	var pressedKey = getPressedKey(keyCode);
	var key_div = document.getElementById(pressedKey);
	key_div.style.backgroundColor = "black";
}

//Check note position and pressed key
function checkKeyWithNote(keyCode){
	var pressedKey = getPressedKey(keyCode);
	var keyArr = eval("key" + numOfKey);
	var index = keyArr.indexOf(pressedKey);
	var _score  = getScoreByPosition(firstNote[index]);
	if(_score == 'bad')
		return;
	else if(_score == 'normal')//normal
		score+=50;
	else if(_score == 'perfect')//perfect
		score+=100;
	deleteNote(index); //normal or pefect deletes note
	updateScore();
}

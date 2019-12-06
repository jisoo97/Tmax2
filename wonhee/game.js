const NOTE_MARGIN = 2;
const NUM_OF_KEY = 4;

var pattern = [[2.5,1,1,1,0],
[5,1,1,0,0],
[7.25,0,0,0,1],
[9.75,1,0,0,1],
[12.5,0,0,1,1],
[14.75,1,1,0,0],
[17.25,1,0,0,1],
[19.75,1,0,0,1],
[22.25,0,0,1,1],
[25,1,1,0,0],
[27,0,0,1,1],
[29.5,1,1,1,0],
[32.25,1,0,0,0],
[34.25,1,0,0,0],
[37,0,1,0,1],
[39,0,0,1,1],
[41.75,1,1,0,1],
[44.25,1,1,0,0],
[46.5,0,1,1,1],
[48.5,1,1,1,0],
[51,0,0,1,0],
[53.75,0,0,1,0],
[56,1,0,0,0],
[58,0,0,0,1],
[60,1,0,0,0],
[62,0,1,1,1],
[64.75,0,1,0,1],
[67,0,0,0,1],
[69.75,1,1,0,1],
[71.75,0,0,0,1],
[74,1,0,0,0],
[76,0,0,1,0],
[78.25,1,1,0,1],
[80.75,1,0,0,0],
[83.25,1,0,0,0]];
var firstNote = [];
var score = 0;
var time = 0;
var i=0;

//===========================    Game 관련 ================================
function startGame(numOfKey){
		var intervalID = window.setInterval(gameManager, 250);
		makeKeyPad(numOfKey);
		playMusic();
}

//주기적으로 불리는 함수
function gameManager(){
	if(pattern[i][0] == time){
		makeNote(NUM_OF_KEY,pattern[i]);
		moveNote(firstNote);
		sleep(1100);
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
	audio.muted = false;
	audio.play();
}

//===========================    Note 관련 ================================
//numOfKey는 난이도에 따른 키의 갯수
//return없음
function makeNote(numOfKey,noteLine){
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
					{ transform: 'translateY(340px)' }
				], {
					// timing options
					duration: 1000,
					iterations: 1
				});
		}
}

//index : index of certain note in firstNote
function deleteNote(index){
	//delete the first headed notes
	if(!index){//index == null
		for(var i=0; i<NUM_OF_KEY; i++)
			firstNote.shift().remove();
	}
	else {//make certain notes invisible
			firstNote[index].style.backgroundColor = "transparent";
	}
}

//numOfKey : Key의 갯수
//return : note 1개의 넓이
function computeCustomizedWidth(numOfKey){
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

//numOfkey : key의 갯수
//return : nope
function makeKeyPad(numOfKey){
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
	key_div.style.backgroundColor = "pink";
}

//Check note position and pressed key
function checkKeyWithNote(numOfKey,keyCode){
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

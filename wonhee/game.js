const NOTE_MARGIN = 2;

//numOfKey는 난이도에 따른 키의 갯수
//return없음
function drawNote(numOfKey){
	var note_div = document.getElementById("note_div");
	var customizedWidth = computeCustomizedWidth(numOfKey);
	for(var i=1; i<=numOfKey; i++)
	{
		var note= document.createElement('div');
		note.classList.add("note");
		note.style.width = customizedWidth + "px";
		note.style.margin = NOTE_MARGIN + "px";
		note_div.appendChild(note);
	}
}

//numOfKey - Key의 갯수
//return - note 1개의 넓이
function computeCustomizedWidth(numOfKey){
	var note_div = document.querySelector('#note_div');
	var largeWidth = note_div.offsetWidth;
	var margin = NOTE_MARGIN;
	//border가 2px 라서 숫자만 가져옴
	var border = window.getComputedStyle(note_div).borderWidth[0];
	return (largeWidth - (2*border))/numOfKey -(2*margin);
}

//주기적으로 불리는 함수
var intervalID = window.setInterval(gameManager, 4000);

function gameManager(){
	moveNote();
	/*
	moveNote() - note위치 수정
	deleteNote() - 화면에서 벗어난 note 삭제
	drawNote() - note 그리기
 	updateScore() - 점수 올리기
	updateLife() - 목숨 확인 -> 게임 종료할지 말지 결정

	부가적으로 다른 여러 함수가 필요함
	*/
}


function moveNote(){
	/*var notes = document.querySelectorAll('.note');
	for (var i=0; i<notes.length; i++){
		var currentPosition = parseInt(notes[i].style.top);
		console.log(currentPosition);
		console.log(notes[i].style.top);
		var amountToMove = 100;
		notes[i].style.top = currentPosition+amountToMove+"pt";
		console.log("mmmm")
	}*/
	//var note_div = document.querySelector('#note_div');
	//console.log(getPosition(note_div));
	var note_div = document.getElementById('note_div');
	var currentPosition = parseInt(note_div.style.top);
	console.log(currentPosition);
	console.log(note_div.style);
	var amountToMove = 30;
	note_div.style.top = currentPosition+amountToMove+"px";
}

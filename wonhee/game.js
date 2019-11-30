const NOTE_MARGIN = 2;

//numOfKey는 난이도에 따른 키의 갯수
//return없음
function makeNote(numOfKey){
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
	moveNote() - note위치 수정 ** 한번만 불려도 될듯
	deleteNote() - 화면에서 벗어난 note 삭제
	makeNote() - note 그리기
 	updateScore() - 점수 올리기
	updateLife() - 목숨 확인 -> 게임 종료할지 말지 결정

	부가적으로 다른 여러 함수가 필요함
	*/
}

//parameter - nope
//return - nope
//site_url - https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
function moveNote(){
	  //** line 단위와 전체 단위 구분 필요
		var notes = document.querySelectorAll('.note');
		for(var i=0; i<notes.length; i++){
			notes[i].animate(
				[
					// keyframes
					{ transform: 'translateY(0px)' },
					{ transform: 'translateY(300px)' }
				], {
					// timing options
					duration: 1000,
					iterations: 1
				});
		}
}

//https://flatuicolors.com/palette/defo - pallete

var key4 = ['D','F','J','K'];
var key6 = ['S','D','F','J','K','L'];
var key8 = ['A','S','D','F','J','K','L',';'];


function makeKeyPad(numOfKey){
	var key_div = document.getElementById("key_div");
	var customizedWidth = computeCustomizedWidth(numOfKey);
	for(var i=0; i<numOfKey; i++)
	{
		var key= document.createElement('div');
		key.classList.add("key");
		key.style.width = customizedWidth + "px";
		key.style.margin = NOTE_MARGIN + "px";
		key_div.appendChild(key);
		if(numOfKey == 4)
			key.innerHTML = key4[i];
		else if(numOfKey == 6)
			key.innerHTML = key6[i];
		else if(numOfKey == 8)
			key.innerHTML = key8[i];

	}
}

function printKey(keyCode){
	console.log(keyCode);
}



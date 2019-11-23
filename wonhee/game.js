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


//매 초마다 불리는 함수
function gameManager(){
	/*
	moveNote() - note위치 수정
	deleteNote() - 화면에서 벗어난 note 삭제
	drawNote() - note 그리기
 	updateScore() - 점수 올리기
	updateLife() - 목숨 확인 -> 게임 종료할지 말지

	부가적으로 다른 여러 함수가 필요함
	*/
}

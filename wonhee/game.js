//numOfKey는 난이도에 따른 키의 갯수
//return없음
function drawNote(numOfKey){
	var i;
	var note_div = document.getElementById("note_div");
	for(i=1; i<=numOfKey; i++)
	{
		var note= document.createElement('div');
		note.classList.add("note");
		note_div.appendChild(note);
		
	}
}

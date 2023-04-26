let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? []; //이 부분은 로컬 스토리지에서 "allMemo"라는 키로 저장된 데이터를 가져와서 JSON으로 파싱하여 변수 allMemo에 저장합니다. 만약 해당 키로 저장된 데이터가 없으면 빈 배열을 할당합니다.

const Editor = toastui.Editor;

const editor = new Editor({
  el: document.querySelector("#editor"),
  height: "600px",
  initialEditType: "markdown",
  previewStyle: "vertical",
});
// toastui.Editor 모듈을 사용하여 메모 내용을 작성할 수 있는 WYSIWYG 에디터를 생성합니다. 이 때, 에디터가 생성될 DOM 요소를 el 속성에 지정하고, 에디터의 높이, 초기 에디터 타입, 미리 보기 스타일 등을 설정합니다.

// editor.getHTML()
// editor.getMarkdown()

render();

function saveNote() {
  const title = document.getElementById("title").value; // title 변수를 정의하고, 이 변수에 document 객체의 getElementById() 메소드를 사용하여 HTML 문서 내에서 id가 "title"인 요소를 찾습니다.
  // const content = document.getElementById("content").value;
  const content = editor.getHTML(); // content 변수를 정의하고, editor 객체의 getHTML() 메소드를 호출하여 에디터의 HTML 콘텐츠를 가져와 content 변수에 저장합니다.
  allMemo.push({ title, content, len: allMemo.length }); // 배열에 새로운 객체를 추가합니다. 이 객체는 title, content, 그리고 len 프로퍼티를 가지며, title 변수와 content 변수에서 가져온 값을 할당합니다.

  localStorage.setItem("allMemo", JSON.stringify(allMemo)); // localStorage 객체의 setItem() 메소드를 사용하여 allMemo 배열을 JSON 문자열로 변환하여 allMemo이라는 키와 함께 저장합니다.
  render(); // render() 함수를 호출하여 메모 목록을 다시 렌더링합니다.
}

function render() {
  //render 함수가 하는일을 알아보자
  const display = document.getElementById("display"); //HTML 문서에서 'id' 가 "display"인 요소를 찾아 "display" 변수에 할당 이 요소는 메모가 표시될 영역을 나타냄
  display.innerHTML = ""; // 'display' 요소의 내용을 모두 지웁니다. 이것은 이전에 표시 된 메모가 있을 경우에 해당됩니다.

  for (const item of allMemo) {
    //'allMemo' 배열의 모든 요소에 대해 반복합니다. 각 요소는 메모 데이터를 나타냅니다.
    const saveTitle = document.createElement("h2"); //새로운 'h2' 요소를 생성하고 'saveTitle' 변수에 할당합니다. 이것은 메모의 제목을 표시할 요소입니다.
    const saveContent = document.createElement("div"); //새로운 'div' 요소를 생성하고 'saveContent' 변수에 할당합니다. 이것은 메모의 내용을 표시할 요소입니다.
    const saveId = document.createElement("p"); //새로운 'p'요소를 생성하고 'saveId' 변수에 할당합니다. 이것은 메모의 고유한 ID를 표시할 요소입니다.
    const deleteMemoBtn = document.createElement("button"); //새로운 'button' 요소를 생성하고 'deleteMemoBtn' 변수에 할당합니다. 이것은 메모를 삭제하기 위한 버튼입니다.
    const updateMemoBtn = document.createElement("button"); //새로운 'button' 요소를 생성하고 'updateMemobtn' 변수에 할당합니다. 이것은 메모를 수정하기 위한 버튼입니다.
    deleteMemoBtn.classList.add("memo-btn", "delete-btn"); // Add classes to the delete button
    updateMemoBtn.classList.add("memo-btn", "update-btn"); // Add classes to the update button

    saveTitle.textContent = item.title; //'saveTitle' 요소에 메모 제목을 설정합니다.
    saveContent.innerHTML = item.content; //'saveContent' 요소에 메모 내용을 설정합니다.
    saveId.textContent = item.len + 1; //'saveId' 요소에 메모의 고유한 ID를 설정합니다. 여기서 'item.len'은 'allMemo' 배열의 길이를 나타내고, '+1'은 새로운 메모가 추가될 경우 이전 메모와 구분하기 위해 사용됩니다.
    deleteMemoBtn.textContent = "삭제"; //deleteMemoBtn 요소에 "삭제"라는 텍스트를 설정합니다.
    deleteMemoBtn.setAttribute("id", item.len); //deleteMemoBtn 요소에 id 속성을 설정합니다. 이것은 나중에 해당 메모를 삭제할 때 사용됩니다.
    deleteMemoBtn.setAttribute("onclick", "remove()"); //deleteMemoBtn 요소에 onclick 이벤트를 설정합니다. 이것은 버튼이 클릭되었을 때 remove() 함수가 실행됨을 나타냅니다.

    updateMemoBtn.textContent = "수정";
    updateMemoBtn.setAttribute("onclick", "update()");
    updateMemoBtn.setAttribute("onclick", `update(${item.len})`);

    saveContent.addEventListener("click", () => {
      document.getElementById("title").value = item.title;
      editor.setMarkdown(item.content);
    });

    display.appendChild(saveId); // 메소드를 사용하여 생성된 요소를 display 요소의 자식으로 추가합니다.
    display.appendChild(saveTitle);
    display.appendChild(saveContent);
    display.appendChild(deleteMemoBtn);
    display.appendChild(updateMemoBtn);
  }
}

function remove() {
  //함수 이름을 remove로 정의
  // console.log(event.srcElement.id);
  // console.log(allMemo);
  const idx = allMemo.find((item) => item.len == event.srcElement.id); //allMemo 이라는 배열에서 event.srcElement.id 와 일치하는 len 속성을 가진 객체를 찾습니다. idx 변수에 해당 객체를 할당합니다.
  if (idx) {
    allMemo.splice(
      allMemo.findIndex((item) => item.len == idx.len),
      1
    );
  } //if 문에서 idx가 truthy 값이면 allMemo 배열에서 idx.len 과 일치하는 len 속성을 가진 객체를 찾아 해당 객체를 배열에서 제거합니다.
  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
  resetEditor();
}

function update(index) {
  const memoIndex = allMemo.findIndex((item) => item.len == index); //해당 코드는 allMemo 배열에서 item.len 값이 index와 일치하는 첫 번째 메모의 인덱스를 검색합니다. findIndex 메소드는 배열에서 조건을 만족하는 첫 번째 요소의 인덱스를 반환하며, 해당하는 요소가 없으면 -1을 반환합니다. 여기서 item은 allMemo 배열의 요소를 의미하고, len은 item 객체의 프로퍼티입니다. 따라서 allMemo 배열에서 len 프로퍼티가 index와 일치하는 요소를 검색하여 해당 요소의 인덱스를 memoIndex 변수에 할당합니다.

  if (memoIndex >= 0 && memoIndex < allMemo.length) {
    const memo = allMemo[memoIndex];
    document.getElementById("title").value = memo.title;

    const contentWithoutPTags = memo.content
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "\n");

    editor.setMarkdown(contentWithoutPTags);

    document.getElementById("saveNoteBtn").textContent = "Update Note";
    document.getElementById("saveNoteBtn").onclick = function () {
      saveUpdatedNote(memoIndex);
    };
  } else {
    console.log("Invalid index");
  }
}
// 해당 코드는 memoIndex 변수에 할당된 인덱스가 유효한지 검사한 후, 유효한 경우 해당하는 메모의 제목과 내용을 편집창에 표시하고, "Update Note" 버튼을 활성화합니다.

// 만약 memoIndex 변수가 0 이상이고 allMemo.length보다 작은 값인 경우(allMemo 배열에 해당 인덱스의 요소가 존재하는 경우)에는 해당하는 메모의 정보를 memo 변수에 할당하고, memo 객체의 제목을 title input 요소의 value 값으로 설정하고, editor 객체의 setMarkdown 메소드를 사용하여 memo 객체의 내용을 편집창에 설정합니다.

// 그리고 "Update Note" 버튼의 텍스트를 "Update Note"로 변경하고, 클릭 이벤트를 saveUpdatedNote 함수를 호출하는 새로운 함수로 설정합니다.

// 만약 memoIndex 변수가 유효한 인덱스가 아닌 경우, "Invalid index"라는 메시지를 콘솔에 출력합니다.

function saveUpdatedNote(memoIndex) {
  const updatedTitle = document.getElementById("title").value;
  const updatedContent = editor.getMarkdown(); //

  allMemo[memoIndex].title = updatedTitle;
  allMemo[memoIndex].content = updatedContent;

  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();

  document.getElementById("saveNoteBtn").textContent = "Save Note";
  document.getElementById("saveNoteBtn").setAttribute("onclick", "saveNote()");

  document.getElementById("title").value = "";
  editor.setMarkdown("");

  document.getElementById("saveNoteBtn").textContent = "Save Note";
  document.getElementById("saveNoteBtn").setAttribute("onclick", "saveNote()");
}

function resetEditor() {
  document.getElementById("title").value = "";
  editor.setMarkdown("");
  document.getElementById("saveNoteBtn").textContent = "Save Note";
  document.getElementById("saveNoteBtn").onclick = saveNote;
}

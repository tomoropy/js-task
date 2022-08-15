const inputTodo = document.getElementById("inputTodo");
const todoLists = document.getElementById("todoLists");
const lists = document.querySelectorAll("todoLists");
const addBtn = document.getElementById("addBtn");

let totalCount = 0;
let doneCount = 0;
let pendingCount = 0;
let todos = []; // todoを保存する配列

// 追加ボタンをクリック
addBtn.addEventListener("click", ()=>{
  if (!inputTodo.value || inputTodo.value.length >= 20){
    window.alert("タスクは1~20字以で入力してください");
    return;
  }
  
  todos.push({
    value: inputTodo.value
  });

  createListView();

  totalCount++;
  pendingCount++;
  inputTodo.value = "";

  createStatusList();
  const items = document.querySelectorAll("[id='item']");

  // checkboxをクリックしたとき
  items.forEach((item) => {
    const check = item.firstChild;
    const text = item.children[1];
    const editBtn = item.children[2];
    const deleteBtn = item.lastChild;

    // チェックボタンをクリックしたとき
    check.addEventListener("click", ()=>{
      if(check.checked){
        check.classList.add("completed");
        text.classList.add("completed");
        doneCount++;
        pendingCount--;
      }else{
        check.classList.remove("completed"); 
        text.classList.remove("completed"); 
        doneCount--;
        pendingCount++;
      }
      createStatusList();
    }); 

    // 削除ボタンをクリックしたとき
    deleteBtn.addEventListener("click", ()=>{
      if(window.confirm("本当に削除しますか？")){
        todos = todos.filter((todo) => {
          return (todo.value != text.textContent);
        });
  
        totalCount--;
        (!check.checked)? pendingCount-- : doneCount--;
  
        createStatusList();
        todoLists.removeChild(deleteBtn.parentNode);
      }
    });


    // 編集ボタンをクリックしたとき
    editBtn.addEventListener("click", ()=>{
      // クリックした親itemを取得
      let currentItem = editBtn.parentNode;

      const currentText = editBtn.previousElementSibling;
      const editForm = document.createElement("input");
      const addBtn = document.createElement("button");

      // 編集ボタンを押した時点でtodosから要素を削除
      const index = todos.indexOf({value: currentText.textContent});
      todos.splice(index, 1);

      addBtn.textContent = "保存";
      addBtn.classList.add("btn");
      editForm.classList.add("text");
      
      currentItem.replaceChild(editForm, currentText);
      currentItem.removeChild(editBtn);
      currentItem.removeChild(deleteBtn);
      currentItem.appendChild(addBtn);

      //保存ボタンをクリックしたとき
      addBtn.addEventListener("click", ()=>{

        // editForm の値をtodosに保存
        const newValue = {value: editForm.value}
        todos.push(newValue);

        text.textContent = editForm.value;
        currentItem.removeChild(addBtn);
        currentItem.replaceChild(text, editForm);
        currentItem.appendChild(editBtn);
        currentItem.appendChild(deleteBtn);
      });
    });

  });
});

// リストを作成
const createListView = () => {
  while (todoLists.firstChild) {
    todoLists.removeChild(todoLists.firstChild);
  }

  todos.forEach((todo) => {
    let item = document.createElement("div");
    const checkBox = document.createElement("input");
    const list = document.createElement("li");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    item.classList.add("item");
    item.setAttribute('id', 'item')

    checkBox.classList.add("checkbox");
    checkBox.setAttribute('type','checkbox');
    checkBox.setAttribute('id', 'checkBox')

    list.textContent = todo.value;
    list.classList.add("text");

    editBtn.textContent = "編集";
    editBtn.classList.add("btn");

    deleteBtn.textContent = "削除";
    deleteBtn.setAttribute('id', 'deleteBtn')
    deleteBtn.classList.add("btn");

    item.appendChild(checkBox);
    item.appendChild(list);
    item.appendChild(editBtn);
    item.appendChild(deleteBtn);
    todoLists.appendChild(item);
  });
}

// タスクの進捗状況を作成,更新
const createStatusList = () => {
  const statusLists = document.getElementById("statusLists");

  while (statusLists.firstChild) {
    statusLists.removeChild(statusLists.firstChild);
  } 

  const total = document.createElement("li");
  const done = document.createElement("li");
  const pending = document.createElement("li");

  total.textContent = `全てのタスク: ${totalCount}`;
  total.classList.add("status-item");

  done.textContent = `完了済み: ${doneCount}`;
  done.classList.add("status-item");

  pending.textContent = `未完了: ${pendingCount}`;
  pending.classList.add("status-item");

  statusLists.appendChild(total);
  statusLists.appendChild(pending);
  statusLists.appendChild(done);
}
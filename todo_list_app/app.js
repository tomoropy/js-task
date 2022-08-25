const inputTodo = document.getElementById("inputTodo");
const todoLists = document.getElementById("todoLists");
const lists = document.querySelectorAll("todoLists");
const addBtn = document.getElementById("addBtn");

let id = 0;     //id
let todos = []; // todoを保存する配列

// 追加ボタンをクリック
addBtn.addEventListener("click", () => {
  createTask();
});

// enterを押下
inputTodo.addEventListener("keypress",(e) => {
  if(e.key === 'Enter') createTask();
});


// タスクの登録、処理
const createTask = () => {
  if (isValidTask(inputTodo.value)) return; 
  todos.push(
    { id, value: inputTodo.value, isCompleted: false }
  );
  addTask(id,inputTodo.value);
  id++;
  inputTodo.value = "";

  // ステータスを更新
  todoKinds[0].count++;
  todoKinds[2].count++;
  createStatusList();
  disableFirstUpperBtn();
}

// チェックボタンをクリック
const toggleComplate = (id) => {
  const currentItem = todos.find((todo) => {
    return todo.id === id;
  });

  // 配列のBooleanも更新
  currentItem.isCompleted = !currentItem.isCompleted;

  if(currentItem.isCompleted){
    todoKinds[1].count++;
    todoKinds[2].count--;
  }else{
    todoKinds[1].count--;
    todoKinds[2].count++; 
  } 
  createStatusList();
};


// 削除ボタンをクリック
const deleteTask = (id) => {
  if(window.confirm("本当に削除しますか？")){
    const currentItem = todos.find((todo) => {
      return todo.id === id;
    })
    
    todoKinds[0].count--;
    (currentItem.isCompleted)? todoKinds[1].count-- : todoKinds[2].count--;
    createStatusList();

    const itemNode = document.getElementById(`item-${id}`);
    itemNode.remove();

    todos = todos.filter(todo => {return todo.id !== id});
    disableFirstUpperBtn();
    };

};

// 編集ボタンをクリック
const editTask = (id) => {
  const currentItem = todos.find((todo) => {
    return todo.id === id;
  }) 
  const itemNode = document.getElementById(`item-${id}`);
  const editForm = document.createElement("input");
  const addBtn = document.createElement("button");

  const text = itemNode.children[1];
  const upperBtn = itemNode.children[2];
  const editBtn = itemNode.children[3];
  const deleteBtn = itemNode.children[4];

  addBtn.textContent = "保存";
  addBtn.classList.add("btn");
  editForm.classList.add("text");
  
  itemNode.replaceChild(editForm, text);
  upperBtn.style.display = "none";
  editBtn.style.display = "none";
  deleteBtn.style.display = "none";
  itemNode.appendChild(addBtn);



  // 保存ボタンをクリック
  addBtn.addEventListener("click", () => {
    if (isValidTask(editForm.value)) return; 

    // editForm の値をtodosに保存
    currentItem.value = editForm.value;

    const newText = document.createElement("li");
    newText.textContent = currentItem.value;
    newText.classList.add("text");

    itemNode.replaceChild(newText, editForm);
    upperBtn.style.display = "block";
    editBtn.style.display = "block";
    deleteBtn.style.display = "block";
    itemNode.removeChild(addBtn);

    disableFirstUpperBtn();
  });
};

// タスクを追加
const addTask = (id, value) => {
    const item = document.createElement("div");
    const checkBox = document.createElement("input");
    const list = document.createElement("li");
    const upperBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    item.classList.add("item");
    item.setAttribute('id', `item-${id}`);

    checkBox.classList.add("checkbox");
    checkBox.setAttribute('type','checkbox');
    checkBox.setAttribute('id', 'checkBox');
    checkBox.setAttribute('onclick', `toggleComplate(${id})`);

    list.textContent = value;
    list.classList.add("text");

    upperBtn.textContent = "上へ";
    upperBtn.setAttribute('id', 'upperBtn');
    upperBtn.setAttribute('onclick', `upperTask(${id})`);
    upperBtn.classList.add('btn');

    editBtn.textContent = "編集";
    editBtn.classList.add("btn");
    editBtn.setAttribute('onclick', `editTask(${id})`);

    deleteBtn.textContent = "削除";
    deleteBtn.setAttribute('id', 'deleteBtn');
    deleteBtn.classList.add("btn");
    deleteBtn.setAttribute('onclick', `deleteTask(${id})`);


    item.appendChild(checkBox);
    item.appendChild(list);
    item.appendChild(upperBtn);
    item.appendChild(editBtn);
    item.appendChild(deleteBtn);
    todoLists.appendChild(item);
}

// タスクの実行状態を管理
const todoKinds = [
  { status: 'total', label: "全てのタスク", count: 0 },
  { status: 'done', label: "完了済み", count: 0 },
  { status: 'pending', label: "未完了", count: 0 },
]
const createStatusList = () => {
  const statusLists = document.getElementById("statusLists");

  while (statusLists.firstChild) {
    statusLists.removeChild(statusLists.firstChild);
  }

  todoKinds.forEach((todoKind) => {
    const parent = document.createElement("li");
    parent.textContent = `${todoKind.label}: ${todoKind.count}`
    parent.classList.add("status-item");
    statusLists.appendChild(parent);
  })
}

// 上へボタン
const upperTask = (id) => {
  const itemNode = document.getElementById(`item-${id}`);
  const upperBtn = itemNode.childNodes[2];
  const upperNode = itemNode.previousElementSibling;
  todoLists.insertBefore(itemNode, upperNode);

  disableFirstUpperBtn();
};

// 最上位の上へボタンは非表示
const disableFirstUpperBtn = () => {
  const UpperBtns = document.querySelectorAll('[id="upperBtn"]');
  UpperBtns[0].style.display = "none";
  UpperBtns[1].style.display = "block";
};

// 登録タスクの判定
const isValidTask = (value) => {
  if (!value || value.length >= 20){
    window.alert("タスクは1~20字以で入力してください");
    return true;
  }
}

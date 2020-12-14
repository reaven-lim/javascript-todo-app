// check both todo and complete list is empty or not, if yes then show message
checkListEmpty();

document.addEventListener("click", function (event) {
  // check if add task button is click
  if (event.target.id == "btnAddTask") {
    addTodoList();
  }

  if (event.target.classList.contains("btn-remove-task")) {
    // remove task from both list
    event.target.closest('li').remove();
    checkListEmpty();
  }
});

function checkListEmpty() {
  // get both todo and complete list
  let todoList = document.getElementById('todo-list');
  let completedList = document.getElementById('completed-list');

  // add or remove subtitle text for both todo and complete list
  if (todoList.innerHTML == '') {
    todoList.innerHTML = todoList.innerHTML + '<p class="subtitle">Good! You did not have any pending tasks!</p>';
  } else {
    // get the empty message and if exist then remove it
    let emptyTodoMsg = document.querySelectorAll('#todo-list .subtitle');
    if (emptyTodoMsg.length >= 1) {
      emptyTodoMsg.forEach((e) => e.remove());
    }
  }
  if (completedList.innerHTML == '') {
    completedList.innerHTML = completedList.innerHTML + '<p class="subtitle">You did not have any completed task yet.</p>';
  } else {
    // same as what perform in todo list
    let emptyCompleteMsg = document.querySelectorAll('#complete-list .subtitle');
    if (emptyCompleteMsg.length >= 1) {
      emptyCompleteMsg.forEach((e) => e.remove());
    }
  }
}

function addTodoList() {
  // get the task from input
  let taskInput = document.getElementById("input-task");

  if (taskInput.value == "" || taskInput.value == undefined) {
    // show alert if the task is empty
    return alert("please input tasks");
  }

  let taskItem = document.createElement('li');
  let buttons = document.createElement('div');
  buttons.classList.add('todo-buttons');
  buttons.innerHTML = '<span class="oi btn-complete-task" data-glyph="circle-check"></span>' + '<span class="oi btn-remove-task" data-glyph="trash"></span>';

  taskItem.classList.add('list-group-item');
  taskItem.innerHTML = taskInput.value;
  taskItem.appendChild(buttons);

  // re-get again the latest todo list for insert new task
  let todoList = document.getElementById('todo-list');
  todoList.prepend(taskItem);

  // clear the task input
  taskInput.value = "";
  taskInput.focus();

  checkListEmpty();
}

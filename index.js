const todoList = document.getElementById('todo-list');
const completedList = document.getElementById('completed-list');
let todoData = localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : { pending: [], complete: [] };

// go thru existing todo list and display them to UI
Object.keys(todoData).forEach((item) => {
  todoData[item].forEach((todo) => {
    addTodoList(todo, item);
  });
});

// check both todo and complete list is empty or not, if yes then show message
checkListEmpty();

// all the click event triggered
document.addEventListener("click", function (event) {
  let isActive = false;

  // go thru each element that trigger the event and way back up to the parent
  for (let target = event.target; target != this; target = target.parentNode) {
    // add new todo
    if (target.id == "btnAddTask") {
      addTodoList();

      isActive = true;
    }

    // check by class
    let targetClassList = target.classList;
    // use for moving the todo, will be pass as parameter for moveTodo function
    let list = '';

    switch (true) {
      case targetClassList.contains('btn-remove-task'):
        let item = target.closest('li');
        let itemList = target.closest('.list-group').id == 'todo-list' ? todoData.pending : todoData.complete;
        removeTaskFromArray(itemList, item.innerText);

        // remove task from both list
        item.remove();
        isActive = true;
        break;
      case targetClassList.contains('btn-pending-task'):
        list = 'pending'
        break;
      case targetClassList.contains('btn-complete-task'):
        list = 'complete';
        break;
    }

    // if list not empty then mean todo need to be move
    if (list) {
      let todo = target.closest('li');
      moveTodo(todo, list);
      isActive = true;
    }

    //  if event is trigger then must break the loop
    // check is there change to both list, so that to show message
    if (isActive) {
      updateStorageTodoData();
      checkListEmpty();
      break;
    }
  }
});


// function to search array for match item and remove it from array
function removeTaskFromArray(listing, search) {
  let index = listing.indexOf(search);
  if (index > -1) {
    listing.splice(index, 1);
  }
}

// check both todo and complete is empty or not, if empty then show message
function checkListEmpty() {
  document.querySelectorAll('ul .subtitle').forEach(e => e.remove());

  if (!todoList.querySelector('li.list-group-item')) {
    todoList.innerHTML = todoList.innerHTML + '<p class="subtitle">Good! You did not have any pending tasks!</p>';
  }

  if (!completedList.querySelector('li.list-group-item')) {
    completedList.innerHTML = completedList.innerHTML + '<p class="subtitle">You did not have any completed task yet.</p>';
  }
}

// move todo to complete or pending list
function moveTodo(todo, list) {
  // get the task
  let task = todo.innerText;

  if (list === 'complete') {
    todo.querySelector('.btn-complete-task').setAttribute('data-glyph', 'minus')
    todo.querySelector('.btn-complete-task').classList.add('btn-pending-task')
    todo.querySelector('.btn-complete-task').classList.remove('btn-complete-task')

    removeTaskFromArray(todoData.pending, task);
    todoData.complete.push(task);

    completedList.prepend(todo);
  } else if (list === 'pending') {
    todo.querySelector('.btn-pending-task').setAttribute('data-glyph', 'circle-check')
    todo.querySelector('.btn-pending-task').classList.add('btn-complete-task');
    todo.querySelector('.btn-pending-task').classList.remove('btn-pending-task');

    removeTaskFromArray(todoData.complete, task);
    todoData.pending.push(task);

    todoList.prepend(todo);
  }
}

// add new todo list
// accept paramter for manual create todo
function addTodoList(task, list = 'pending') {
  // get the task from input
  const taskInput = document.getElementById("input-task");
  // if parameter task is not empty then priority on using it first
  let taskInputVal = (task) ? task : taskInput.value;

  if (taskInputVal == "" || taskInputVal == undefined) {
    // show alert if the task is empty
    return alert("please input tasks");
  }

  // we only set the new task from input to the todoData pending list
  if (!task) {
    todoData.pending.push(taskInput.value);
  }

  let taskItem = document.createElement('li');
  let buttons = document.createElement('div');
  // defualt list to insert todo item
  let taskList = todoList;

  buttons.classList.add('todo-buttons');
  taskItem.classList.add('list-group-item');
  taskItem.innerHTML = taskInputVal;

  // check which list todo item to create
  if (list == 'pending') {
    buttons.innerHTML = '<span class="oi btn-complete-task" data-glyph="circle-check"></span>' + '<span class="oi btn-remove-task" data-glyph="trash"></span>';
  } else {
    buttons.innerHTML = '<span class="oi btn-pending-task" data-glyph="minus"></span>' + '<span class="oi btn-remove-task" data-glyph="trash"></span>';

    // set the list to insert the todo item
    taskList = completedList;
  }
  taskItem.appendChild(buttons);

  taskList.prepend(taskItem);

  // clear the task input
  taskInput.value = "";
  taskInput.focus();
}

// update localstorage
function updateStorageTodoData() {
  localStorage.setItem('todoData', JSON.stringify(todoData));
}
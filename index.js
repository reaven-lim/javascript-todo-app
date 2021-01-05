const todoList = document.getElementById('todo-list');
const completedList = document.getElementById('completed-list');

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
        // remove task from both list
        event.target.closest('li').remove();
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
      checkListEmpty();
      break;
    }
  }
});

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
  if (list === 'complete') {
    todo.querySelector('.btn-complete-task').setAttribute('data-glyph', 'minus')
    todo.querySelector('.btn-complete-task').classList.add('btn-pending-task')
    todo.querySelector('.btn-complete-task').classList.remove('btn-complete-task')

    completedList.prepend(todo);
  } else if (list === 'pending') {
    todo.querySelector('.btn-pending-task').setAttribute('data-glyph', 'circle-check')
    todo.querySelector('.btn-pending-task').classList.add('btn-complete-task')
    todo.querySelector('.btn-pending-task').classList.remove('btn-pending-task')

    todoList.prepend(todo);
  }
}

// add new todo list
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
}

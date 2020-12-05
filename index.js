document.addEventListener("click", function (event) {
  if (event.target.id == "btnAddTask") {
    addTask();
  }

  if (event.target.classList.contains("btn-remove-task")) {
    event.target.parentNode.remove();
  }
});

function addTask() {
  let taskInput = document.getElementById("input-task");

  if (taskInput.value == "" || taskInput.value == undefined) {
    return alert("please input tasks");
  }

  let html =
    "<li>" +
    taskInput.value +
    ' <button class="btn btn-primary btn-complete-task">Complete Task</button> <button class="btn btn-danger btn-remove-task">Remove Task</button></li>';

  let todoList = document.getElementById("todo-list");
  todoList.innerHTML += html;

  // clear the task input
  taskInput.value = "";
  taskInput.focus();
}

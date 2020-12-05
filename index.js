const addTaskBtn = document.getElementById("btnAddTask");
let taskInput = document.getElementById("input-task");

addTaskBtn.addEventListener("click", function () {
  if (taskInput.value == "" || taskInput.value == undefined) {
   return  alert("please input tasks");
  }

  let html = "<li>" + taskInput.value + "</li>";

  let todoList = document.getElementById("todo-list");
  todoList.innerHTML += html;

  // clear the task input
  taskInput.value = '';
});

document.addEventListener("click", function (event) {
  if (event.target.id == "btnAddTask") {
    addTask();
  }

  if (event.target.classList.contains("btn-remove-task")) {
    event.target.closest('tr').remove();
  }
});

function addTask() {
  let taskInput = document.getElementById("input-task");

  if (taskInput.value == "" || taskInput.value == undefined) {
    return alert("please input tasks");
  }

  let html = "<tr>";
  html += '<td class="text-left">';
  html += taskInput.value;
  html += "</td>";
  html += '<td class="text-right">';
  html += '<button class="btn btn-primary btn-complete-task">Complete Task</button> ';
  html += '<button class="btn btn-danger btn-remove-task">Remove Task</button>';
  html += "</td>";
  html += "</tr>";

  let todoList = document.querySelector("#table-todo-list tbody");
  todoList.innerHTML += html;

  // clear the task input
  taskInput.value = "";
  taskInput.focus();
}

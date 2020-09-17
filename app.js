const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks());
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear all Tasks
  clearBtn.addEventListener('click', clearTasks);
  // Filter Tasks
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // Create li elements
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node
    li.appendChild(document.createTextNode(task));
    // Create new link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add item
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append he link to li
    li.appendChild(link);
    // Append li to the UI
    taskList.appendChild(li);
  });
}

// Add Tasks
function addTask(e) {
  e.preventDefault();

  if (taskInput.value === '') {
    alert('Add task');
  }

  // Create li elements
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  // Add item
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append he link to li
  li.appendChild(link);
  // Append li to the UI
  taskList.appendChild(li);
  // Store in LS
  storeTaskInLocalStorage(taskInput.value);
  //

  function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  // Clear input
  taskInput.value = '';
}

// Remove Task event

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  taskList.innerHTML - '';

  // clear tasks from LS

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

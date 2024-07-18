document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-btn');
  const todoInput = document.getElementById('todo-input');
  const assignInput = document.getElementById('assign-input');
  const todoList = document.getElementById('todo-list');
  const filterAllBtn = document.getElementById('filter-all');
  const filterActiveBtn = document.getElementById('filter-active');
  const filterCompletedBtn = document.getElementById('filter-completed');

  addBtn.addEventListener('click', addTodo);
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });
  assignInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });

  filterAllBtn.addEventListener('click', () => filterTasks('all'));
  filterActiveBtn.addEventListener('click', () => filterTasks('active'));
  filterCompletedBtn.addEventListener('click', () => filterTasks('completed'));

  function addTodo() {
    const todoText = todoInput.value.trim();
    const assignedTo = assignInput.value.trim();
    if (todoText === '') return;

    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';

    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';

    const todoSpan = document.createElement('span');
    todoSpan.textContent = todoText;
    taskDetails.appendChild(todoSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      todoList.removeChild(todoItem);
    });
    taskDetails.appendChild(deleteBtn);

    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.addEventListener('click', () => {
      todoItem.classList.toggle('done');
      const doneTimestamp = todoItem.querySelector('.done-timestamp');
      if (todoItem.classList.contains('done')) {
        const now = new Date();
        doneTimestamp.textContent = `Done on: ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
      } else {
        doneTimestamp.textContent = '';
      }
    });
    taskDetails.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      if (todoItem.classList.contains('edit-mode')) {
        todoSpan.textContent = todoInputEdit.value.trim();
        editBtn.textContent = 'Edit';
      } else {
        todoInputEdit.value = todoSpan.textContent;
        editBtn.textContent = 'Save';
      }
      todoItem.classList.toggle('edit-mode');
    });
    taskDetails.appendChild(editBtn);

    const todoInputEdit = document.createElement('input');
    todoInputEdit.type = 'text';
    todoInputEdit.style.display = 'none';
    todoItem.appendChild(todoInputEdit);

    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    const now = new Date();
    timestamp.textContent = `Added on: ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;

    const assignedToDiv = document.createElement('div');
    assignedToDiv.className = 'assigned-to';
    assignedToDiv.textContent = assignedTo ? `Assigned to: ${assignedTo}` : 'Assigned to: No one';

    const doneTimestamp = document.createElement('div');
    doneTimestamp.className = 'done-timestamp';

    todoItem.appendChild(taskDetails);
    todoItem.appendChild(timestamp);
    todoItem.appendChild(assignedToDiv);
    todoItem.appendChild(doneTimestamp);

    todoList.appendChild(todoItem);

    todoInput.value = '';
    assignInput.value = '';
  }

  function filterTasks(filter) {
    const tasks = todoList.querySelectorAll('.todo-item');
    tasks.forEach(task => {
      switch (filter) {
        case 'all':
          task.style.display = 'flex';
          break;
        case 'active':
          task.classList.contains('done') ? task.style.display = 'none' : task.style.display = 'flex';
          break;
        case 'completed':
          task.classList.contains('done') ? task.style.display = 'flex' : task.style.display = 'none';
          break;
      }
    });
  }
});

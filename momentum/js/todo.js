const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const addTodoBtn = document.querySelector('.todo-add-btn');
const showBtn = document.querySelector('.todo-show');
const todoWrap = document.querySelector('.todo');
const hideBtn = document.querySelector('.todo-hide');

let todos = !localStorage.getItem('todos') ? [] : JSON.parse(localStorage.getItem('todos')),
    todoElements = [];

class Todo {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }
}

function createTodo(todo, idx) {
    return `<li class="list-item ${todo.completed ? 'checked' : ''}" id="${idx}">
    <input type="checkbox" class="list-item-checkbox" ${todo.completed ? 'checked' : ''}>
    <div class="list-item-description">${todo.description}</div>
    <button class="list-item-delete">Del</button>
</li>`;
}

function setTodos() {
    todoList.innerHTML = '';
    if (todos.length > 0) {
        filterTodos();
        todos.forEach((item, idx) => {
            todoList.innerHTML += createTodo(item, idx);
        });
        todoElements = document.querySelectorAll('.list-item');
        todoElements.forEach((item) => {
            const checkbox = item.querySelector('.list-item-checkbox');
            checkbox.addEventListener('click', () => {
                completeTodo(item.id);
            });
            const delBtn = item.querySelector('button');
            delBtn.addEventListener('click', () => {
                deleteTodo(item.id);
            });
        });
    }
}
setTodos();

function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function filterTodos() {
    const activeTodos = todos.length && todos.filter((todo) => todo.completed === false);
    const completedTodos = todos.length && todos.filter((todo) => todo.completed === true);
    todos = [...activeTodos, ...completedTodos];
}

function completeTodo(idx) {
    todos[idx].completed = !todos[idx].completed;
    if (todos[idx].completed) {
        todoElements[idx].classList.add('checked');
    } else {
        todoElements[idx].classList.remove('checked');
    }
    renderTodos();
}

function deleteTodo(idx) {
    todoElements[idx].classList.add('delete');
    setTimeout(() => {
        todos.splice(idx, 1);
        renderTodos();
    }, 500);
}

function renderTodos() {
    updateLocalStorage();
    setTodos();
}

addTodoBtn.addEventListener('click', () => {
    if (todoInput.value === '') return;
    todos.push(new Todo(todoInput.value));
    renderTodos();
    todoInput.value = '';
});

todoInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        if (todoInput.value === '') return;
        todos.push(new Todo(todoInput.value));
        renderTodos();
        todoInput.value = '';
    }
})

showBtn.addEventListener('click', () => {
    todoWrap.classList.toggle('hide');
});

hideBtn.addEventListener('click', () => {
    todoWrap.classList.toggle('hide');
});

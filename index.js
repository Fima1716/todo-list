const input = document.querySelector('.to-do_input')
const createButton = document.querySelector('.create-button')
const toDoContainer = document.querySelector('.list-container')
let counter = 1


document.addEventListener('DOMContentLoaded', () => {
    const savedToDos = JSON.parse(localStorage.getItem('todos'));
    if (savedToDos) {
        toDoArray.push(...savedToDos);
        render(toDoArray);
    }
});


/* CLASS */
class ToDo {
    constructor(id, text, done) {
        this.id = id
        this.text = text
        this.done = false
    }
}
/* CLASS */

const toDoArray = []
const toDoS = []



createButton.addEventListener('click', () => {
    addTodo()
    clean();
    render(toDoArray);
})
toDoContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
        if (target.classList.contains('delete-todo-button')) {
            const getId = target.closest('.todo-flex').dataset.id;
            deleteToDo(toDoArray, getId);
        } else if (target.classList.contains('done-todo-button')) {
            const getId = target.closest('.todo-flex').dataset.id;
            boolToggle(toDoArray, getId);
        }
        clean();
        render(toDoArray);
    }
});

function boolToggle(array, id) {
    array.forEach((e) => {
        if (e.id === id) {
            e.done = !e.done;
            saveToLocalStorage();
            console.log(e);
        }
    });
}
function deleteToDo(array, id) {
    const index = array.findIndex(todo => todo.id === id);
    console.log(index)
    if (index !== -1) {
        const deletedTodo = array.splice(index, 1)[0]//фича
        saveToLocalStorage();
        alert(`Тудушка с текстом "${deletedTodo.text}" была удалена`)
    }
}

function getDoneToDo(array, id) {
    array.forEach((e) => {
        if (e.id === id && e.done === true) {
            const text = document.querySelector(`[data-id="${id}"] p`)
            text.style.textDecoration = 'line-through';

            const todoElement = document.querySelector(`[data-id="${id}"]`);
            todoElement.style.backgroundColor = 'light-green';
        }
    })
}


function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(toDoArray));
}






function createID() {
    let randomClue = Math.random()
    return randomClue.toString().slice(2, -1) + Date.now()
}

function addTodo() {
    if (input.value !== undefined && input.value !== '') {
        toDoArray.unshift(new ToDo(createID(), input.value));
        saveToLocalStorage();
    } else {
        console.log('INVALID INPUT.');
    }
}

function htmlConverter(element) {
    return `
        <div   data-id='${element.id}' class='todo-flex'>
        <p>${element.text}</p>
        <div class='buttons-flex'>
        <button class='delete-todo-button'> delete </button>
        <button class='done-todo-button'> done </button>
        </div>
        </div>
    `
}


function clean() {
    toDoContainer.innerHTML = ''
    input.value = ''
}

function render(array) {
    const markup = array.map(htmlConverter).join('');
    toDoContainer.insertAdjacentHTML('afterbegin', markup)

    array.forEach(todo => {
        if (todo.done) {
            const element = document.querySelector(`[data-id="${todo.id}"] p`);

            if (element) {
                element.style.textDecoration = 'line-through';
                element.style.backgroundColor = 'pink';
            }
        }
    });
    doneCount = 0
    array.forEach(todo => {
        if (todo.done) {
            doneCount++
        }
    })

    if (array.length === 1) {
        toDoCounter.textContent = `You've got ${array.length - doneCount} task to do`
    } else {
        toDoCounter.textContent = `You've got ${array.length - doneCount} tasks to do`
    }

    if (array.length === doneCount) {
        toDoCounter.textContent = `Good job! You've done all the todo's!`
    }
}


const toDoCounter = document.querySelector('.todo-qty')


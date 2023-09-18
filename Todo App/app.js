// Array to store task
let tasks = [];

const taskInput = document.querySelector('.input-task');

// Function to add task to array
const addTask = () => {
    const taskName = taskInput.value;
    console.log("Add new task");

    if(taskName.trim() != '') {
        const task = {
            id: Date.now(),
            name: taskName,
            completed: false
        };
        tasks.push(task);
    }

    // console.log(task);
    renderTask();
    taskInput.value = '';
}

// Add new task when Enter key is pressed 
taskInput.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        addTask();
    }
});

// Function to Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTask();
}

// Function to mark a task as completed.
function markCompleted(id) {
    tasks = tasks.map(task => {
        if(task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    updateCompleteTask(id);
}

function updateCompleteTask(id) {
    const taskElement = document.getElementById(id);
    if(taskElement) {
        const task = tasks.find(task => task.id ==id);
        if(task.completed) {
            taskElement.classList.add('completed');
        } else {
            taskElement.classList.remove('completed');
        }
    }
}

// Function to render task on page
const renderTask = () => {
    const taskList = document.querySelector('.list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        // create new List item
        const listItem = document.createElement('li');
        listItem.setAttribute('id', task.id);
        listItem.classList.add('task', task.completed ? 'completed' : 'not');

        // create main container
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('container');
        taskContainer.addEventListener('click', () => {
            markCompleted(task.id);
        });

        // create circle icon
        const taskCircle = document.createElement('div');
        taskCircle.classList.add('circle');

        // create task name
        const taskName = document.createElement('span');
        taskName.textContent = task.name;

        // create task delete button
        const deleteButton = document.createElement('i');
        deleteButton.classList.add("fa-solid", "fa-xmark")
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id);
        });

        // add all element into list
        taskContainer.appendChild(taskCircle);
        taskContainer.appendChild(taskName);
        listItem.appendChild(taskContainer);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
}

renderTask();
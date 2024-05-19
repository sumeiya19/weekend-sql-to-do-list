console.log('JS is sourced!');

function getTask() {
    axios({
        method: 'GET',
        url: '/todos'
    })
    .then((response) => {
        console.log('getTask is running...', response.data);
        renderTask(response.data);
    })
    .catch((err) => {
        console.error('Error in /GET todos', err);
    });
}

getTask();

function addTask(taskToAdd) {
    axios({
        method: 'POST',
        url: '/todos',
        data: taskToAdd
    })
    .then((response) => {
        console.log('addTasks() is working...', response.data);
        getTask();
    })
    .catch((err) => {
        console.error('Error in POST', err);
        alert('Unable to add Task at this time. Please try again later.');
    });
}

// Display array of tasks on DOM
function renderTask(todos) {
    const todoList = document.getElementById('viewTasks');
    todoList.innerHTML = '';

    for (let i = 0; i < todos.length; i += 1) {
        let task = todos[i];
        console.log('task is ', task);
        const taskRowId = `task-${task.id}`;
        todoList.innerHTML += `
            <tr id="${taskRowId}">
                <td>${task.text}</td>  
                <td>${task.isComplete}</td>
                <td><button onClick="isComplete(${task.id}, true)">Complete</button></td>
                <td><button onClick="deleteTask(${task.id})">Delete</button></td>
            </tr>
        `;

        
        const taskElement = document.getElementById(taskRowId);
        if (taskElement) {
            if (task.isComplete) {
                taskElement.classList.add("complete");
            } else {
                taskElement.classList.remove("complete");
            }
        }
    }
}

function submitTask(event) {
    event.preventDefault();
    console.log('Task button clicked!');

    let task = {};
    task.text = document.getElementById("taskIn").value;
    task.isComplete = false;
    addTask(task);

    document.getElementById("taskIn").value = '';
}

function isComplete(taskId, isReady) {
    console.log("Changing status of...", taskId, isReady);

    axios({
        method: "PUT",
        url: "/todos/complete/" + taskId,
        data: { isComplete: isReady }
    })
    .then((response) => {
        getTask();
    })
    .catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
    });

    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
        const classList = taskElement.classList;

        if (isReady === true) {
            classList.add("complete");
        } else {
            classList.remove("complete");
        }
    }
}

function deleteTask(taskId) {
    axios({
        method: "DELETE",
        url: `/todos/${taskId}`
    })
    .then((response) => {
        console.log('Deleting Task: ', taskId);
        getTask();
    })
    .catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
    });
}

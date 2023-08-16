/*
 * Title: Advanced todo Application using vanilla JS DOM
 * Description: This JS file has all the JS functions necessary to control the to do application
 * Author: Shuvo Baroi
 * Date: 8/15/2023
 *
 */

const newTaskInput = document.getElementById("add-new");
const newTaskForm = document.getElementById("new-task-form");
const addBtn = document.getElementById("add-task");
const taskListContainer = document.querySelector("#task-list");
const DeleteTask = document.querySelector('ul li span');

// Add new task
newTaskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskListContainer = document.querySelector("#task-list");
    const getInputedText = newTaskInput.value;
    let taskItem = document.createElement('li');
    taskItem.classList.add('task', 'flex', 'justify-between', 'text-gray-800', 'relative', 'cursor-pointer');

    taskItem.innerHTML = `
        <p class="max-w-[86%]">${getInputedText}</p>
        <span>\u00d7</span>
    `;
    newTaskInput.value = '';
    taskListContainer.appendChild(taskItem);
    saveTheData ()
});

// Complete task

taskListContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains('checked') || (event.target.classList.contains('checked') && event.target.tagName !== 'SPAN')) {
        event.target.classList.remove('checked');
        saveTheData ()
    } else {
        event.target.classList.add('checked');
        saveTheData ()
    }
})


// Delete task
taskListContainer.addEventListener("click", function (event) {
    if (event.target.tagName === 'SPAN') {
        event.target.parentElement.remove();
        saveTheData ()
    } else if (event.target.tagName === 'P') {
        if (event.target.parentElement.classList.contains('checked')){
            event.target.parentElement.classList.remove('checked');
            saveTheData ()
        } else if(!event.target.parentElement.classList.contains('checked')){
            event.target.parentElement.classList.add('checked');
            saveTheData ()
        }
    }
}, false);


// Save data to local storage

function saveTheData () {
    localStorage.setItem ("Data", taskListContainer.innerHTML);
}

function showData () {
    taskListContainer.innerHTML = localStorage.getItem("Data");
}

showData();
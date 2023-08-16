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
const editButton = document.querySelector('.edit');

// Add new task
newTaskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskListContainer = document.querySelector("#task-list");
    const getInputedText = newTaskInput.value;
    let taskItem = document.createElement('li');
    taskItem.classList.add('task', 'flex', 'justify-between', 'text-gray-800', 'relative', 'cursor-pointer');

    taskItem.innerHTML = `
        <p class="max-w-[80%]">${getInputedText}</p>
        <button class="edit succes rounded-[4px] text-[14px] text-green-600 underline underline-offset-4 mr-12 -mb-2">Edit</button>
        <span>\u00d7</span>
    `;
    newTaskInput.value = '';
    taskListContainer.appendChild(taskItem);
    saveTheData()
});


// Complete task

taskListContainer.addEventListener("click", function (event) {
    let parentElement = event.target.parentElement;
    let targetElement = event.target;
    if (targetElement.tagName === 'LI') {
        targetElement.classList.toggle('checked');
        targetElement.querySelector('p').classList.toggle('checked2');
        saveTheData();
    } else if (targetElement.tagName === 'P') {
        parentElement.classList.toggle('checked');
        targetElement.classList.toggle('checked2');
    } else if (targetElement.tagName === 'button') {
        editTask(event);
    }
})

// Edit task
taskListContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("edit")) {
        const li = event.target.closest("li");
        
        if (li) {
            const existingTextArea = li.querySelector("textarea");
            const existingParagraph = li.querySelector("p");
            
            if (existingTextArea) {
                const editedTaskValue = existingTextArea.value;
                li.innerHTML = `
                    <p class="max-w-[80%]">${editedTaskValue}</p>
                    <button class="edit succes rounded-[4px] text-[14px] text-green-600 underline underline-offset-4 mr-12 -mb-2">Edit</button>
                    <span>\u00d7</span>`;
            } else if (existingParagraph) {
                const presentTaskValue = existingParagraph.innerText;
                li.innerHTML = `
                    <textarea name="task-edit-box" id="task-edit" rows="3" class="border-gray-200 rounded-md w-[75%] p-3 text-[14px] ml-10">${presentTaskValue}</textarea>
                    <button class="edit succes rounded-[4px] text-[14px] text-green-600 underline underline-offset-4 mr-12 -mb-2">Save</button>
                    <span>\u00d7</span>`;
            }
            
            saveTheData();
        }
    }
});


// Delete task
taskListContainer.addEventListener("click", function (event) {
    if (event.target.tagName === 'SPAN') {
        event.target.parentElement.remove();
        saveTheData()
    }
});


// Save data to local storage

function saveTheData() {
    localStorage.setItem ("Data", taskListContainer.innerHTML);
}

function showData() {
    taskListContainer.innerHTML = localStorage.getItem("Data");
}

showData();
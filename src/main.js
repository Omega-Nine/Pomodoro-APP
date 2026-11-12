import './style.css';
import { createTask } from './task.js';
import { addTask, getTaskById, updateTask, deleteTask, restoreTask, getActiveTasks, getDeletedTasks, completeTask, reopenTask } from './taskStorage.js';

function renderTasks() {
    taskContainer.replaceChildren();
    const taskList = getActiveTasks();

    for(const obj of taskList) {
        const div = document.createElement('div');
        div.textContent = obj.title;
        taskContainer.append(div);
    };
}


const taskContainer = document.querySelector('#task-list');
const title = document.querySelector('input');
const button = document.querySelector('button');

button.addEventListener('click', function() { 
    try{
        const resultValue = title.value;
        const task = createTask(resultValue);
        addTask(task);
        renderTasks();
        title.value = '';
    } catch(err) {
        console.log("Произошла ошибка:", err.message);
    }
    
});










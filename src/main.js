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
const task = createTask('Learn CSS');
const task1 = createTask('Learn HTML');
const task2 = createTask('Learn JS');
addTask(task);
addTask(task1);
addTask(task2);

renderTasks();
deleteTask(task1.id);
renderTasks();









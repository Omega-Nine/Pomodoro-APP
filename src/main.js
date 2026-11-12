import './style.css';
import { createTask } from './task.js';
import { addTask, getTaskById, updateTask, deleteTask, restoreTask, getActiveTasks, getDeletedTasks, completeTask, reopenTask } from './taskStorage.js';

function renderTasks() {
    taskContainer.replaceChildren();
    const taskList = getActiveTasks();

    for(const task of taskList) {
        const div = document.createElement('div');
        div.textContent = task.title;

        const buttonDelete = document.createElement('button');
        buttonDelete.textContent = 'Delete';

        const buttonComplete = document.createElement('button');
        if(task.completedAt === null) {
            buttonComplete.textContent = 'Complete';
        } else{
            buttonComplete.textContent = 'Reopen';
        }
        

        buttonDelete.addEventListener('click', function() {
            deleteTask(task.id);
            renderTasks();
        });

        buttonComplete.addEventListener('click', function() {
            if(task.completedAt === null) {
                completeTask(task.id);
            } else{
                reopenTask(task.id);
            }

            renderTasks();
        });

        div.append(buttonComplete, buttonDelete);
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










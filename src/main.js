import './style.css';
import { createTask } from './task.js';
import { addTask, getTaskById, updateTask, deleteTask, restoreTask, getActiveTasks, getDeletedTasks, completeTask, reopenTask } from './taskStorage.js';

function renderTasks() {
    taskContainer.replaceChildren();
    const taskList = getActiveTasks();

    for(const task of taskList) {
        const div = document.createElement('div');
        div.classList.add('task-card');

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('task-actions')

        const spanTitle = document.createElement('span');
        spanTitle.textContent = task.title;

        const buttonDelete = document.createElement('button');
        buttonDelete.textContent = 'Delete';

        const buttonComplete = document.createElement('button');
        if(task.completedAt === null) {
            buttonComplete.textContent = 'Complete';
        } else{
            spanTitle.classList.add('completed');
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

        buttonsContainer.append(buttonComplete, buttonDelete);
        div.append(spanTitle, buttonsContainer);
        taskContainer.append(div);
    };
}


const taskContainer = document.querySelector('#task-list');
const title = document.querySelector('#input-title');
const button = document.querySelector('#add-task-btn');

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










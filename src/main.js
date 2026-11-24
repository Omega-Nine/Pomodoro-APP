import './style.css';
import { createTask } from './task.js';
import { addTask, getTaskById, updateTask, deleteTask, restoreTask, getActiveTasks, getDeletedTasks, completeTask, reopenTask } from './taskStorage.js';

function renderTasks() {
    taskContainer.replaceChildren();
    const taskList = getActiveTasks();

    for(const task of taskList) {
        const divTask = document.createElement('div');
        divTask.classList.add('task-card');

        const divText = document.createElement('div');
        divText.classList.add('task-text');

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('task-actions');

        const divTaskMeta = document.createElement('div');
        divTaskMeta.classList.add('task-meta');

        const spanTitle = document.createElement('span');
        spanTitle.textContent = task.title;
        spanTitle.classList.add('task-title');

        const spanPriority = document.createElement('span');
        spanPriority.textContent = task.priority;
        spanPriority.classList.add('task-priority');
        spanPriority.classList.add(`priority-${task.priority}`);
        

        const buttonDelete = document.createElement('button');
        buttonDelete.textContent = 'Delete';
        buttonDelete.classList.add('delete-btn');

        const buttonComplete = document.createElement('button');
        buttonComplete.classList.add('complete-btn');

        divText.append(spanTitle);

        if(task.completedAt === null) {
            buttonComplete.textContent = 'Complete';
        } else{
            spanTitle.classList.add('completed');
            buttonComplete.textContent = 'Reopen';
        }

        if(task.description !== null) {
            const pDescription = document.createElement('p');
            pDescription.textContent = task.description;
            pDescription.classList.add('task-description');
            divText.append(pDescription);
        }

        if(task.priority !== null) {
            const pPriority = document.createElement('p');
            pPriority.textContent = `Deadline: ${task.deadline}`;
            pPriority.classList.add('task-deadline');
            divTaskMeta.append(pPriority);
        }

        if(task.plannedPomodoros !== null) {
            const pPlannedPomodoros = document.createElement('p');
            pPlannedPomodoros.textContent = `${task.plannedPomodoros} 🍅`;
            divTaskMeta.append(pPlannedPomodoros);
        }

        if(task.scheduledFor !== null) {
            const pScheduledFor = document.createElement('p');
            pScheduledFor.textContent = `Planned: ${task.scheduledFor}`;
            divTaskMeta.append(pScheduledFor);
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
        
        divText.append(divTaskMeta);
        buttonsContainer.append(buttonComplete, buttonDelete);
        divTask.append(divText, spanPriority, buttonsContainer);
        taskContainer.append(divTask);
    };
}


const taskContainer = document.querySelector('#task-list');
const title = document.querySelector('#input-title');
const button = document.querySelector('#add-task-btn');

button.addEventListener('click', function() { 
    try{
        const resultValue = title.value;
        const task = createTask(resultValue, "Практика работы с DOM фыважфывоажфывжажфываэфывраовжащофызщаозукофыэакрщфыщжуркжфыущратфывжатывдфатдфывалтфывэатэфывадфывоьалфывдаджфываждфыважфываофывожауыщзаоэфызаолэузкшэфыокофжы", 'urgent', '2026-11-27', '5', '2026-11-26');
        addTask(task);
        renderTasks();
        title.value = '';
    } catch(err) {
        console.log("Произошла ошибка:", err.message);
    }
});










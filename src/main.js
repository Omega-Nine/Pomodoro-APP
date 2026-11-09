import './style.css';
import { createTask } from './task.js';
import { addTask, getTaskById, updateTask, deleteTask, restoreTask, getActiveTasks, getDeletedTasks } from './taskStorage.js';


const task1 = createTask('Learn JS');
addTask(task1);

const task2 = createTask('Learn HTML');
addTask(task2);

const task3 = createTask('Learn CSS');
addTask(task3);

console.log(getActiveTasks().length);
deleteTask(task2.id);
console.log("Удаленные задачи:", getDeletedTasks().length);
console.log(getActiveTasks().length);
restoreTask(task2.id);
console.log("Удаленные задачи:",getDeletedTasks().length);
console.log(getActiveTasks().length);
deleteTask(task1.id);
deleteTask(task2.id);
deleteTask(task3.id);
console.log("Удаленные задачи:",getDeletedTasks().length);
console.log(getActiveTasks().length);




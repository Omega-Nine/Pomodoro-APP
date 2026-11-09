import './style.css';
import { createTask } from './task.js';
import { addTask, getTaskById, updateTask,deleteTask } from './taskStorage.js';

const task = createTask('Learn JS');
addTask(task);

// ТЕСТ 1: Первое удаление
console.log('До удаления:', task.deletedAt);

const deletedTask = deleteTask(task.id);

console.log('После удаления:', deletedTask.deletedAt);
console.log('Это объект Date:', deletedTask.deletedAt instanceof Date);

// ТЕСТ 2: Повторное удаление
const firstDeletedTime = task.deletedAt.getTime();

deleteTask(task.id);

console.log(
    'Дата не изменилась:',
    firstDeletedTime === task.deletedAt.getTime()
);

// ТЕСТ 3: Несуществующий ID
const result = deleteTask('unknown-id');

console.log('Неизвестный ID:', result);

// ТЕСТ 4: Задача осталась в массиве
console.log(
    'Задача всё ещё существует:',
    getTaskById(task.id) === task
);
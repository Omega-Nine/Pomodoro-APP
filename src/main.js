import './style.css';
import { createTask } from './task.js';

console.log('main.js работает');

const newTask = createTask(
    'Learn JS',
    'Objects and functions',
    'high',
    '2026-10-10',
    2.5,
    null
);

console.log(newTask);
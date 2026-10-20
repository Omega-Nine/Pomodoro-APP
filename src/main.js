import './style.css';
import { createTask } from './task.js';
import { addTask } from './taskStorage.js';
import { getTasks } from './taskStorage.js';    

console.log('main.js работает');

const newTask = createTask(
    'Learn JS',
    'Objects and functions',
    'low',
    '2026-10-28',
    1,
    null
);

addTask(newTask);

const newTask1 = createTask(
    'Learn English',
    'First conditional',
    'medium',
    '2026-10-29',
    2,
    null
);

addTask(newTask1);

const newTask2 = createTask(
    'Learn songs',
    'Last Resort',
    'high',
    '2026-10-30',
    3,
    null
);

addTask(newTask2);




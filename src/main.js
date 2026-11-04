import './style.css';
import { createTask } from './task.js';
import { addTask, getTaskById, updateTask } from './taskStorage.js';


const task1 = createTask('Learn JS');
addTask(task1);
console.log(task1);

try {
    const task2 = createTask('');
    addTask(task2);
} catch (error) {
    console.log('Expected error:', error.message);
}

const task3 = createTask('Learn JS', 'I am starting learn JS now', 'low', '2026-12-12', 4, '2026-11-25');
addTask(task3);
console.log(task3);

// Проверка некорректного приоритета
try {
    createTask('Learn JS', null, 'super-high');
    console.error('FAIL: Invalid priority was accepted');
} catch (error) {
    console.log('PASS: Invalid priority:', error.message);
}

// Проверка отрицательного количества Pomodoro
try {
    createTask('Learn JS', null, 'medium', null, -3);
    console.error('FAIL: Negative pomodoros were accepted');
} catch (error) {
    console.log('PASS: Negative pomodoros:', error.message);
}

// Проверка некорректной даты
try {
    createTask('Learn JS', null, 'medium', '2026-02-30');
    console.error('FAIL: Invalid date was accepted');
} catch (error) {
    console.log('PASS: Invalid date:', error.message);
}

// Проверка дедлайна в прошлом
try {
    createTask('Learn JS', null, 'medium', '2020-01-01');
    console.error('FAIL: Past deadline was accepted');
} catch (error) {
    console.log('PASS: Past deadline:', error.message);
}

// Проверка scheduledFor позже deadline
try {
    createTask(
        'Learn JS',
        null,
        'medium',
        '2026-12-10',
        4,
        '2026-12-15'
    );
    console.error('FAIL: scheduledFor after deadline was accepted');
} catch (error) {
    console.log('PASS: scheduledFor after deadline:', error.message);
}

// Проверка нормализации названия и описания
try {
    const task = createTask(
        '   Learn JS   ',
        '   Study JavaScript   '
    );

    if (
        task.title === 'Learn JS' &&
        task.description === 'Study JavaScript'
    ) {
        console.log('PASS: Text normalization');
    } else {
        console.error('FAIL: Text normalization', task);
    }
} catch (error) {
    console.error('FAIL: Text normalization:', error.message);
}

// Проверка преобразования количества Pomodoro из строки в число
try {
    const task = createTask('Learn JS', null, 'medium', null, '4');

    if (task.plannedPomodoros === 4) {
        console.log('PASS: Pomodoro normalization');
    } else {
        console.error('FAIL: Pomodoro normalization', task);
    }
} catch (error) {
    console.error('FAIL: Pomodoro normalization:', error.message);
}

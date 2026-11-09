import { validateTaskData } from "./task.js";

const taskList = [];

function addTask(task) {
    taskList.push(task);
}

function getTasks() {
    return taskList;
}

function getTaskById(id) {
   for(let i = 0; i < taskList.length; i++) {
        if(id === taskList[i].id) {
            return taskList[i];
        }
   }

   return null;

}

function updateTask(id, changes) {

    const allowedFields = [
    'title',
    'description',
    'priority',
    'deadline',
    'scheduledFor',
    'plannedPomodoros'
    ];

    const task = getTaskById(id);
    if(task === null) {
        return null; 
    }

    const keys = Object.keys(changes);

    for(let i = 0; i < keys.length; i++) {
        if(!allowedFields.includes(keys[i])) {
            throw new Error("Field modification is not allowed");
        }
    }

    const changesTask = {
        ...task,
        ...changes
    };

    const validObject = validateTaskData(changesTask);

    for(let i = 0; i < keys.length; i++) {
        task[keys[i]] = validObject[keys[i]];
    }

    return task;
 
}

function deleteTask(id) {
    const task = getTaskById(id);

    if(task === null) {
        return null;
    } 

    const date = new Date();

    if(task.deletedAt === null) {
        task.deletedAt = date;
    }

    return task;

}

function restoreTask(id) {
    const task = getTaskById(id);

    if(task === null) {
        return null;
    } 

    if(task.deletedAt !== null) {
        task.deletedAt = null;
    }

    return task;
}

export { addTask };
export { getTasks };
export { getTaskById };
export { updateTask };
export { deleteTask };
export { restoreTask };
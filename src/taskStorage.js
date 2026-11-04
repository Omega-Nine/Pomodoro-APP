
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

    for(let i = 0; i < keys.length; i++) {
        task[keys[i]] = changes[keys[i]];
    }

    return task;
 
}



export { addTask };
export { getTasks };
export { getTaskById };
export { updateTask };
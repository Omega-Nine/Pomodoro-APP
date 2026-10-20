
const taskList = [];

function addTask(task) {
    taskList.push(task);
}

function getTasks() {
    return taskList;
}

export { addTask };
export { getTasks };
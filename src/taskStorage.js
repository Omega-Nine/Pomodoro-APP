
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

export { addTask };
export { getTasks };
export { getTaskById };
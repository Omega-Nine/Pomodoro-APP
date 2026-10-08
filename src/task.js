const priorities = ['urgent', 'high', 'medium', 'low'];

function createTask(title, description = null, priority = 'medium', deadline = null, plannedPomodoros = null, scheduledFor = null) {
    if(typeof title !== 'string') {
        throw new Error('Title is required');
    } 

    if(title.trim().length === 0) {
        throw new Error('Title is required');
    }

    const normalizedTitle = title.trim();

    let normalizedDescription = null;

    if(description !== null) {
        if(typeof description !== 'string') {
            throw new Error('Description must be a string');
        }

        const trimmedDescription = description.trim();
        
        if(trimmedDescription.length > 0) {
            normalizedDescription = trimmedDescription;
        }
    }

    let normalizedPlannedPomodoro = null;
    if(plannedPomodoros !== "" && plannedPomodoros !== null) {
        const numberPlannedPomodoro = Number(plannedPomodoros);

        if(!Number.isInteger(numberPlannedPomodoro)) {
            throw new Error('This number is not correct');
        }

        if(numberPlannedPomodoro <= 0 ) {
            throw new Error('This number is not correct');
        }

        normalizedPlannedPomodoro = numberPlannedPomodoro;
    }

    if(!priorities.includes(priority)) {
        throw new Error('Invalid priority');
    }

    const id = crypto.randomUUID();
    const createdAt = new Date();
    const task = { 
        title: normalizedTitle,
        description: normalizedDescription,
        priority,
        deadline,
        plannedPomodoros: normalizedPlannedPomodoro,
        scheduledFor,
        id,
        createdAt,
        completedAt: null,
        deletedAt: null,
    };

    return task;
}

export { createTask };

function createTask(title, description = null, priority = null, deadline = null, plannedPomodoros = null, scheduledFor = null) {
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

    const id = crypto.randomUUID();
    const createdAt = new Date();
    const task = { 
        title: normalizedTitle,
        description: normalizedDescription,
        priority,
        deadline,
        plannedPomodoros,
        scheduledFor,
        id,
        createdAt,
        completedAt: null,
        deletedAt: null,
    };

    return task;
}

export { createTask };


function isValidDate(dateString) {
    if (typeof dateString !== 'string') {
        return false;
    }

    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(dateString)) {
        return false;
    }

    const [year, month, day] = dateString.split('-').map(Number);

    if (year < 1000 || year > 9999) {
        return false;
    }

    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

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

    const today = new Date();
    const month = today.getMonth() + 1;
    const normalizedMonth = String(month).padStart(2, "0");

    const day = today.getDate();
    const normalizedDay = String(day).padStart(2, "0");

    const year = today.getFullYear();
    const fullDate = `${year}-${normalizedMonth}-${normalizedDay}`;

    if(deadline !== null) {
        if(isValidDate(deadline) === false) {
            throw new Error("Invalid deadline")
        }

        if(deadline < fullDate) {
            throw new Error('Impossible deadline');
        }
    }
    
    if(scheduledFor !== null) {
        if(isValidDate(scheduledFor) === false) {
            throw new Error("Invalid scheduledFor")
        }
    }
    

    if(deadline !== null && scheduledFor !== null) {
        if(scheduledFor > deadline) {
            throw new Error('Scheduled date cannot be after deadline');
        }
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


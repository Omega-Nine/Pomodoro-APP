
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

function validateTaskData(validData) {
    
    if(typeof validData.title !== 'string') {
        throw new Error('Title is required');
    } 

    if(validData.title.trim().length === 0) {
        throw new Error('Title is required');
    }

    const normalizedTitle = validData.title.trim();

    let normalizedDescription = null;

    if(validData.description !== null) {
        if(typeof validData.description !== 'string') {
            throw new Error('Description must be a string');
        }

        let trimmedDescription = validData.description.trim();
        
        if(trimmedDescription.length > 0) {
            normalizedDescription = trimmedDescription;
        }
    }

    let normalizedPlannedPomodoro = null;

    if(validData.plannedPomodoros !== "" && validData.plannedPomodoros !== null) {
        let numberPlannedPomodoro = Number(validData.plannedPomodoros);

        if(!Number.isInteger(numberPlannedPomodoro)) {
            throw new Error('This number is not correct');
        }

        if(numberPlannedPomodoro <= 0 ) {
            throw new Error('This number is not correct');
        }

        normalizedPlannedPomodoro = numberPlannedPomodoro;
    }

    if(!priorities.includes(validData.priority)) {
        throw new Error('Invalid priority');
    }

    if(validData.deadline !== null) {
        if(!isValidDate(validData.deadline)) {
            throw new Error("Invalid deadline")
        }
    } 
            
    if(validData.scheduledFor !== null) {
        if(isValidDate(validData.scheduledFor) === false) {
            throw new Error("Invalid scheduledFor")
        }
    }

    if(validData.deadline !== null && validData.scheduledFor !== null) {
        if(validData.scheduledFor > validData.deadline) {
            throw new Error('Scheduled date cannot be after deadline');
        }
    }

    const priority = validData.priority;
    const deadline = validData.deadline;
    const scheduledFor = validData.scheduledFor;

    const validTask = {
        title: normalizedTitle,
        description: normalizedDescription,
        priority,
        deadline,
        plannedPomodoros: normalizedPlannedPomodoro,
        scheduledFor
    }

    return validTask;
}



function createTask(title, description = null, priority = 'medium', deadline = null, plannedPomodoros = null, scheduledFor = null) {
    const inputData = {
        title,
        description,
        priority,
        deadline,
        plannedPomodoros,
        scheduledFor
    };

    const validatedData = validateTaskData(inputData);

    const today = new Date();
    const month = today.getMonth() + 1;
    const normalizedMonth = String(month).padStart(2, "0");

    const day = today.getDate();
    const normalizedDay = String(day).padStart(2, "0");

    const year = today.getFullYear();
    const fullDate = `${year}-${normalizedMonth}-${normalizedDay}`;

    if(validatedData.deadline !== null && validatedData.deadline < fullDate) {
        throw new Error('Impossible deadline');
    }

    const id = crypto.randomUUID();
    const createdAt = new Date();
    const systemData = { 
        id,
        createdAt,
        completedAt: null,
        deletedAt: null,
    };

    const task = {
        ...validatedData,
        ...systemData
    };

    return task;
}

export { createTask };
export { validateTaskData };


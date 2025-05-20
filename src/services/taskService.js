export function loadTasks(){
    try{
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }catch(e){
        console.error('Failed to get task from local Storage', e)
        return [];
    }
}

export function saveTasks(tasks){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function addTask(task){
    const tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
}

export function updateTask(updatedTask){
    const tasks = loadTasks();
    const idx = tasks.findIndex(t => t.id === updateTask.id);
    if(idx !== -1){
        tasks[idx] = updatedTask;
        saveTasks(tasks);
    }
}

export function deleteTask(id){
    const tasks = loadTasks().filter(t => t.id !== id);
    saveTasks(tasks);
}


export function getActiveTask(){
    return loadTasks().find(t => t.status === 'ongoing') || null;
}

export function setActiveTask(id){
    localStorage.setItem('activeTaskId', id);
}

export function clearActiveTask(){
    localStorage.removeItem('activeTaskId');
}

export function getActiveTaskId(){
    return localStorage.getItem('activeTaskId');
}


import { timerStart, timerPause, timerEnd, resetTimerDisplay } from "./timer";
import { saveTimerState, updateTaskCounters, renderPausedTaskTable } from './storage.js';
// import { updateTaskCounters, renderPausedTaskTable } from './analytics.js';

export function addNewTaskForm(){
    const taskForm = document.createElement("div");
    taskForm.classList.add("modal");

    taskForm.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>New Task</h2>
            <form id="newTaskForm" class="task-form">
                <div class="form-group">
                    <label for="taskName">Task Name</label>
                    <input type="text" id="taskName" placeholder="Enter task name" required>
                </div>

                <div class="form-group">
                    <label for="priority">Priority</label>
                    <select id="priority">
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="tag">Tag</label>
                    <input type="text" id="tag" placeholder="Enter tag" required>
                </div>

                <div class="form-group">
                    <label for="startDate">Start Date</label>
                    <input type="date" id="startDate" value="${new Date().toISOString().split("T")[0]}">
                </div>

                <div class="form-group">
                    <label for="status">Status</label>
                    <select id="status">
                        <option value="ongoing">Ongoing</option>
                        <option value="paused">Paused</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="targetDate">Target Date to Complete</label>
                    <input type="date" id="targetDate" required>
                </div>

                <div class="form-group">
                    <label for="details">Details</label>
                    <textarea id="details" placeholder="Task details" rows="3"></textarea>
                </div>

                <div class="form-actions">
                    <button type="button" id="addTaskBtnModal" class="btn-primary">Add Task</button>
                    <button type="button" class="btn-secondary close-btn">Cancel</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(taskForm);
    taskForm.style.display = "flex";

    taskForm.querySelector(".close").addEventListener("click", () => {
        taskForm.remove();
    });

    taskForm.querySelector(".close-btn").addEventListener("click", () => {
        taskForm.remove();
    });

    taskForm.querySelector("#addTaskBtnModal").addEventListener("click", () => {
        addNewTask(taskForm);
    });
}

export function pauseCurrentTask(){
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (!activeTaskId) return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === activeTaskId);

    if(task){
        saveTimerState(task);

        task.status = 'paused';
        localStorage.setItem("tasks", JSON.stringify(tasks));

        timerPause();
        localStorage.removeItem("activeTaskId");
        clearOngoingTaskDisplay();

        updateTaskCounters();
        renderPausedTaskTable();
    }
}

export function completeCurrentTask(){
    const activeTaskId = localStorage.getItem("activeTaskId");
    if(!activeTaskId) return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === activeTaskId);

    if(task){
        saveTimerState(task);

        task.status = "completed";
        task.endDate = new Date().toISOString().split("T")[0];
        localStorage.setItem("tasks", JSON.stringify(tasks));

        timerEnd();
        localStorage.removeItem("activeTaskId");
        clearOngoingTaskDisplay();

        updateTaskCounters();
        renderPausedTaskTable();
    }
}

export function showDetailsModal(taskId){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === taskId);

    if(!task) return;

    const taskDetailsModal = document.getElementById("taskDetailsModal");
    const detailsContainer = document.getElementById("taskDetailsContent");

    if (!taskDetailsModal || !detailsContainer) {
      
        const modalElement = document.createElement("div");
        modalElement.id = "taskDetailsModal";
        modalElement.classList.add("modal");
        
        modalElement.innerHTML = `
            <div class="modal-content" id="taskDetailsContent">
                <span class="close">&times;</span>
                <h2>${task.name}</h2>
                <div class="task-details">
                    <div>
                        <p class="modal-label"><strong>Priority:</strong> </p>
                        <p class="priority-badge priority-${task.priority} modal-description">${task.priority}</p>
                    </div>
                    <div>
                        <p class="modal-label"><strong>Tag:</strong></p>
                        <p class="tag-badge modal-description">${task.tag}</p>
                    </div>
                    <div>
                        <p class="modal-label"><strong>Status:</strong></p>
                        <p class="status-badge status-${task.status} modal-description">${task.status}</p>
                    </div>
                    <div>
                        <p class="modal-label"><strong>Start Date:</strong></p>
                        <p class="start-date modal-description">${task.startDate}</p>
                    </div>
                    <div>
                        <p class="modal-label"><strong>End Date:</strong></p>
                        <p class="end-date modal-description">${task.endDate || "--"}</p>
                    </div>
                    <div>
                        <p class="modal-label"><strong>Target Date:</strong></p>
                        <p class="target-date modal-description"> ${task.targetDate || "--"}</p>
                    </div>
                    <div>
                        <p class="modal-label"><strong>Total Time Taken:</strong></p>
                        <p class="time-taken modal-decription">${task.timeTaken || "00:00:00"}</p>
                    </div>
                    <div>
                        <p class="modal-label"><strong>Description:</strong></p>
                        <p class="task-taken modal-decription">${task.details || "No description"}</p>
                    </div>

                    <h3>Time Details</h3>
                    <section class="time-fragments">
                      
                        <div class="table-container">
                            <table class="time-fragment-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>

                                ${(task.timeFragments || []).map(f => `

                                    <tr>
                                        <td>${f.date}</td>
                                        <td>${f.duration}</td>
                                    </tr>

                                `).join("")}

                                </tbody>
                            </table>
                        </div>

                    
                </section>
                    <div class="action-buttons">
                        ${task.status === "paused" ? `<button class="btn-primary" onclick="resumeTask('${task.id}')">Resume Task</button>` : ''}
                        <button class="btn-secondary" onclick="editTask('${task.id}')">Edit Task</button>
                        ${task.status !== "completed" ? `<button class="btn-success" onclick="completeTask('${task.id}')">Complete Task</button>` : ''}
                        <button class="btn-danger" onclick="deleteTask('${task.id}')">Delete Task</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalElement);
        
        
        modalElement.querySelector(".close").addEventListener("click", () => {
            modalElement.style.display = "none";
        });
        
        modalElement.style.display = "flex";

    } else {
        
        detailsContainer.innerHTML = `
            <span class="close">&times;</span>
            <h2>${task.name}</h2>
            <div class="task-details">
                <div>
                    <p class="modal-label"><strong>Priority:</strong> </p>
                    <p class="priority-badge priority-${task.priority} modal-description">${task.priority}</p>
                </div>
                <div>
                    <p class="modal-label"><strong>Tag:</strong></p>
                    <p class="tag-badge modal-description">${task.tag}</p>
                </div>
                <div>
                    <p class="modal-label"><strong>Status:</strong></p>
                    <p class="status-badge status-${task.status} modal-description">${task.status}</p>
                </div>
                <div>
                    <p class="modal-label"><strong>Start Date:</strong></p>
                    <p class="start-date modal-description">${task.startDate}</p>
                </div>
                <div>
                    <p class="modal-label"><strong>End Date:</strong></p>
                    <p class="end-date modal-description">${task.endDate || "--"}</p>
                </div>
                <div>
                    <p class="modal-label"><strong>Target Date:</strong></p>
                    <p class="target-date modal-description"> ${task.targetDate || "--"}</p>
                </div>
                <div>
                    <p class="modal-label"><strong>Total Time Taken:</strong></p>
                    <p class="time-taken modal-description">${task.timeTaken || "00:00:00"}</p>
                </div>
                <div>
                    <p class="modal-label"><strong>Description:</strong></p>
                    <p class="task-taken modal-description">${task.details || "No description"}</p>
                </div>

                <h3>Time Details</h3>
                <section class="time-fragments">
                    
                       
                        <div class="table-container">
                            <table class="time-fragment-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>

                                ${(task.timeFragments || []).map(f => `

                                    <tr>
                                        <td>${f.date}</td>
                                        <td>${f.duration}</td>
                                    </tr>

                                `).join("")}

                                </tbody>
                            </table>
                        </div>

                    
                </section>
                
                <div class="action-buttons">
                    ${task.status === "paused" ? `<button class="btn-resume" onclick="resumeTask('${task.id}')">Resume Task</button>` : ''}
                    <button class="btn-edit" onclick="editTask('${task.id}')">Edit Task</button>
                    ${task.status !== "completed" ? `<button class="btn-completed" onclick="completeTask('${task.id}')">Complete Task</button>` : ''}
                    <button class="btn-delete" onclick="deleteTask('${task.id}')">Delete Task</button>
                </div>

            </div>
        `;
        
        taskDetailsModal.querySelector(".close").addEventListener("click", () => {
            taskDetailsModal.style.display = "none";
        });
        
        taskDetailsModal.style.display = "flex";
    }
}

export function editTask(taskId){

     
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === taskId); 
    
    if (!task) return;
    
    const editForm = document.createElement("div");
    editForm.classList.add("modal");
    
    editForm.innerHTML = `
        <div class="modal-content"> 
            <span class="close">&times;</span> 
            <h2>Edit Task</h2>
            
            <form id="editTaskForm" class="task-form"> 
                <div class="form-group">
                    <label for="editTaskName">Task Name</label>
                    <input type="text" id="editTaskName" value="${task.name}" placeholder="Task Name" required>
                </div>

                <div class="form-group">
                    <label for="editPriority">Priority</label>
                    <select id="editPriority">
                        <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
                        <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
                    </select>
                </div>
            
                <div class="form-group">
                    <label for="editTag">Tag</label>
                    <input type="text" id="editTag" value="${task.tag}" placeholder="Tag" required>
                </div>
            
                <div class="form-group">
                    <label for="editStatus">Status</label>
                    <select id="editStatus">
                        <option value="ongoing" ${task.status === 'ongoing' ? 'selected' : ''}>Ongoing</option>
                        <option value="paused" ${task.status === 'paused' ? 'selected' : ''}>Paused</option>
                        <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </div>
            
                <div class="form-group">
                    <label for="editTargetDate">Target Completion Date</label>
                    <input type="date" id="editTargetDate" value="${task.targetDate}" required>
                </div>
                
                <div class="form-group">
                    <label for="editDetails">Details</label>
                    <textarea id="editDetails" rows="3">${task.details || ''}</textarea>
                </div>
                
                <div class="form-actions">
                    <button type="button" id="saveTaskBtn" class="btn-primary">Save Changes</button>
                    <button type="button" class="btn-secondary close-btn">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(editForm);
    editForm.style.display = "flex";

    editForm.querySelector(".close").addEventListener("click", () => {
        editForm.remove();
    });
    
    editForm.querySelector(".close-btn").addEventListener("click", () => {
        editForm.remove();
    });

    editForm.querySelector("#saveTaskBtn").addEventListener("click", () => {
        updateTaskData(taskId, editForm);
        editForm.remove();
    });

}


export function updateTaskData(taskId, editForm){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if(taskIndex === -1) return;

    const task = tasks[taskIndex];
    const newStatus = editForm.querySelector("#editStatus").value;
    const oldStatus = task.status;

    task.name = editForm.querySelector("#editTaskName").value;
    task.priority = editForm.querySelector("#editPriority").value;
    task.tag = editForm.querySelector("#editTag").value;
    task.status = newStatus;
    task.targetDate = editForm.querySelector("#editTargetDate").value;
    task.details = editForm.querySelector("#editDetails").value;
    

    if(oldStatus !== newStatus){
        if(oldStatus === "ongoing"){
            saveTimerState(task);
            localStorage.removeItem("activeTaskId");
            clearOngoingTaskDisplay();
            timerPause();
        }

        if(newStatus === "ongoing"){
            const previousOngoing = tasks.find(t => t.id !== taskId && t.status === "ongoing");
            if(previousOngoing){
                saveTimerState(previousOngoing);
                previousOngoing.status = "paused";
            }

            localStorage.setItem("activeTaskId", taskId);
            setOngoingTask(task);
            resetTimer();
            timerStart();

        } else if(newStatus === "completed" && !task.endDate){
            task.endDate = new Date().toISOString().split("T")[0];
        }
    }


    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskCounters();
    renderPausedTaskTable();
}


export function resumeTask(taskId){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const ongoingTask = tasks.find(t => t.status === "ongoing");
    if(ongoingTask){
        saveTimerState(ongoingTask);
        ongoingTask.status = "paused";
    }

    const taskToResume = tasks.find(t => t.id === taskId);

    if(taskToResume){
        taskToResume.status = "ongoing";
        localStorage.setItem("activeTaskId", taskId);

        resetTimer();
        setOngoingTask(taskToResume);
        timerStart();
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskCounters();
    renderPausedTaskTable();
}


export function completeTask(taskId){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === taskId);

    if(task){
        task.status = "completed";
        task.endDate = new Date().toISOString().split("T")[0];
        localStorage.setItem("tasks", JSON.stringify(tasks));

        if(localStorage.getItem("activeTaskId") === taskId){
            localStorage.removeItem("activeTaskId");
            clearOngoingTaskDisplay();
            timerEnd();
        }

        updateTaskCounters();
        renderPausedTaskTable();
    }
}


export function deleteTask(taskId){
    if(!confirm("Confirm to delete Task")) return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    if(localStorage.getItem("activeTaskId") === taskId){
        localStorage.removeItem("activeTaskId");
        clearOngoingTaskDisplay();
        timerEnd();
    }

    updateTaskCounters();
    renderPausedTaskTable();
}

export function clearOngoingTaskDisplay(){
    const displayElements = [
        "displayTaskName", "displayTag", "displayPriority", 
        "displayStartDate", "displayStatus", "displayTargetTime"
    ];
    
    displayElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = " -- ";
        }
    });

    const activePanel = document.getElementById("activeTaskPanel");
    const noActivePanel = document.getElementById("noActiveTaskPanel");
    
    if (activePanel) {
        activePanel.classList.add("hidden");
    }
    
    if (noActivePanel) {
        noActivePanel.classList.remove("hidden");
    }
}


 export function setOngoingTask(task){
    if (!task) return;
    
    const displayMap = {
        "displayTaskName": task.name,
        "displayTag": task.tag,
        "displayPriority": task.priority,
        "displayStartDate": task.startDate,
        "displayStatus": task.status,
        "displayTargetTime": task.targetDate
    };
    
    for (const [id, value] of Object.entries(displayMap)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    const activePanel = document.getElementById("activeTaskPanel");
    const noActivePanel = document.getElementById("noActiveTaskPanel");
    
    if (activePanel) {
        activePanel.classList.remove("hidden");
    }
    
    if (noActivePanel) {
        noActivePanel.classList.add("hidden");
    }
}



window.resumeTask = resumeTask;
window.editTask = editTask;
window.completeTask = completeTask;
window.deleteTask = deleteTask;
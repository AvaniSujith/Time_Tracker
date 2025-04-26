

// console.log("JS is runing");

const sidebar = document.querySelector('.sidebar-aside');
const toggleBtn = document.querySelector(".toggler");
// console.log("btn found", toggleBtn)


// if(toggleBtn){
// toggleBtn.addEventListener("click", () => {
// //    sidebar.classList.toggle("collapse")
// console.log("found")

//  });
// }else{
//     console.log("not found")
// }


const addNew = document.getElementById("addTaskBtn");
const moreBtn = document.getElementById("moreBtn");
const taskOptions = document.getElementById("taskOptions");
const pauseTaskBtn = document.getElementById("pauseTaskBtn");
const completeTaskBtn = document.getElementById("completeTaskBtn");
const editTaskBtn = document.getElementById("editTaskBtn");
const viewDetailsBtn = document.getElementById("viewDetailsBtn");
const closeModalBtn = document.querySelectorAll(".close");
const taskDetailsModal = document.getElementById("taskDetailsModal");

const totalCountElement = document.getElementById("total-count");
const ongoingCountElement = document.getElementById("ongoing-count");
const completedCountElement = document.getElementById("completed-count");
const pausedCountElement = document.getElementById("paused-count");

const timerDisplay = document.getElementById("timer");
const startTimerBtn = document.getElementById("startTimerBtn");
const pauseTimerBtn = document.getElementById("pauseTimerBtn");
const endTimerBtn = document.getElementById("endTimerBtn");

const navLinks = document.querySelectorAll('.nav-link[data-page]');
const pages = document.querySelectorAll('.page');

let timer = null;
let seconds = 0;
let minutes = 0;
let hours = 0;



navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const targetPage = link.getAttribute('data-page');

       
        navLinks.forEach(el => el.parentElement.classList.remove('active'));
        link.parentElement.classList.add('active');

       
        pages.forEach(page => {
            if(page.id === `${targetPage}-page`){
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });

        if(targetPage === 'works-done'){
            renderCompletedTaskTable();
        } else if(targetPage === 'analytics'){
            renderAnalytics();
        } else if(targetPage === 'dashboard') {
            renderPausedTaskTable();
        }
    });
});


addNew.addEventListener("click", () => {
    addNewTaskForm();
});

if (moreBtn) {
    moreBtn.addEventListener("click", () => {
        taskOptions.style.display = "flex";
    });
}

closeModalBtn.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = 'none';
    });
});

if (pauseTaskBtn) {
    pauseTaskBtn.addEventListener("click", () => {
        pauseCurrentTask();
        taskOptions.style.display = "none";
    });
}

if (completeTaskBtn) {
    completeTaskBtn.addEventListener("click", () => {
        completeCurrentTask();
        taskOptions.style.display = "none";
    });
}

if (editTaskBtn) {
    editTaskBtn.addEventListener("click", () => {
        const activeTaskId = localStorage.getItem("activeTaskId");
        if(activeTaskId){
            editTask(activeTaskId);
        }
        taskOptions.style.display = "none";
    });
}

if (viewDetailsBtn) {
    viewDetailsBtn.addEventListener("click", () => {
        const activeTaskId = localStorage.getItem("activeTaskId");
        if(activeTaskId){
            showDetailsModal(activeTaskId);
        }
        taskOptions.style.display = "none";
    });
}

function addNewTaskForm(){
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

function addNewTask(taskForm){

    const taskName = taskForm.querySelector("#taskName").value;
    const priority = taskForm.querySelector("#priority").value;
    const tag = taskForm.querySelector("#tag").value;
    const startDate = taskForm.querySelector('#startDate').value;
    const status = taskForm.querySelector("#status").value;
    const targetDate = taskForm.querySelector("#targetDate").value;
    const details = taskForm.querySelector("#details").value || "";

    if(!taskName || !tag || !targetDate){
        alert("All fields are required");
        return;
    }

    const taskId = Date.now().toString();

    const task = {
        id: taskId,
        name: taskName,
        tag,
        priority,
        startDate,
        status,
        targetDate,
        details,
        timeFragments: [],
        timeTaken: "00:00:00"
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


    const ongoingTask = tasks.find(t => t.status === "ongoing");
    if(ongoingTask && status === "ongoing"){
        ongoingTask.status = "paused";
        saveTimerState(ongoingTask);
        localStorage.removeItem("activeTaskId");
    }

    if(status === "ongoing"){
        localStorage.setItem("activeTaskId", taskId);
        resetTimer();
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    if(status === "ongoing"){
        setOngoingTask(task);
        timerStart();
    }

    updateTaskCounters();
    renderTaskLists();
    taskForm.remove();
}

function saveTimerState(task){
    if (!task) return;
    
    const timerValue = document.getElementById("timer").textContent;

    const timeFragment = {
        date: new Date().toISOString().split('T')[0],
        start: localStorage.getItem("timerStartTime") || new Date().toISOString(),
        end: new Date().toISOString(),
        duration: timerValue
    };

    if(!task.timeFragments){
        task.timeFragments = [];
    }

    task.timeFragments.push(timeFragment);

    if(!task.timeTaken || task.timeTaken === "00:00:00"){
        task.timeTaken = timerValue;
    } else {
        task.timeTaken = addTimes(task.timeTaken, timerValue);
    }
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
        tasks[index] = task;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}


function addTimes(time1, time2){
    const [hours1, minutes1, seconds1] = time1.split(':').map(Number);
    const [hours2, minutes2, seconds2] = time2.split(':').map(Number);

    let totalSeconds = seconds1 + seconds2;
    let totalMinutes = minutes1 + minutes2 + Math.floor(totalSeconds / 60);
    totalSeconds %= 60;

    let totalHours = hours1 + hours2 + Math.floor(totalMinutes / 60);
    totalMinutes %= 60;

    return `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
}


function resetTimer(){
    clearInterval(timer);
    timer = null;
    seconds = 0; 
    minutes = 0;
    hours = 0;

    timerDisplay.textContent = "00:00:00";

    localStorage.setItem("timerStartTime", new Date().toISOString());
}


function pauseCurrentTask(){
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
        renderTaskLists();
    }
}


function completeCurrentTask(){
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
        renderTaskLists();
    }
}


function resumeTask(taskId){
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
    renderTaskLists();
}


function completeTask(taskId){
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
        renderTaskLists();
    }
}


function deleteTask(taskId){
    if(!confirm("Confirm to dlete Task")) return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    if(localStorage.getItem("activeTaskId") === taskId){
        localStorage.removeItem("activeTaskId");
        clearOngoingTaskDisplay();
        timerEnd();
    }

    updateTaskCounters();
    renderTaskLists();
}

function clearOngoingTaskDisplay(){
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


function setOngoingTask(task){
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


function formatTimeFragment(fragments){
    if(!Array.isArray(fragments) || fragments.length === 0) return "--";

    const lastThree = fragments.slice(-3);
    return lastThree.map(frag => `${frag.date}: ${frag.duration}`).join("<br>");
}


function updateTaskCounters(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const totalCount = tasks.length;
    const ongoingCount = tasks.filter(t => t.status === "ongoing").length;
    const pausedCount = tasks.filter(t => t.status === "paused").length;
    const completedCount = tasks.filter(t => t.status === "completed").length;

    if (totalCountElement) totalCountElement.textContent = totalCount;
    if (ongoingCountElement) ongoingCountElement.textContent = ongoingCount;
    if (completedCountElement) completedCountElement.textContent = completedCount;
    if (pausedCountElement) pausedCountElement.textContent = pausedCount;
}


function renderTaskLists(){
    renderPausedTaskTable();
}


function renderPausedTaskTable(){
    const pausedTableBody = document.getElementById('pausedTaskTableBody');
    if(!pausedTableBody) return;

    pausedTableBody.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const pausedTasks = tasks.filter(t => t.status === "paused");

    pausedTasks.forEach((task, index) => {
        const row = document.createElement("tr");
        
      
        const timeFragmentsHtml = formatTimeFragment(task.timeFragments);

        row.innerHTML = `
            <td>${task.id.slice(-4)}</td>
            <td>${task.name}</td>
            <td><span class="priority-badge priority-${task.priority}">${task.priority}</span></td>
            <td><span class="tag-badge">${task.tag}</span></td> 
            <td><span class="status-badge status-${task.status}">${task.status}</span></td>
            <td>${task.startDate}</td>
            <td>${task.endDate || "--"}</td>
            <td>${task.timeTaken || "00:00:00"}</td>
            <td>${timeFragmentsHtml}</td>
            <td>
                <button class="action-btn more-btn" onclick="showDetailsModal('${task.id}')">More</button>
            </td>  
        `;

        pausedTableBody.appendChild(row);
    });
}


function renderCompletedTaskTable(){
    const completedTableBody = document.getElementById('completedTaskTableBody');
    if(!completedTableBody) return;

    completedTableBody.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const completedTasks = tasks.filter(t => t.status === "completed");

    completedTasks.forEach((task, index) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${task.id.slice(-4)}</td>
            <td>${task.name}</td>
            <td><span class="priority-badge priority-${task.priority}">${task.priority}</span></td>
            <td><span class="tag-badge">${task.tag}</span></td> 
            <td>${task.startDate}</td>
            <td>${task.endDate || "--"}</td>
            <td>${task.timeTaken || "00:00:00"}</td>
            <td>
                <button class="action-btn more-btn" onclick="showDetailsModal('${task.id}')">More</button>
            </td>  
        `;

        completedTableBody.appendChild(row);
    });
}


function showDetailsModal(taskId){
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
                    <p><strong>Priority:</strong> <span class="priority-badge priority-${task.priority}">${task.priority}</span></p>
                    <p><strong>Tag:</strong> <span class="tag-badge">${task.tag}</span></p>
                    <p><strong>Status:</strong> <span class="status-badge status-${task.status}">${task.status}</span></p>
                    <p><strong>Start Date:</strong> ${task.startDate}</p>
                    <p><strong>End Date:</strong> ${task.endDate || "--"}</p>
                    <p><strong>Target Date:</strong> ${task.targetDate || "--"}</p>
                    <p><strong>Total Time Taken:</strong> ${task.timeTaken || "00:00:00"}</p>
                    <p><strong>Description:</strong> ${task.details || "No description"}</p>

                    <h3>Time Details</h3>
                    <div class="time-fragments">
                        ${(task.timeFragments || []).map(f => `
                            <div class="time-fragment">
                                <p>${f.date}: ${f.duration}</p>
                            </div>
                        `).join("")}
                    </div>
                    
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
        // Update existing modal
        detailsContainer.innerHTML = `
            <span class="close">&times;</span>
            <h2>${task.name}</h2>
            <div class="task-details">
                <p><strong>Priority:</strong> <span class="priority-badge priority-${task.priority}">${task.priority}</span></p>
                <p><strong>Tag:</strong> <span class="tag-badge">${task.tag}</span></p>
                <p><strong>Status:</strong> <span class="status-badge status-${task.status}">${task.status}</span></p>
                <p><strong>Start Date:</strong> ${task.startDate}</p>
                <p><strong>End Date:</strong> ${task.endDate || "--"}</p>
                <p><strong>Target Date:</strong> ${task.targetDate || "--"}</p>
                <p><strong>Total Time Taken:</strong> ${task.timeTaken || "00:00:00"}</p>
                <p><strong>Description:</strong> ${task.details || "No description"}</p>

                <h3>Time Details</h3>
                <div class="time-fragments">
                    ${(task.timeFragments || []).map(f => `
                        <div class="time-fragment">
                            <p>${f.date}: ${f.duration}</p>
                        </div>
                    `).join("")}
                </div>
                
                <div class="action-buttons">
                    ${task.status === "paused" ? `<button class="btn-primary" onclick="resumeTask('${task.id}')">Resume Task</button>` : ''}
                    <button class="btn-secondary" onclick="editTask('${task.id}')">Edit Task</button>
                    ${task.status !== "completed" ? `<button class="btn-success" onclick="completeTask('${task.id}')">Complete Task</button>` : ''}
                    <button class="btn-danger" onclick="deleteTask('${task.id}')">Delete Task</button>
                </div>
            </div>
        `;
        
     
        taskDetailsModal.querySelector(".close").addEventListener("click", () => {
            taskDetailsModal.style.display = "none";
        });
        
        taskDetailsModal.style.display = "flex";
    }
}


function editTask(taskId) {
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


function updateTaskData(taskId, editForm){
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
    renderTaskLists();
}


function renderAnalytics() {
    const analyticsContainer = document.getElementById('analytics-container');
    if (!analyticsContainer) return;
    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Clear previous charts
    analyticsContainer.innerHTML = `
        <div class="analytics-row">
            <div class="analytics-card">
                <h3>Task Status</h3>
                <canvas id="statusChart"></canvas>
            </div>
            <div class="analytics-card">
                <h3>Task Priorities</h3>
                <canvas id="priorityChart"></canvas>
            </div>
        </div>
        <div class="analytics-row">
            <div class="analytics-card">
                <h3>Tasks by Tag</h3>
                <canvas id="tagChart"></canvas>
            </div>
            <div class="analytics-card">
                <h3>Time Spent</h3>
                <canvas id="timeChart"></canvas>
            </div>
        </div>
    `;
    
    // Status chart data
    const statusCounts = {
        ongoing: tasks.filter(t => t.status === 'ongoing').length,
        paused: tasks.filter(t => t.status === 'paused').length,
        completed: tasks.filter(t => t.status === 'completed').length
    };
    
    // Priority chart data
    const priorityCounts = {
        high: tasks.filter(t => t.priority === 'high').length,
        medium: tasks.filter(t => t.priority === 'medium').length,
        low: tasks.filter(t => t.priority === 'low').length
    };
    
    // Tag chart data
    // Tag chart data
    const tagCounts = {};
    tasks.forEach(task => {
        if (task.tag) {
            tagCounts[task.tag] = (tagCounts[task.tag] || 0) + 1;
        }
    });
    
    // Time chart data - calculate time spent on each tag
    const tagTimeSpent = {};
    tasks.forEach(task => {
        if (task.tag && task.timeTaken) {
            // Convert time string to seconds for calculation
            const [hours, minutes, seconds] = task.timeTaken.split(':').map(Number);
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            
            tagTimeSpent[task.tag] = (tagTimeSpent[task.tag] || 0) + totalSeconds;
        }
    });
    
    // Convert seconds back to hours for display
    Object.keys(tagTimeSpent).forEach(tag => {
        const hours = Math.floor(tagTimeSpent[tag] / 3600);
        tagTimeSpent[tag] = parseFloat((tagTimeSpent[tag] / 3600).toFixed(2)); // Convert to hours with 2 decimal places
    });
    
    // Create Status Chart
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    new Chart(statusCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(statusCounts),
            datasets: [{
                data: Object.values(statusCounts),
                backgroundColor: ['#4CAF50', '#FFC107', '#2196F3'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    
    // Create Priority Chart
    const priorityCtx = document.getElementById('priorityChart').getContext('2d');
    new Chart(priorityCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(priorityCounts),
            datasets: [{
                data: Object.values(priorityCounts),
                backgroundColor: ['#F44336', '#FF9800', '#8BC34A'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    
    // Create Tag Chart
    const tagCtx = document.getElementById('tagChart').getContext('2d');
    new Chart(tagCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(tagCounts),
            datasets: [{
                label: 'Number of Tasks',
                data: Object.values(tagCounts),
                backgroundColor: '#3F51B5',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
    
    // Create Time Chart
    const timeCtx = document.getElementById('timeChart').getContext('2d');
    new Chart(timeCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(tagTimeSpent),
            datasets: [{
                label: 'Hours Spent',
                data: Object.values(tagTimeSpent),
                backgroundColor: '#009688',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Timer functions
function timerStart() {
    if (timer) return;
    
    timer = setInterval(updateTimer, 1000);
    startTimerBtn.disabled = true;
    pauseTimerBtn.disabled = false;
    endTimerBtn.disabled = false;
}

function timerPause() {
    clearInterval(timer);
    timer = null;
    
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    endTimerBtn.disabled = false;
}

function timerEnd() {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerDisplay.textContent = "00:00:00";
    
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    endTimerBtn.disabled = true;
}

function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    timerDisplay.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Event listeners for timer buttons
if (startTimerBtn) {
    startTimerBtn.addEventListener('click', () => {
        const activeTaskId = localStorage.getItem("activeTaskId");
        if (activeTaskId) {
            timerStart();
        } else {
            alert("No active task to start timer for!");
        }
    });
}

if (pauseTimerBtn) {
    pauseTimerBtn.addEventListener('click', () => {
        pauseCurrentTask();
    });
}

if (endTimerBtn) {
    endTimerBtn.addEventListener('click', () => {
        completeCurrentTask();
    });
}

function initApp() {
   
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (activeTaskId) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const activeTask = tasks.find(t => t.id === activeTaskId);
        
        if (activeTask) {
            setOngoingTask(activeTask);
            timerStart();
        } else {
            localStorage.removeItem("activeTaskId");
            clearOngoingTaskDisplay();
        }
    } else {
        clearOngoingTaskDisplay();
    }
    
    updateTaskCounters();
    renderTaskLists();
    

    window.onclick = function(event) {
        const modals = document.getElementsByClassName('modal');
        for (let i = 0; i < modals.length; i++) {
            if (event.target === modals[i]) {
                modals[i].style.display = "none";
            }
        }
    };
    
    window.showDetailsModal = showDetailsModal;
    window.resumeTask = resumeTask;
    window.editTask = editTask;
    window.completeTask = completeTask;
    window.deleteTask = deleteTask;
}

function initializeAnalytics() {
    const analyticsContainer = document.querySelector('.analytics-container');
    
    // Create a better structured layout for analytics    // Make functions available globally

    analyticsContainer.innerHTML = `
        <div class="analytics-row">
            <div class="analytics-card">
                <h3>Task Status Distribution</h3>
                <canvas id="statusChart"></canvas>
            </div>
            <div class="analytics-card">
                <h3>Tasks by Priority</h3>
                <canvas id="priorityChart"></canvas>
            </div>
        </div>
        <div class="analytics-row">
            <div class="analytics-card">
                <h3>Tasks by Tag</h3>
                <canvas id="tagChart"></canvas>
            </div>
            <div class="analytics-card">
                <h3>Time Spent (Hours)</h3>
                <canvas id="timeChart"></canvas>
            </div>
        </div>
    `;
    // Get all tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Initialize charts
    createStatusChart(tasks);
    createPriorityChart(tasks);
    createTagChart(tasks);
    createTimeChart(tasks);
}

function createStatusChart(tasks) {
    const statusCounts = {
        'ongoing': 0,
        'paused': 0,
        'completed': 0
    };
    
    tasks.forEach(task => {
        statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
    });
    
    const ctx = document.getElementById('statusChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Ongoing', 'Paused', 'Completed'],
            datasets: [{
                data: [statusCounts.ongoing, statusCounts.paused, statusCounts.completed],
                backgroundColor: [
                    'rgba(58, 110, 165, 0.7)',
                    'rgba(255, 159, 28, 0.7)',
                    'rgba(40, 167, 69, 0.7)'
                ],
                borderColor: [
                    'rgb(58, 110, 165)',
                    'rgb(255, 159, 28)',
                    'rgb(40, 167, 69)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function createPriorityChart(tasks) {
    const priorityCounts = {
        'high': 0,
        'medium': 0,
        'low': 0
    };
    
    tasks.forEach(task => {
        priorityCounts[task.priority] = (priorityCounts[task.priority] || 0) + 1;
    });
    
    const ctx = document.getElementById('priorityChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['High', 'Medium', 'Low'],
            datasets: [{
                label: 'Number of Tasks',
                data: [priorityCounts.high, priorityCounts.medium, priorityCounts.low],
                backgroundColor: [
                    'rgba(220, 53, 69, 0.7)',
                    'rgba(255, 193, 7, 0.7)',
                    'rgba(40, 167, 69, 0.7)'
                ],
                borderColor: [
                    'rgb(220, 53, 69)',
                    'rgb(255, 193, 7)',
                    'rgb(40, 167, 69)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function createTagChart(tasks) {
    // Extract all unique tags
    const tagCounts = {};
    
    tasks.forEach(task => {
        if (task.tags && task.tags.length) {
            task.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        }
    });
    
    // Sort tags by count
    const sortedTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5); // Show top 5 tags
    
    const labels = sortedTags.map(item => item[0]);
    const data = sortedTags.map(item => item[1]);
    
    // Generate colors
    const backgroundColors = labels.map((_, i) => 
        `hsla(${(i * 50) % 360}, 70%, 60%, 0.7)`
    );
    const borderColors = labels.map((_, i) => 
        `hsla(${(i * 50) % 360}, 70%, 50%, 1)`
    );
    
    const ctx = document.getElementById('tagChart').getContext('2d');
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw} tasks`;
                        }
                    }
                }
            }
        }
    });
}

function createTimeChart(tasks) {

    const dates = [];
    const timeSpent = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        dates.push(dateStr.substring(5)); 
        
        const dayTotal = tasks.reduce((total, task) => {
            const taskDate = task.timeSpent && task.timeSpent[dateStr];
            return total + (taskDate || 0);
        }, 0);
        
        timeSpent.push(dayTotal / 60); 
    }
    
    const ctx = document.getElementById('timeChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Hours',
                data: timeSpent,
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.3,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Hours'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1);
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date (MM-DD)'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Time spent: ${context.raw.toFixed(2)} hours`;
                        }
                    }
                }
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const analyticsTab = document.querySelector('a[href="#analytics"]');
    if (analyticsTab) {
        analyticsTab.addEventListener('click', () => {
          
            setTimeout(initializeAnalytics, 100); 
        });
    }
    
  
    if (window.location.hash === '#analytics') {
        setTimeout(initializeAnalytics, 100);
    }
    
  
    window.addEventListener('resize', () => {
        if (window.location.hash === '#analytics') {
            setTimeout(initializeAnalytics, 200);
        }
    });
});


document.addEventListener('DOMContentLoaded', initApp);


// console.log("JS is runing");

const sidebar = document.querySelector('.sidebar-aside');
const toggleBtn = document.querySelector(".toggler");

// console.log("btn found", toggleBtn)

if(toggleBtn){
toggleBtn.addEventListener("click", () => {
//    sidebar.classList.toggle("collapse")
console.log("found")

 });
}else{
    console.log("not found");
}

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
const totalTimeElement = document.getElementById("time-total");
const ongoingCountElement = document.getElementById("ongoing-count");
const completedCountElement = document.getElementById("completed-count");
const pausedCountElement = document.getElementById("paused-count");

const timerDisplay = document.getElementById("timer");
const startTimerBtn = document.getElementById("startTimerBtn");
const pauseTimerBtn = document.getElementById("pauseTimerBtn");
const endTimerBtn = document.getElementById("endTimerBtn");

const navLinks = document.querySelectorAll('.nav-link[data-page]');
const pages = document.querySelectorAll('.page');
const applyFilterBtn = document.getElementById('applyFiltersBtn');


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
            setTimeout(initializeAnalytics, 100); 
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
    renderPausedTaskTable();
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
        renderPausedTaskTable();
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
        renderPausedTaskTable();
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
    renderPausedTaskTable();
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
        renderPausedTaskTable();
    }
}


function deleteTask(taskId){
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


    // console.log(tasks);
    // if(tasks.length > 0){
    //     console.log(typeof tasks[0].duration, tasks[0].duration);
    // }

    const timerStack = [];
    let totalTime = 0;
    const totalCount = tasks.length;
    const pausedCount = tasks.filter(t => t.status === "paused").length;
    const completedCount = tasks.filter(t => t.status === "completed").length;

    for(let i = 0; i < totalCount; i++){
        timerStack.push(tasks[i].timeTaken);
    }

    for(let i = 0; i< timerStack.length; i++){
        totalTime += timeStringSpliting(timerStack[i]);
    }

    if(totalTime > 0){
        totalTimeElement.textContent = formatTimeToSeconds(totalTime);
    }

    if (totalCountElement) totalCountElement.textContent = totalCount;
    if (completedCountElement) completedCountElement.textContent = completedCount;
    if (pausedCountElement) pausedCountElement.textContent = pausedCount;
}


// function renderPausedTaskTable(){
//     renderPausedTaskTable();
// }

function timeStringSpliting(time){
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
}

function formatTimeToSeconds(time){
  
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

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
        
            <td>${task.name}</td>
            <td><span class="priority-badge priority-${task.priority}">${task.priority}</span></td>
            <td><span class="tag-badge">${task.tag}</span></td> 
            <td>${task.startDate}</td>
            <td>${task.targetDate || "--"}</td>
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

    completedTasks.forEach(task => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${task.name}</td>
            <td><span class="priority-badge priority-${task.priority}">${task.priority}</span></td>
            <td><span class="tag-badge">${task.tag}</span></td> 
            <td>${task.startDate}</td>
            <td>${task.targetDate}</td>
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
    renderPausedTaskTable();
}

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
    renderPausedTaskTable();
    

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
    

    analyticsContainer.innerHTML = `
        <div class="analytics-row">
            <div class="analytics-card">
                <h3>Task Status Distribution</h3>
                <canvas id="statusChart"></canvas>
            </div>
            <div class="analytics-card">
                <h3>Time Spent (Hours)</h3>
                <canvas id="timeChart"></canvas>
            </div>
        </div>
    `;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    


    // createStatusChart(tasks);
   
    createTimeChart(tasks);
}

// function createStatusChart(tasks) {
//     const statusCounts = {
//         'ongoing': 0,
//         'paused': 0,
//         'completed': 0
//     };
    
//     tasks.forEach(task => {
//         statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
//     });
    
//     const ctx = document.getElementById('statusChart').getContext('2d');
//     new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             labels: ['Ongoing', 'Paused', 'Completed'],
//             datasets: [{
//                 data: [statusCounts.ongoing, statusCounts.paused, statusCounts.completed],
//                 backgroundColor: [
//                     'rgba(58, 110, 165, 0.7)',
//                     'rgba(255, 159, 28, 0.7)',
//                     'rgba(40, 167, 69, 0.7)'
//                 ],
//                 borderColor: [
//                     'rgb(58, 110, 165)',
//                     'rgb(255, 159, 28)',
//                     'rgb(40, 167, 69)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     position: 'bottom',
//                 },
//                 tooltip: {
//                     callbacks: {
//                         label: function(context) {
//                             const label = context.label || '';
//                             const value = context.raw || 0;
//                             const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
//                             const percentage = Math.round((value / total) * 100);
//                             return `${label}: ${value} (${percentage}%)`;
//                         }
//                     }
//                 }
//             }
//         }
//     });
// }

function createTimeChart(tasks) { 

    const dates = [];
    const timeSpent = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        dates.push(dateStr.substring(5)); 

        let dayTotalSeconds = 0;
        
        // const dayTotal = tasks.reduce((total, task) => {
        //     const taskDate = task.timeTaken && task.timeTaken[dateStr];
        //     return total + (taskDate || 0);
        // }, 0);

        tasks.forEach(task => {
            if(task.timeFragments && Array.isArray(task.timeFragments)){
                task.timeFragments.forEach(fragment => {
                    if(fragment.date === dateStr && fragment.duration){
                        // const [h, m, s] = fragment.duration.split(":").map(Number);

                        const parts = fragment.duration.split(":").map(Number);
                        const h = parts[0] || 0;
                        const m = parts[1] || 0;
                        const s = parts[2] || 0;

                        dayTotalSeconds += h * 3600 + m * 60 + s;
                    }
                });
            } 
        });
        
        // timeSpent.push(parseFloat(dayTotalSeconds / 3600).toFixed(2)); 
        // timeSpent.push(Number((dayTotalSeconds / 3600).toFixed(2)));
        timeSpent.push(dayTotalSeconds);
    }
    const maxTime = Math.max(...timeSpent);
    const roundedMax = Math.ceil(maxTime / 60) * 60 || 60;

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
                    min: 0,
                    max: roundedMax,
                    title: {
                        display: true,
                        text: 'seconds'
                    },
                    ticks: {
                        callback: function(value) {
                            // return value.toFixed(1);
                            return value + ' sec';
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
                            const totalSeconds = context.raw;
                            const min = Math.floor(totalSeconds / 60);
                            const sec = totalSeconds % 60;
                            // return `Time spent: ${context.raw.toFixed(2)} hours`;
                            return `Time spent: ${min}m ${sec}s`;
                        }
                    } 
                }
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {

    const analyticsTab = document.querySelector('.nav-link[data-page="#analytics"]');
    if (analyticsTab) {
        analyticsTab.addEventListener('click', () => {
          
            setTimeout(initializeAnalytics, 100); 
        });
    }
    
    if (window.location.hash === '#analytics') {
        setTimeout(initializeAnalytics, 100);
    }
    
  
    window.addEventListener('resize', () => {
        const activePage = document.querySelector('.page.active');
        if(activePage && activePage.id === 'analytics-page'){
            setTimeout(initializeAnalytics, 200);
        }
    });

});


document.addEventListener('DOMContentLoaded', initApp);
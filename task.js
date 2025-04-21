

const addNew = document.getElementById("addTaskBtn");
const moreBtn = document.getElementById("moreBtn");
const taskOptions = document.getElementById("taskOptions");
const pauseTaskBtn = document.getElementById("pauseTaskBtn");
const completeTaskBtn = document.getElementById("completeTaskBtn");
const editTaskBtn = document.getElementById("editTaskBtn");
const viewDetailsBtn = document.getElementById("viewDetailsBtn");
// const closeModalBtn = document.getElementById(".close");
const closeModalBtn = document.querySelectorAll(".close")
const taskDetailsModal = document.getElementById("taskDetailsModal");


const totalCountElement = document.getElementById("total-count");
const ongoingCountElement = document.getElementById("ongoing-count");
const completedCountElement = document.getElementById("completed-count");
const timeTotalElement = document.getElementById("time-total");


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
            }else{
                page.classList.remove('active');
            }
        });


        if(targetPage === 'works-done'){
            renderCompletedTaskTable();
        }else if(targetPage === 'analytics'){
            renderAnalytics();
        }
    });
});




addNew.addEventListener("click", () => {
    addNewTaskForm();
});


moreBtn.addEventListener("click", () => {
    taskOptions.style.display = "flex";
});


// closeModalBtn.addEventListener("click", () => {
//     taskOptions.style.display = "none";
// });

closeModalBtn.forEach(closeBtn => {
    closeBtn.addEventListener('click', () =>{
        closeBtn.closest('.modal').style.display = 'none';
    });
});

pauseTaskBtn.addEventListener("click", () => {
    pauseCurrentTask();
    taskOptions.style.display = "none";
});

completeTaskBtn.addEventListener("click", () => {
    completeCurrentTask();
    taskOptions.style.display = "none";
});

editTaskBtn.addEventListener("click", () => {
    const activeTaskId = localStorage.getItem("activeTaskId");
    if(activeTaskId){
        editTask(activeTaskId);
    }
    taskOptions.style.display = "none";
});

viewDetailsBtn.addEventListener("click", ()=>{
    const activeTaskId = localStorage.getItem("activeTaskId");
    if(activeTaskId){
        showDetailsModal(activeTaskId);
    }
    taskOptions.style.display = "none";
});



function updateTimerDisplay(){
    let hrs = hours < 10 ? "0" + hours : hours;
    let min = minutes < 10 ? "0" + minutes : minutes;
    let sec = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = `${hrs}:${min}:${sec}`;

}


function stopWatch(){
    seconds++;
    if(seconds === 60){
        seconds = 0;
        minutes++;
        if(minutes === 60){
            minutes = 0;
            hours++;
        }
    }
    updateTimerDisplay();
}


function timerStart(){
    const activeTaskId = localStorage.getItem("activeTaskId");

    if(!activeTaskId){
        alert("Please select or create a task first");
        return;
    }

    if(timer !== null){
        clearInterval(timer);
    }

    if(!localStorage.getItem("timerStartTime")){
        localStorage.setItem("timerStartTime", new Date().toISOString())
    }

    timer = setInterval(stopWatch, 1000);


    startTimerBtn.disabled = true;
    pauseTimerBtn.disabled = false;
    endTimerBtn.disabled = false;
}


function timerPause(){

    clearInterval(timer);
    timer = null;

    const activeTaskId = localStorage.getItem("activeTaskId");
    if(activeTaskId){
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const activeTask = tasks.find(t => t.id === activeTaskId);

        if(activeTask){
            saveTimerState(activeTask);
        }
    }

    localStorage.removeItem("timerStartTime");

    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;

}


function timerEnd() {
    clearInterval(timer);
    timer = null;
    
    localStorage.removeItem("timerStartTime");
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateTimerDisplay();
    
   
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    endTimerBtn.disabled = true;
}

function initializeTimer() {
    const activeTaskId = localStorage.getItem("activeTaskId");
    
    if (activeTaskId) {
        const timerStartTime = localStorage.getItem("timerStartTime");
        if (timerStartTime) {
           
            const startTime = new Date(timerStartTime);
            const now = new Date();
            const elapsedSeconds = Math.floor((now - startTime) / 1000);
      
            seconds = elapsedSeconds % 60;
            minutes = Math.floor(elapsedSeconds / 60) % 60;
            hours = Math.floor(elapsedSeconds / 3600);
            
            updateTimerDisplay();
            timerStart();
        }
        
       
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const activeTask = tasks.find(t => t.id === activeTaskId);
        if (activeTask) {
            setOngoingTask(activeTask);
        }
    } else {
        clearOngoingTaskDisplay();
    }
}

startTimerBtn.addEventListener("click", timerStart);
pauseTimerBtn.addEventListener("click", timerPause);
endTimerBtn.addEventListener("click", timerEnd);


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

                    <div class="form-group>
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
                         <textarea id="details" rows="3" placeholder="Enter task details..."></textarea>
                    </div>

                    <div class="form-actions">
                        <button type="button" id="addTaskBtnModal" class="btn-primary">Add Task</button>
                    </div>

                    </form>
                </div>

    `;


    document.body.appendChild(taskForm);
    taskForm.style.display = "block";

    taskForm.querySelector(".close").addEventListener("click", () => taskForm.remove());

    taskForm.querySelector("#addTaskBtnModal").addEventListener("click", () => {
        addNewTaskForm(taskForm);
        taskForm.remove();
    });
}


function addNewTask(taskForm){
    const taskName = taskForm.querySelector("#taskName").value;
    const priority = taskForm.querySelector("#priority").value;
    const tag = taskForm.querySelector("#tag").value;
    const startDate = taskForm.querySelector('#startDate').value;
    const status = taskForm.querySelector("#status").value;
    const targetTime = taskForm.querySelector("#targetDate").value;
    const details = taskForm.querySelector("#details").value;

    if(!taskName || !tag){
        alert("Please fill out all required fields");
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
        targetTime,
        details,
        timeFragments: [],
        timeTaken: "00:00:00"
    };


    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


    const ongoingTask = tasks.find(t => t.status === "ongoing");
    if(ongoingTask && status === "ongoing"){
        ongoingTask.status = "paused"
        saveTimerState(ongoingTask);
        localStorage.removeItem("activeTaskId");
    }

    if(status === "ongoing"){
        localStorage.setItem("activeTaskId", taskId);
        resetTimer();
    }

    // task.status = status;
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    if(status === "ongoing"){
        setOngoingTask(task);
    }

    updateTaskCounters();
    renderTaskLists();
}


function saveTimerState(task){

    // const timerValue = document.getElementById("timer").textContent;

    // const timeFragment = {
    //     date: new Date().toISOString().split('T')[0],
    //     start: localStorage.getItem("timerStartTime") || new Date().toISOString(),
    //     end: new Date().toISOString(),
    //     duration: timerValue
    // };


    const startTime = new Date(localStorage.getItem("timerStartTime"));
    const endTime = new Date();
    const elapsedMs = endTime - startTime;

    const totalSeconds = Math.floor(elapsedMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const timeFragment = {
        date: new Date().toISOString().split('T')[0],
        start: startTime.toISOString(),
        end: endTime.toISOString(),
        duration
    };

    if(!task.timeFragments){
        task.timeFragments = [];
    }

    task.timeFragments.push(timeFragment);


    if(!task.timeTaken || task.timeTaken === "00:00:00"){
        task.timeTaken = timerValue;
    }else{
        task.timeTaken = addTimes(task.timeTaken, timerValue);
    }


    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.findIndex(t => t.id === task.id);
    if(index >= 0){
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

    return `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`

}


function resetTimer(){

    // if(typeof timerEnd === 'function'){
    //     timerEnd();
    // }else{
    //     document.getElementById("timer").textContext = "00:00:00";
    // }

    clearInterval(timer);
    timer=null;
    seconds = 0; 
    minutes = 0;
    hours = 0;

    // timerDisplay.textContent = "00:00:00";
    updateTimerDisplay();

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


        // if(typeof timerPause === 'function'){
        //     timerPause();
        // }

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
        localStorage.setItem("task". JSON.stringify(tasks));

        // if(typeof timerEnd === 'function'){
        //     timerEnd();
        // }

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


        // if(typeof timerStart === 'function'){
        //     timerStart();
        // }


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
        task.endDate = new Date().toISOString.split("T")[0];
        localStorage.setItem("tasks". JSON.stringify(tasks));


        if(localStorage.getItem("activeTaskId") === taskId){
            localStorage.removeItem("activeTaskId");
            clearOngoingTaskDisplay();
            timerEnd();

            // if(typeof timerEnd === 'function'){
            //     timerEnd();
            // }
        }

        updateTaskCounters();
        renderTaskLists();
    }
}

function deleteTask(taskId){
    if(!confirm("Are you sure you want to delete this task?")) return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));


    if(localStorage.getItem("activeTaskId") === taskId){
        localStorage.removeItem("activeTaskId");
        clearOngoingTaskDisplay();
        timerEnd();
        // if(typeof timerEnd === 'function'){
        //     timerEnd();
        // }
    }

    updateTaskCounters();
    renderTaskLists();

}

function clearOngoingTaskDisplay(){

    document.getElementById("displayTaskName").textContent = " -- ";
    document.getElementById("displayTag").textContent = " -- ";
    document.getElementById("displayPriority").textContent = " -- ";
    document.getElementById("displayStartDate").textContent = " -- ";
    document.getElementById("displayStatus").textContent = " -- ";
    document.getElementById("displayTargetTime").textContent = " -- ";

    document.getElementById("activeTaskPanel").classList.add("hidden");
    document.getElementById("noActiveTaskPanel").classList.remove("hidden");

}

function setOngoingTask(task){
    document.getElementById("displayTaskName").textContent = task.name;
    document.getElementById("displayTag").textContent = task.tag;
    document.getElementById("displayPriority").textContent = task.priority;
    document.getElementById("displayStartDate").textContent = task.startDate;
    document.getElementById("displayStatus").textContent = task.status;
    document.getElementById("displayTargetTime").textContent = task.targetDate || " -- ";

    document.getElementById("activeTaskPanel").classList.remove("hidden");
    document.getElementById("noActiveTaskPanel").classList.add("hidden");
    
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
    const completedCount = tasks.filter(t => t.status === "completed").length;

    const totalTimeInHours = tasks.reduce((total, task) => {
        if(task.timeTaken){
            const [ hours, minutes, seconds ] = task.timeTaken.split(':').map(Number);
            return total + hours + (minutes / 60) + (seconds / 3600);
        }
        return total;
    }, 0);

    totalCountElement.textContent = totalCount;
    ongoingCountElement.textContent = ongoingCount;
    completedCountElement.textContent = completedCount;
    timeTotalElement.textContent = totalTimeInHours.toFixed(1)
}

function renderTaskLists(){
    renderTaskTable();
    renderPausedTaskTable();
}


function renderTaskTable(){
    const tableBody = document.getElementById('taskTableBody');
    if(!tableBody) return;
    
    tableBody.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${task.name}</td>
            <td>${task.priority}</td>
            <td>${task.tag}</td>
            <td>${task.startDate}</td>
            <td>${task.status}</td>
            <td>${task.endDate || "--"}</td>
            <td>${task.timeTaken || "00:00:00"}</td>
            <td><button onclick="showDetailsModal('${task.id}')">More</button></td>
        `;

        tableBody.appendChild(row);
    });
}


function renderPausedTaskTable(){
    const pausedTableBody = document.getElementById('pausedTaskTableBody');
    if(!pausedTableBody) return;

    pausedTableBody.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const pausedTasks = tasks.filter(t => t.status === "paused");


    pausedTasks.forEach((task, index) => {
        const row = document.createElement("tr");

        row.innerHTML =`
            <td>${task.id.slice(-4)}</td>
            <td>${task.name}</td>
            <td>${task.priority}</td>
            <td>${task.tag}</td> 
            <td>${task.status}</td>
            <td>${task.startDate}</td>
            <td>${task.endDate || "--"}</td>
            <td>${task.timeTaken || "00:00:00"}</td>
            <td>
                <button onclick="resumeTask('${task.id}')">Resume</button>
                <button onclick="showDetailsModal('${task.id}')">More</button>
            </td>  
        `;

        pausedTableBody.appendChild(row);
    });
}


function renderCompletedTaskTable() {
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
            <td>${task.priority}</td>
            <td>${task.tag}</td>
            <td>${task.startDate}</td>
            <td>${task.endDate || "--"}</td>
            <td>${task.timeTaken || "00:00:00"}</td>
            <td><button onclick="showDetailsModal('${task.id}')">Details</button></td>
        `;
        completedTableBody.appendChild(row);
    });
}


function showDetailsModal(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === taskId);

    if(!task) return;

    const detailsContainer = document.getElementById("taskDetailsContent");

    let timeFragmentsHtml = '';
    if (task.timeFragments && task.timeFragments.length > 0) {
        timeFragmentsHtml = task.timeFragments.map(f => `
            <div class="time-fragment">
                <p>${f.date}: ${f.duration}</p>
            </div>
        `).join("");
    } else {
        timeFragmentsHtml = '<p>No time records available</p>';
    }

    let actionsHtml = '';
    if (task.status === 'paused') {
        actionsHtml = `
            <div class="modal-actions">
                <button onclick="resumeTask('${task.id}')">Resume Task</button>
                <button onclick="editTask('${task.id}')">Edit Task</button>
                <button onclick="completeTask('${task.id}')">Complete Task</button>
                <button onclick="deleteTask('${task.id}')">Delete Task</button>
            </div>
        `;
    } else if (task.status === 'completed') {
        actionsHtml = `
            <div class="modal-actions">
                <button onclick="deleteTask('${task.id}')">Delete Record</button>
            </div>
        `;
    } else {
        actionsHtml = `
            <div class="modal-actions">
                <button onclick="editTask('${task.id}')">Edit Task</button>
                <button onclick="deleteTask('${task.id}')">Delete Task</button>
            </div>
        `;
    }

    detailsContainer.innerHTML = `
        <span class="close">&times;</span>
        <h2>${task.name}</h2>
        <p><strong>Priority:</strong> ${task.priority}</p>
        <p><strong>Tag:</strong> ${task.tag}</p>
        <p><strong>Status:</strong> ${task.status}</p>
        <p><strong>Start Date:</strong> ${task.startDate}</p>
        <p><strong>End Date:</strong> ${task.endDate || "--"}</p>
        <p><strong>Target Date:</strong> ${task.targetDate || "--"}</p>
        <p><strong>Total Time Taken:</strong> ${task.timeTaken || "00:00:00"}</p>
        <p><strong>Description:</strong> ${task.details || "No description provided"}</p>

        <h3>Time Details</h3>
        <div class="time-fragments">
            ${timeFragmentsHtml}
        </div>

        ${actionsHtml}
    `;

   
    detailsContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            taskDetailsModal.style.display = "none";
        });
    });



    taskDetailsModal.style.display = "block";
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
                    <input type="date" id="editTargetDate" value="${task.targetDate || ''}" required>
                </div>
                
                <div class="form-group">
                    <label for="editDetails">Details</label>
                    <textarea id="editDetails" rows="3">${task.details || ''}</textarea>
                </div>
                
                <div class="form-actions">
                    <button type="button" id="saveTaskBtn" class="btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(editForm);
    editForm.style.display = "block";

    editForm.querySelector(".close").addEventListener("click", () => editForm.remove());

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

        if(newStatus == "ongoing"){
            const previousOngoing = tasks.find(t => t.id !== taskId && t.status === "ongoing");
            if(previousOngoing){
                saveTimerState(previousOngoing);
                previousOngoing.status ="paused";
            }

            localStorage.setItem("activeTaskId", taskId);
            setOngoingTask(task);
            resetTimer();
            timerStart();

        }else if(newStatus === "completed" && !task.endDate){
            task.endDate = new Date().toISOString().split("T")[0];
        }
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskCounters();
    renderTaskLists();
}


startTimerBtn.addEventListener("click", timerStart);
pauseTimerBtn.addEventListener("click", timerPause);
endTimerBtn.addEventListener("click", timerEnd);

function renderAnalytics(){
    renderTagDistributionChart();
    renderPriorityDistributionChart();
}


// Analytics functionality (continued from previous code)
function renderTagDistributionChart() {
    const tagChartCanvas = document.getElementById('tagChart');
    if (!tagChartCanvas) return;
    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Count tasks by tag
    const tagCounts = {};
    tasks.forEach(task => {
        if (task.tag) {
            tagCounts[task.tag] = (tagCounts[task.tag] || 0) + 1;
        }
    });
    
    // Convert to arrays for chart
    const tags = Object.keys(tagCounts);
    const counts = Object.values(tagCounts);
    
    // Set up chart context
    const ctx = tagChartCanvas.getContext('2d');
    
    // Clear previous chart if any
    if (window.tagChart) {
        window.tagChart.destroy();
    }
    
    // Create chart
    window.tagChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: tags,
            datasets: [{
                label: 'Tasks by Tag',
                data: counts,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Task Distribution by Tag'
            }
        }
    });
}

function renderPriorityDistributionChart() {
    const priorityChartCanvas = document.getElementById('priorityChart');
    if (!priorityChartCanvas) return;
    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Count tasks by priority
    const priorityCounts = {
        'high': 0,
        'medium': 0,
        'low': 0
    };
    
    tasks.forEach(task => {
        if (task.priority && priorityCounts.hasOwnProperty(task.priority)) {
            priorityCounts[task.priority]++;
        }
    });
    
    // Set up chart context
    const ctx = priorityChartCanvas.getContext('2d');
    
    // Clear previous chart if any
    if (window.priorityChart) {
        window.priorityChart.destroy();
    }
    
    // Create chart
    window.priorityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['High', 'Medium', 'Low'],
            datasets: [{
                label: 'Tasks by Priority',
                data: [priorityCounts.high, priorityCounts.medium, priorityCounts.low],
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Task Distribution by Priority'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }]
            }
        }
    });
}

// Search and filter functionality
function setupSearch() {
    const searchInputDashboard = document.getElementById('searchTasksDashboard');
    const searchInputCompleted = document.getElementById('searchTasksCompleted');
    
    if (searchInputDashboard) {
        searchInputDashboard.addEventListener('input', () => {
            filterTasks('dashboard', searchInputDashboard.value);
        });
    }
    
    if (searchInputCompleted) {
        searchInputCompleted.addEventListener('input', () => {
            filterTasks('completed', searchInputCompleted.value);
        });
    }
    
    // Set up filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterType = btn.getAttribute('data-filter');
            const page = btn.closest('.page').id.replace('-page', '');
            
            // Remove active class from all buttons in the same group
            btn.parentElement.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Apply filter
            applyFilter(page, filterType);
        });
    });
    
    // Set up date range filters
    const dateFromInput = document.getElementById('filterDateFrom');
    const dateToInput = document.getElementById('filterDateTo');
    
    if (dateFromInput && dateToInput) {
        dateFromInput.addEventListener('change', () => {
            applyDateFilter();
        });
        
        dateToInput.addEventListener('change', () => {
            applyDateFilter();
        });
    }
}

function filterTasks(page, searchText) {
    const searchLower = searchText.toLowerCase();
    
    if (page === 'dashboard') {
        const rows = document.querySelectorAll('#taskTableBody tr, #pausedTaskTableBody tr');
        
        rows.forEach(row => {
            const taskName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const taskTag = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
            const taskPriority = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            
            if (taskName.includes(searchLower) || taskTag.includes(searchLower) || taskPriority.includes(searchLower)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    } else if (page === 'completed') {
        const rows = document.querySelectorAll('#completedTaskTableBody tr');
        
        rows.forEach(row => {
            const taskName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const taskTag = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
            const taskPriority = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            
            if (taskName.includes(searchLower) || taskTag.includes(searchLower) || taskPriority.includes(searchLower)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
}

function applyFilter(page, filterType) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    if (page === 'dashboard') {
        // Re-render task tables with filter
        if (filterType === 'all') {
            renderTaskLists();
        } else if (filterType === 'high' || filterType === 'medium' || filterType === 'low') {
            // Filter by priority
            renderFilteredTaskLists(task => task.priority === filterType);
        } else if (filterType === 'today') {
            // Filter by today's date
            const today = new Date().toISOString().split('T')[0];
            renderFilteredTaskLists(task => task.startDate === today);
        }
    } else if (page === 'works-done') {
        // Re-render completed task table with filter
        if (filterType === 'all') {
            renderCompletedTaskTable();
        } else if (filterType === 'high' || filterType === 'medium' || filterType === 'low') {
            // Filter by priority
            renderFilteredCompletedTasks(task => task.priority === filterType);
        } else if (filterType === 'last7days') {
            // Filter by last 7 days
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const dateString = sevenDaysAgo.toISOString().split('T')[0];
            
            renderFilteredCompletedTasks(task => task.endDate >= dateString);
        }
    }
}

function applyDateFilter() {
    const dateFrom = document.getElementById('filterDateFrom').value;
    const dateTo = document.getElementById('filterDateTo').value;
    
    if (!dateFrom && !dateTo) {
        // Reset to show all tasks
        renderCompletedTaskTable();
        return;
    }
    
    renderFilteredCompletedTasks(task => {
        if (dateFrom && task.endDate < dateFrom) return false;
        if (dateTo && task.endDate > dateTo) return false;
        return true;
    });
}

function renderFilteredTaskLists(filterFn) {
    // Filter and render ongoing tasks
    const taskTableBody = document.getElementById('taskTableBody');
    if (taskTableBody) {
        taskTableBody.innerHTML = "";
        
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const filteredTasks = tasks.filter(filterFn);
        
        filteredTasks.forEach((task, index) => {
            if (task.status === 'ongoing') {
                const row = document.createElement("tr");
                
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${task.name}</td>
                    <td>${task.priority}</td>
                    <td>${task.tag}</td>
                    <td>${task.startDate}</td>
                    <td>${task.status}</td>
                    <td>${task.endDate || "--"}</td>
                    <td>${task.timeTaken || "00:00:00"}</td>
                    <td><button onclick="showDetailsModal('${task.id}')">More</button></td>
                `;
                
                taskTableBody.appendChild(row);
            }
        });
    }
    
    // Filter and render paused tasks
    const pausedTableBody = document.getElementById('pausedTaskTableBody');
    if (pausedTableBody) {
        pausedTableBody.innerHTML = "";
        
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const filteredTasks = tasks.filter(t => t.status === "paused" && filterFn(t));
        
        filteredTasks.forEach((task, index) => {
            const row = document.createElement("tr");
            
            // Format the last 3 time fragments
            const timeFragmentsHtml = formatTimeFragment(task.timeFragments);
            
            row.innerHTML = `
                <td>${task.id.slice(-4)}</td>
                <td>${task.name}</td>
                <td>${task.priority}</td>
                <td>${task.tag}</td>
                <td>${task.status}</td>
                <td>${task.startDate}</td>
                <td>${task.endDate || "--"}</td>
                <td>${task.timeTaken || "00:00:00"}</td>
                <td>${timeFragmentsHtml}</td>
                <td>
                    <button onclick="resumeTask('${task.id}')">Resume</button>
                    <button onclick="showDetailsModal('${task.id}')">More</button>
                </td>
            `;
            
            pausedTableBody.appendChild(row);
        });
    }
}

function renderFilteredCompletedTasks(filterFn) {
    const completedTableBody = document.getElementById('completedTaskTableBody');
    if (!completedTableBody) return;
    
    completedTableBody.innerHTML = "";
    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filteredTasks = tasks.filter(t => t.status === "completed" && filterFn(t));
    
    filteredTasks.forEach((task, index) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${task.id.slice(-4)}</td>
            <td>${task.name}</td>
            <td>${task.priority}</td>
            <td>${task.tag}</td>
            <td>${task.startDate}</td>
            <td>${task.endDate || "--"}</td>
            <td>${task.timeTaken || "00:00:00"}</td>
            <td><button onclick="showDetailsModal('${task.id}')">Details</button></td>
        `;
        
        completedTableBody.appendChild(row);
    });
}

// Task export functionality for completed tasks
function setupExportButtons() {
    const exportCsvBtn = document.getElementById('exportCsv');
    const exportJsonBtn = document.getElementById('exportJson');
    
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            exportCompletedTasks('csv');
        });
    }
    
    if (exportJsonBtn) {
        exportJsonBtn.addEventListener('click', () => {
            exportCompletedTasks('json');
        });
    }
}

// Task reports and summary
function generateTaskSummary() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const summaryElement = document.getElementById('taskSummary');
    
    if (!summaryElement) return;
    
    // Count tasks by status
    const statusCounts = {
        ongoing: tasks.filter(t => t.status === "ongoing").length,
        paused: tasks.filter(t => t.status === "paused").length,
        completed: tasks.filter(t => t.status === "completed").length
    };
    
    // Calculate total time spent
    const totalSeconds = tasks.reduce((total, task) => {
        if (task.timeTaken) {
            const [hours, minutes, seconds] = task.timeTaken.split(':').map(Number);
            return total + (hours * 3600) + (minutes * 60) + seconds;
        }
        return total;
    }, 0);
    
    const totalHours = Math.floor(totalSeconds / 3600);
    const avgCompletionTime = statusCounts.completed > 0 ? (totalSeconds / statusCounts.completed / 3600).toFixed(2) : 0;
    
    // Generate summary HTML
    summaryElement.innerHTML = `
        <div class="summary-card">
            <h3>Task Summary</h3>
            <p><strong>Total Tasks:</strong> ${tasks.length}</p>
            <p><strong>Ongoing:</strong> ${statusCounts.ongoing}</p>
            <p><strong>Paused:</strong> ${statusCounts.paused}</p>
            <p><strong>Completed:</strong> ${statusCounts.completed}</p>
            <p><strong>Total Hours Spent:</strong> ${totalHours.toFixed(1)}</p>
            <p><strong>Average Completion Time:</strong> ${avgCompletionTime} hours</p>
        </div>
    `;
}

// Task statistics by day of week
function renderDailyActivityChart() {
    const activityChartCanvas = document.getElementById('activityChart');
    if (!activityChartCanvas) return;
    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Initialize days of week counters
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daysOfWeek = [0, 0, 0, 0, 0, 0, 0];
    
    // Count task creation by day of week
    tasks.forEach(task => {
        if (task.startDate) {
            const date = new Date(task.startDate);
            const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
            daysOfWeek[dayOfWeek]++;
        }
    });
    
    // Set up chart context
    const ctx = activityChartCanvas.getContext('2d');
    
    // Clear previous chart if any
    if (window.activityChart) {
        window.activityChart.destroy();
    }
    
    // Create chart
    window.activityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dayNames,
            datasets: [{
                label: 'Tasks Created',
                data: daysOfWeek,
                borderColor: '#4BC0C0',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Task Creation by Day of Week'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }]
            }
        }
    });
}

// Initialize application
function initializeApp() {
    // Initialize timer state
    initializeTimer();
    
    // Initial render of task lists
    renderTaskLists();
    
    // Update task counters
    updateTaskCounters();
    
    // Initialize search functionality
    setupSearch();
    
    
    // Generate task summary
    generateTaskSummary();
    
    // Initial render of default page
    navLinks[0].click();
    
    // Set up global event handlers for modals
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
        
        if (event.target.id === 'taskOptions') {
            taskOptions.style.display = "none";
        }
    });
}

// Global function definitions for HTML access
window.showDetailsModal = showDetailsModal;
window.resumeTask = resumeTask;
window.completeTask = completeTask;
window.editTask = editTask;
window.deleteTask = deleteTask;

// Start the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);
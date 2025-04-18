// Global variables for task management
const addNew = document.getElementById("addTaskBtn");
const moreBtn = document.getElementById("moreBtn");
const taskOptions = document.getElementById("taskOptions");
const pauseTaskBtn = document.getElementById("pauseTaskBtn");
const completeTaskBtn = document.getElementById("completeTaskBtn");
const editTaskBtn = document.getElementById("editTaskBtn");
const viewDetailsBtn = document.getElementById("viewDetailsBtn");
const closeModalBtn = document.querySelector(".close");

// Task counters
const totalCountElement = document.getElementById("total-count");
const ongoingCountElement = document.getElementById("ongoing-count");
const completedCountElement = document.getElementById("completed-count");

// Timer elements
let seconds = 0;
let minutes = 0;
let hours = 0;
let displayTime = document.getElementById("timer");
let startBtn = document.getElementById("startTimerBtn");
let pauseBtn = document.getElementById("pauseTimerBtn");
let endBtn = document.getElementById("endTimerBtn");
let timer = null;

// Initialize event listeners
addNew.addEventListener("click", () => {
    addNewTaskForm();
});

moreBtn.addEventListener("click", () => {
    // Only show options if there's an active task
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (activeTaskId) {
        taskOptions.style.display = "flex";
    } else {
        alert("No active task selected");
    }
});

closeModalBtn.addEventListener("click", () => {
    taskOptions.style.display = "none";
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
    if (activeTaskId) {
        editTask(activeTaskId);
    }
    taskOptions.style.display = "none";
});

viewDetailsBtn.addEventListener("click", () => {
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (activeTaskId) {
        showDetailsModal(activeTaskId);
    }
    taskOptions.style.display = "none";
});

// Timer functions
function updateTimerDisplay() {
    let hrs = hours < 10 ? "0" + hours : hours;
    let min = minutes < 10 ? "0" + minutes : minutes;
    let sec = seconds < 10 ? "0" + seconds : seconds;
    
    displayTime.innerHTML = `${hrs}:${min}:${sec}`;
}

function stopWatch() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    
    updateTimerDisplay();
}

function initializeTimer() {
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (!activeTaskId) {
        // No active task, ensure timer is reset
        seconds = 0;
        minutes = 0;
        hours = 0;
        updateTimerDisplay();
        return;
    }
    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const activeTask = tasks.find(t => t.id === activeTaskId && t.status === "ongoing");
    
    if (!activeTask) {
        // No valid active task, clear it
        localStorage.removeItem("activeTaskId");
        seconds = 0;
        minutes = 0;
        hours = 0;
        updateTimerDisplay();
        return;
    }
    
    const timerStartTime = localStorage.getItem("timerStartTime");
    if (timerStartTime) {
        // Calculate elapsed time since timer was started
        const startTime = new Date(timerStartTime);
        const now = new Date();
        const elapsedSeconds = Math.floor((now - startTime) / 1000);
        
        // Set timer values based on elapsed time only
        seconds = elapsedSeconds % 60;
        minutes = Math.floor(elapsedSeconds / 60) % 60;
        hours = Math.floor(elapsedSeconds / 3600);
        
        // Update display
        updateTimerDisplay();
        
        // Start timer automatically
        timerStart(false); // Don't reset the timer
    } else {
        // No existing timer running, start fresh
        seconds = 0;
        minutes = 0;
        hours = 0;
        updateTimerDisplay();
        localStorage.setItem("timerStartTime", new Date().toISOString());
        timerStart(false);
    }
}

function timerStart(resetStartTime = true) {
    // Only start if there's an active task
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (!activeTaskId) {
        alert("Please select or create a task first");
        return;
    }
    
    // Clear any existing timer
    if (timer !== null) {
        clearInterval(timer);
    }
    
    // Only set the timer start time if requested or it doesn't exist
    if (resetStartTime || !localStorage.getItem("timerStartTime")) {
        localStorage.setItem("timerStartTime", new Date().toISOString());
    }
    
    // Start the stopwatch
    timer = setInterval(stopWatch, 1000);
    
    // Update button states
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    endBtn.disabled = false;
}

function timerPause() {
    clearInterval(timer);
    
    // If there's an active task, pause it
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (activeTaskId) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const activeTask = tasks.find(t => t.id === activeTaskId);
        
        if (activeTask) {
            pauseCurrentTask();
        }
    }
    
    // Reset timer state
    localStorage.removeItem("timerStartTime");
    
    // Update button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    endBtn.disabled = true;
}

function timerEnd() {
    clearInterval(timer);
    timer = null;
    
    // Save the final timer state for the active task
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (activeTaskId) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const activeTask = tasks.find(t => t.id === activeTaskId);
        
        if (activeTask) {
            completeCurrentTask();
        }
    }
    
    // Reset timer state
    localStorage.removeItem("timerStartTime");
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateTimerDisplay();
    
    // Update button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    endBtn.disabled = true;
}

// Task management functions
function addNewTaskForm() {
    const taskForm = document.createElement("div");
    taskForm.classList.add("modal");

    taskForm.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>New Task</h2>

        <input type="text" id="taskName" placeholder="Task Name" required>

        <select id="priority">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>

        <input type="text" id="tag" placeholder="Tag" required>
        <input type="date" id="startDate" value="${new Date().toISOString().split('T')[0]}">

        <select id="status">
            <option value="ongoing" selected>Ongoing</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
        </select>

        <input type="date" id="targetTime" placeholder="Target Time" required>
        <input type="text" id="details" placeholder="Details" required>

        <button id="addTaskBtnModal">Add Task</button>
    </div>
    `;

    document.body.appendChild(taskForm);
    taskForm.style.display = "block";

    taskForm.querySelector(".close").onclick = () => taskForm.remove();

    taskForm.querySelector("#addTaskBtnModal").onclick = () => {
        addNewTask(taskForm);
        taskForm.remove();
    };
}

function addNewTask(taskForm) {
    const taskName = taskForm.querySelector("#taskName").value;
    const priority = taskForm.querySelector("#priority").value;
    const tag = taskForm.querySelector("#tag").value;
    const startDate = taskForm.querySelector("#startDate").value;
    const status = taskForm.querySelector("#status").value;
    const targetTime = taskForm.querySelector("#targetTime").value;
    const details = taskForm.querySelector("#details").value;

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

    // If there's an ongoing task and the new task is ongoing, pause the existing one
    if (status === "ongoing") {
        const ongoingTask = tasks.find(t => t.status === "ongoing");
        if (ongoingTask) {
            ongoingTask.status = "paused";
            // Save the current timer state as a time fragment
            saveTimerState(ongoingTask);
        }

        // Set this task as the active task
        localStorage.setItem("activeTaskId", taskId);
        // Reset timer
        resetTimer();
    }

    // Add the new task to the task list
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    if (status === "ongoing") {
        setOngoingTask(task);
    }
    
    updateTaskCounters();
    renderTaskLists();
    renderCalendar(); // Add calendar rendering
}

function saveTimerState(task) {
    // Get current timer values
    const timerValue = document.getElementById("timer").textContent;
    
    // Only save if timer is not at 00:00:00
    if (timerValue !== "00:00:00") {
        // Create a time fragment
        const timeFragment = {
            date: new Date().toISOString().split('T')[0],
            start: localStorage.getItem("timerStartTime") || new Date().toISOString(),
            end: new Date().toISOString(),
            duration: timerValue
        };
        
        if (!task.timeFragments) {
            task.timeFragments = [];
        }
        
        task.timeFragments.push(timeFragment);
        
        // Update total time taken
        if (!task.timeTaken || task.timeTaken === "00:00:00") {
            task.timeTaken = timerValue;
        } else {
            // Add time values
            task.timeTaken = addTimes(task.timeTaken, timerValue);
        }
    }
}

function addTimes(time1, time2) {
    // Parse times (format: "HH:MM:SS")
    const [hours1, minutes1, seconds1] = time1.split(':').map(Number);
    const [hours2, minutes2, seconds2] = time2.split(':').map(Number);
    
    // Calculate total seconds
    let totalSeconds = seconds1 + seconds2;
    let totalMinutes = minutes1 + minutes2 + Math.floor(totalSeconds / 60);
    totalSeconds %= 60;
    
    let totalHours = hours1 + hours2 + Math.floor(totalMinutes / 60);
    totalMinutes %= 60;
    
    // Format result
    return `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
}

function resetTimer() {
    // Reset timer to 00:00:00
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateTimerDisplay();
    
    // Clear existing timer
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
    
    // Update button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    endBtn.disabled = true;
    
    // Store start time
    localStorage.setItem("timerStartTime", new Date().toISOString());
}

function pauseCurrentTask() {
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (!activeTaskId) return;
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === activeTaskId);
    
    if (task) {
        // Save timer state
        saveTimerState(task);
        
        // Update task status
        task.status = "paused";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        // Pause timer
        clearInterval(timer);
        timer = null;
        localStorage.removeItem("timerStartTime");
        
        // Clear active task
        localStorage.removeItem("activeTaskId");
        clearOngoingTaskDisplay();
        
        // Update UI
        updateTaskCounters();
        renderTaskLists();
        renderCalendar(); // Update calendar
        
        // Update button states
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        endBtn.disabled = true;
    }
}

function completeCurrentTask() {
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (!activeTaskId) return;
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === activeTaskId);
    
    if (task) {
        // Save timer state
        saveTimerState(task);
        
        // Update task status
        task.status = "completed";
        task.endDate = new Date().toISOString().split("T")[0];
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        // Stop timer
        clearInterval(timer);
        timer = null;
        localStorage.removeItem("timerStartTime");
        seconds = 0;
        minutes = 0;
        hours = 0;
        updateTimerDisplay();
        
        // Clear active task
        localStorage.removeItem("activeTaskId");
        clearOngoingTaskDisplay();
        
        // Update UI
        updateTaskCounters();
        renderTaskLists();
        renderCalendar(); // Update calendar
        
        // Update button states
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        endBtn.disabled = true;
    }
}

function clearOngoingTaskDisplay() {
    document.getElementById("displayTaskName").textContent = " -- ";
    document.getElementById("displayTag").textContent = " -- ";
    document.getElementById("displayPriority").textContent = " -- ";
    document.getElementById("displayStartDate").textContent = " -- ";
    document.getElementById("displayStatus").textContent = "No Active Task";
    document.getElementById("displayTargetTime").textContent = " -- ";
}

function resumeTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // If there's an ongoing task, pause it first
    const ongoingTask = tasks.find(t => t.status === "ongoing");
    if (ongoingTask) {
        saveTimerState(ongoingTask);
        ongoingTask.status = "paused";
    }
    
    // Set the selected task to ongoing
    const taskToResume = tasks.find(t => t.id === taskId);
    if (taskToResume) {
        taskToResume.status = "ongoing";
        localStorage.setItem("activeTaskId", taskId);
        
        // Reset timer for the new task
        seconds = 0;
        minutes = 0;
        hours = 0;
        updateTimerDisplay();
        
        // Clear any existing timer
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
        
        // Store new start time and start timer
        localStorage.setItem("timerStartTime", new Date().toISOString());
        timer = setInterval(stopWatch, 1000);
        
        // Update button states
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        endBtn.disabled = false;
        
        // Update UI
        setOngoingTask(taskToResume);
    }
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskCounters();
    renderTaskLists();
    renderCalendar(); // Update calendar
}

function completeTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        // If this was the active task, save timer state
        if (localStorage.getItem("activeTaskId") === taskId) {
            saveTimerState(task);
            localStorage.removeItem("activeTaskId");
            clearOngoingTaskDisplay();
            
            // Stop timer
            clearInterval(timer);
            timer = null;
            localStorage.removeItem("timerStartTime");
            seconds = 0;
            minutes = 0;
            hours = 0;
            updateTimerDisplay();
            
            // Update button states
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            endBtn.disabled = true;
        }
        
        task.status = "completed";
        task.endDate = new Date().toISOString().split("T")[0];
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        // Update UI
        updateTaskCounters();
        renderTaskLists();
        renderCalendar(); // Update calendar
    }
}

function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    // If this was the active task, clear it
    if (localStorage.getItem("activeTaskId") === taskId) {
        localStorage.removeItem("activeTaskId");
        clearOngoingTaskDisplay();
        
        // Stop timer
        clearInterval(timer);
        timer = null;
        localStorage.removeItem("timerStartTime");
        seconds = 0;
        minutes = 0;
        hours = 0;
        updateTimerDisplay();
        
        // Update button states
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        endBtn.disabled = true;
    }
    
    // Update UI
    updateTaskCounters();
    renderTaskLists();
    renderCalendar(); // Update calendar
}

function setOngoingTask(task) {
    document.getElementById("displayTaskName").textContent = task.name;
    document.getElementById("displayTag").textContent = task.tag;
    document.getElementById("displayPriority").textContent = task.priority;
    document.getElementById("displayStartDate").textContent = task.startDate;
    document.getElementById("displayStatus").textContent = task.status;
    document.getElementById("displayTargetTime").textContent = task.targetTime;
}

function formatTimeFragment(fragments) {
    if (!Array.isArray(fragments) || fragments.length === 0) return "--";
    const lastThree = fragments.slice(-3);
    return lastThree.map(frag => `${frag.date}: ${frag.duration}`).join("<br>");
}

function updateTaskCounters() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    const totalCount = tasks.length;
    const ongoingCount = tasks.filter(t => t.status === "ongoing").length;
    const completedCount = tasks.filter(t => t.status === "completed").length;
    
    totalCountElement.textContent = totalCount;
    ongoingCountElement.textContent = ongoingCount;
    completedCountElement.textContent = completedCount;
}

function renderTaskLists() {
    renderTaskTable();
    renderPausedTaskTable();
}

function renderTaskTable() {
    const tableBody = document.getElementById('taskTableBody');
    if (!tableBody) return; // Make sure the table exists
    
    tableBody.innerHTML = "";
    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    tasks.forEach((task, index) => {
        const row = document.createElement("tr");
        row.classList.add(task.status); // Add status as class for styling
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${task.name}</td>
            <td>${task.priority}</td>
            <td>${task.tag}</td>
            <td>${task.startDate}</td>
            <td>${task.status}</td>
            <td>${task.endDate || "--"}</td>
            <td>${task.timeTaken || "00:00:00"}</td>
            <td>
                <button onclick="showDetailsModal('${task.id}')">Details</button>
                ${task.status === "paused" ? `<button onclick="resumeTask('${task.id}')">Resume</button>` : ""}
                ${task.status !== "completed" ? `<button onclick="completeTask('${task.id}')">Complete</button>` : ""}
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function renderPausedTaskTable() {
    const pausedTableBody = document.getElementById('pausedTaskTableBody');
    if (!pausedTableBody) return; // If the table doesn't exist yet
    
    pausedTableBody.innerHTML = "";
    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const pausedTasks = tasks.filter(t => t.status === "paused");
    
    pausedTasks.forEach((task, index) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${task.id.slice(-4)}</td>
            <td>${task.name}</td>
            <td>${task.priority}</td>
            <td>${task.tag}</td>
            <td>${task.startDate}</td>
            <td>${task.timeTaken || "00:00:00"}</td>
            <td>${formatTimeFragment(task.timeFragments)}</td>
            <td>
                <button onclick="resumeTask('${task.id}')">Resume</button>
                <button onclick="editTask('${task.id}')">Edit</button>
                <button onclick="completeTask('${task.id}')">Complete</button>
            </td>
        `;
        
        pausedTableBody.appendChild(row);
    });
}

// New Calendar functionality
function renderCalendar() {
    const calendarContainer = document.getElementById('calendar-container');
    if (!calendarContainer) return; // If the calendar container doesn't exist
    
    // Clear existing calendar
    calendarContainer.innerHTML = "";
    
    // Get current date
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Create calendar header
    const calendarHeader = document.createElement('div');
    calendarHeader.className = 'calendar-header';
    calendarHeader.innerHTML = `
        <h2>${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}</h2>
    `;
    calendarContainer.appendChild(calendarHeader);
    
    // Create weekday headers
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdayHeader = document.createElement('div');
    weekdayHeader.className = 'calendar-weekdays';
    
    weekdays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-weekday';
        dayElement.textContent = day;
        weekdayHeader.appendChild(dayElement);
    });
    
    calendarContainer.appendChild(weekdayHeader);
    
    // Create calendar grid
    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-grid';
    
    // Get first day of month and last day of month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Get all tasks
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Calculate task dates
    let taskDates = {};
    tasks.forEach(task => {
        const startDate = new Date(task.startDate);
        if (startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear) {
            const day = startDate.getDate();
            if (!taskDates[day]) taskDates[day] = [];
            taskDates[day].push(task);
        }
        
        // If the task has an end date and is completed
        if (task.endDate && task.status === "completed") {
            const endDate = new Date(task.endDate);
            if (endDate.getMonth() === currentMonth && endDate.getFullYear() === currentYear) {
                const day = endDate.getDate();
                if (!taskDates[day]) taskDates[day] = [];
                // Don't add duplicate tasks
                if (!taskDates[day].some(t => t.id === task.id)) {
                    taskDates[day].push(task);
                }
            }
        }
    });
    
    // Create empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Create cells for each day of the month
    for (let day = 1; day <= lastDate; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        
        // Highlight today
        if (day === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear()) {
            dayCell.classList.add('today');
        }
        
        // Add day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);
        
        // Add tasks for this day
        if (taskDates[day] && taskDates[day].length > 0) {
            const taskList = document.createElement('div');
            taskList.className = 'day-tasks';
            
            taskDates[day].forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.className = `task-item ${task.status}`;
                taskItem.textContent = task.name;
                taskItem.title = `${task.name} (${task.status})`;
                taskItem.addEventListener('click', () => showDetailsModal(task.id));
                taskList.appendChild(taskItem);
            });
            
            dayCell.appendChild(taskList);
        }
        
        calendarGrid.appendChild(dayCell);
    }
    
    calendarContainer.appendChild(calendarGrid);
}

function showDetailsModal(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) return;
    
    const modal = document.createElement("div");
    modal.classList.add("modal");
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${task.name}</h2>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Tag:</strong> ${task.tag}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <p><strong>Start Date:</strong> ${task.startDate}</p>
            <p><strong>End Date:</strong> ${task.endDate || "--"}</p>
            <p><strong>Target Date:</strong> ${task.targetTime}</p>
            <p><strong>Total Time Taken:</strong> ${task.timeTaken || "00:00:00"}</p>
            <p><strong>Details:</strong> ${task.details}</p>
            
            <h3>Time Fragments</h3>
            <div class="time-fragments">
                ${(task.timeFragments || []).map(f => `
                    <div class="time-fragment">
                        <p>${f.date}: ${f.duration}</p>
                    </div>
                `).join("")}
            </div>
            
            <div class="modal-actions">
                ${task.status === "paused" ? `<button onclick="resumeTask('${task.id}')">✅ Resume Task</button>` : ""}
                <button onclick="editTask('${task.id}')">📝 Edit Task</button>
                ${task.status !== "completed" ? `<button onclick="completeTask('${task.id}')">✔️ Complete Task</button>` : ""}
                <button onclick="deleteTask('${task.id}')">❌ Delete Task</button>
            </div>
        </div>
    `;
    
    modal.querySelector(".close").onclick = () => modal.remove();
    document.body.appendChild(modal);
}

function editTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) return;
    
    const modal = document.createElement("div");
    modal.classList.add("modal");
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Edit Task</h2>
            
            <input type="text" id="editTaskName" value="${task.name}" placeholder="Task Name" required>
            
            <select id="editPriority">
                <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
                <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
                <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
            </select>
            
            <input type="text" id="editTag" value="${task.tag}" placeholder="Tag" required>
            <input type="date" id="editStartDate" value="${task.startDate}">
            
            <select id="editStatus">
                <option value="ongoing" ${task.status === 'ongoing' ? 'selected' : ''}>Ongoing</option>
                <option value="paused" ${task.status === 'paused' ? 'selected' : ''}>Paused</option>
                <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
            </select>
            
            <input type="date" id="editTargetTime" value="${task.targetTime}" placeholder="Target Time" required>
            <input type="text" id="editDetails" value="${task.details}" placeholder="Details" required>
            
            <button id="updateTaskBtn">Update Task</button>
        </div>
    `;
    
    modal.querySelector(".close").onclick = () => modal.remove();
    
    modal.querySelector("#updateTaskBtn").onclick = () => {
        const name = modal.querySelector("#editTaskName").value;
        const priority = modal.querySelector("#editPriority").value;
        const tag = modal.querySelector("#editTag").value;
        const startDate = modal.querySelector("#editStartDate").value;
        const status = modal.querySelector("#editStatus").value;
        const targetTime = modal.querySelector("#editTargetTime").value;
        const details = modal.querySelector("#editDetails").value;
        
        // Update task
        task.name = name;
        task.priority = priority;
        task.tag = tag;
        task.startDate = startDate;
        
        // Handle status change
        const previousStatus = task.status;
        
        // If there's an ongoing task and this task is becoming ongoing, pause the current one
        if (status === "ongoing" && previousStatus !== "ongoing") {
            const ongoingTask = tasks.find(t => t.id !== taskId && t.status === "ongoing");
            if (ongoingTask) {
                saveTimerState(ongoingTask);
                ongoingTask.status = "paused";
            }
            
            // Set this task as active
            localStorage.setItem("activeTaskId", taskId);
            
            // Reset and start timer
            resetTimer();
            timerStart(true);
            
            // Update display
            setOngoingTask(task);
        } 
        // If this task was ongoing but is no longer
        else if (previousStatus === "ongoing" && status !== "ongoing") {
            // Save timer state
            saveTimerState(task);
            
            // Clear active task
            localStorage.removeItem("activeTaskId");
            clearOngoingTaskDisplay();
            
            // Stop timer
            clearInterval(timer);
            timer = null;
            localStorage.removeItem("timerStartTime");
            seconds = 0;
            minutes = 0;
            hours = 0;
            updateTimerDisplay();
            
            // Update button states
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            endBtn.disabled = true;
        }
        
        // Update status
        task.status = status;
        
        task.targetTime = targetTime;
        task.details = details;
        
        // If task becomes completed, set end date
        if (status === "completed" && !task.endDate) {
            task.endDate = new Date().toISOString().split("T")[0];
        }
        
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateTaskCounters();
        renderTaskLists();
        renderCalendar(); // Update calendar
        
        modal.remove();
    };
    
    document.body.appendChild(modal);
}

// Dashboard integration
function initializeDashboard() {
    // Create tabs for dashboard
    const dashboardContainer = document.getElementById('dashboard-container');
    if (!dashboardContainer) return;
    
    dashboardContainer.innerHTML = `
        <div class="dashboard-tabs">
            <button class="tab-btn active" data-tab="tasks">Tasks</button>
            <button class="tab-btn" data-tab="calendar">Calendar</button>
            <button class="tab-btn" data-tab="stats">Statistics</button>
        </div>
        
        <div class="tab-content" id="tasks-tab">
            <h2>All Tasks</h2>
            <div class="filter-options">
                <select id="statusFilter">
                    <option value="all">All Statuses</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                </select>
                <select id="priorityFilter">
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <input type="text" id="tagFilter" placeholder="Filter by tag...">
            </div>
            <table class="tasks-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Priority</th>
                        <th>Tag</th>
                        <th>Start Date</th>
                        <th>Status</th>
                        <th>End Date</th>
                        <th>Time Taken</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="taskTableBody"></tbody>
            </table>
        </div>
        
        <div class="tab-content" id="calendar-tab" style="display:none;">
            <h2>Task Calendar</h2>
            <div id="calendar-container"></div>
        </div>
        
        <div class="tab-content" id="stats-tab" style="display:none;">
            <h2>Task Statistics</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Tasks by Status</h3>
                    <div id="status-chart" class="chart"></div>
                </div>
                <div class="stat-card">
                    <h3>Tasks by Priority</h3>
                    <div id="priority-chart" class="chart"></div>
                </div>
                <div class="stat-card">
                    <h3>Time Spent per Task</h3>
                    <div id="time-chart" class="chart"></div>
                </div>
                <div class="stat-card">
                    <h3>Tasks by Tag</h3>
                    <div id="tag-chart" class="chart"></div>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners to tabs
    const tabButtons = dashboardContainer.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all tab content
            const tabContents = dashboardContainer.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.style.display = 'none');
            
            // Show selected tab content
            const tabName = button.getAttribute('data-tab');
            document.getElementById(`${tabName}-tab`).style.display = 'block';
            
            // Special handling for different tabs
            if (tabName === 'calendar') {
                renderCalendar();
            } else if (tabName === 'stats') {
                renderStatistics();
            }
        });
    });
    
    // Add event listeners to filters
    const statusFilter = document.getElementById('statusFilter');
    const priorityFilter = document.getElementById('priorityFilter');
    const tagFilter = document.getElementById('tagFilter');
    
    if (statusFilter && priorityFilter && tagFilter) {
        statusFilter.addEventListener('change', filterTasks);
        priorityFilter.addEventListener('change', filterTasks);
        tagFilter.addEventListener('input', filterTasks);
    }
    
    // Initialize everything
    renderTaskLists();
}

function filterTasks() {
    const statusFilter = document.getElementById('statusFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;
    const tagFilter = document.getElementById('tagFilter').value.toLowerCase();
    
    const tableBody = document.getElementById('taskTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = "";
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Apply filters
    tasks = tasks.filter(task => {
        const statusMatch = statusFilter === 'all' || task.status === statusFilter;
        const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
        const tagMatch = tagFilter === '' || task.tag.toLowerCase().includes(tagFilter);
        
        return statusMatch && priorityMatch && tagMatch;
    });
    
    // Render filtered tasks
    tasks.forEach((task, index) => {
        const row = document.createElement("tr");
        row.classList.add(task.status); // Add status as class for styling
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${task.name}</td>
            <td>${task.priority}</td>
            <td>${task.tag}</td>
            <td>${task.startDate}</td>
            <td>${task.status}</td>
            <td>${task.endDate || "--"}</td>
            <td>${task.timeTaken || "00:00:00"}</td>
            <td>
                <button onclick="showDetailsModal('${task.id}')">Details</button>
                ${task.status === "paused" ? `<button onclick="resumeTask('${task.id}')">Resume</button>` : ""}
                ${task.status !== "completed" ? `<button onclick="completeTask('${task.id}')">Complete</button>` : ""}
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function renderStatistics() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Calculate statistics
    const statusCounts = {
        ongoing: tasks.filter(t => t.status === "ongoing").length,
        paused: tasks.filter(t => t.status === "paused").length,
        completed: tasks.filter(t => t.status === "completed").length
    };
    
    const priorityCounts = {
        high: tasks.filter(t => t.priority === "high").length,
        medium: tasks.filter(t => t.priority === "medium").length,
        low: tasks.filter(t => t.priority === "low").length
    };
    
    // Get unique tags and count them
    const tagCounts = {};
    tasks.forEach(task => {
        if (!tagCounts[task.tag]) {
            tagCounts[task.tag] = 1;
        } else {
            tagCounts[task.tag]++;
        }
    });
    
    // Calculate time spent on each task
    const timePerTask = tasks.map(task => ({
        name: task.name,
        time: task.timeTaken || "00:00:00",
        // Convert time to minutes for charting
        minutes: convertTimeToMinutes(task.timeTaken || "00:00:00")
    })).sort((a, b) => b.minutes - a.minutes).slice(0, 10); // Top 10 tasks by time
    
    // Render charts (simplified representation)
    renderSimpleBarChart('status-chart', Object.keys(statusCounts), Object.values(statusCounts), ['green', 'orange', 'blue']);
    renderSimpleBarChart('priority-chart', Object.keys(priorityCounts), Object.values(priorityCounts), ['red', 'orange', 'yellow']);
    renderSimpleBarChart('time-chart', timePerTask.map(t => t.name), timePerTask.map(t => t.minutes), ['blue']);
    renderSimpleBarChart('tag-chart', Object.keys(tagCounts), Object.values(tagCounts), ['purple']);
}

function convertTimeToMinutes(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 60 + minutes + seconds / 60;
}

function renderSimpleBarChart(containerId, labels, values, colors) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear container
    container.innerHTML = "";
    
    // Create simple bar chart
    const chart = document.createElement('div');
    chart.className = 'simple-bar-chart';
    
    // Find max value for scaling
    const maxValue = Math.max(...values, 1);
    
    // Create bars
    labels.forEach((label, index) => {
        const barContainer = document.createElement('div');
        barContainer.className = 'bar-container';
        
        const labelElement = document.createElement('div');
        labelElement.className = 'bar-label';
        labelElement.textContent = label;
        
        const barWrapper = document.createElement('div');
        barWrapper.className = 'bar-wrapper';
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.width = `${(values[index] / maxValue) * 100}%`;
        bar.style.backgroundColor = colors[index % colors.length];
        
        const valueLabel = document.createElement('span');
        valueLabel.className = 'value-label';
        valueLabel.textContent = values[index];
        
        barWrapper.appendChild(bar);
        barWrapper.appendChild(valueLabel);
        
        barContainer.appendChild(labelElement);
        barContainer.appendChild(barWrapper);
        
        chart.appendChild(barContainer);
    });
    
    container.appendChild(chart);
}

function addDashboardStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .dashboard-tabs {
            display: flex;
            margin-bottom: 20px;
            border-bottom: 1px solid #ddd;
        }
        
        .tab-btn {
            padding: 10px 20px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
            border-bottom: 3px solid transparent;
        }
        
        .tab-btn.active {
            border-bottom-color: #4CAF50;
            font-weight: bold;
        }
        
        .tab-content {
            padding: 20px 0;
        }
        
        .filter-options {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .tasks-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .tasks-table th, .tasks-table td {
            padding: 8px 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        .tasks-table th {
            background-color: #f5f5f5;
        }
        
        .tasks-table tr.ongoing {
            background-color: rgba(76, 175, 80, 0.1);
        }
        
        .tasks-table tr.paused {
            background-color: rgba(255, 152, 0, 0.1);
        }
        
        .tasks-table tr.completed {
            background-color: rgba(3, 155, 229, 0.1);
        }
        
        /* Calendar styles */
        .calendar-container {
            margin-top: 20px;
        }
        
        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .calendar-weekdays {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            text-align: center;
            font-weight: bold;
            background-color: #f5f5f5;
            border-bottom: 1px solid #ddd;
        }
        
        .calendar-weekday {
            padding: 10px;
        }
        
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            grid-gap: 1px;
            background-color: #ddd;
        }
        
        .calendar-day {
            min-height: 100px;
            background-color: white;
            padding: 5px;
            position: relative;
        }
        
        .calendar-day.empty {
            background-color: #f9f9f9;
        }
        
        .calendar-day.today {
            background-color: #f0f8ff;
        }
        
        .day-number {
            font-weight: bold;
            text-align: right;
            margin-bottom: 5px;
        }
        
        .day-tasks {
            display: flex;
            flex-direction: column;
            gap: 3px;
        }
        
        .task-item {
            font-size: 12px;
            padding: 2px 5px;
            border-radius: 3px;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .task-item.ongoing {
            background-color: rgba(76, 175, 80, 0.2);
        }
        
        .task-item.paused {
            background-color: rgba(255, 152, 0, 0.2);
        }
        
        .task-item.completed {
            background-color: rgba(3, 155, 229, 0.2);
            text-decoration: line-through;
        }
        
        /* Statistics styles */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
        
        .stat-card {
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            padding: 15px;
        }
        
        .simple-bar-chart {
            margin-top: 15px;
        }
        
        .bar-container {
            margin-bottom: 10px;
        }
        
        .bar-label {
            margin-bottom: 5px;
            font-size: 14px;
        }
        
        .bar-wrapper {
            height: 20px;
            background-color: #f5f5f5;
            position: relative;
            border-radius: 3px;
            overflow: hidden;
        }
        
        .bar {
            height: 100%;
            transition: width 0.5s ease;
        }
        
        .value-label {
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 12px;
            color: #333;
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize everything
window.addEventListener("DOMContentLoaded", () => {
    // Add styles for dashboard
    addDashboardStyles();
    
    // Setup event listeners for timer
    startBtn.addEventListener("click", timerStart);
    pauseBtn.disabled = true;
    pauseBtn.addEventListener("click", timerPause);
    endBtn.disabled = true;
    endBtn.addEventListener("click", timerEnd);
    
    // Initialize timer state
    initializeTimer();
    
    // Initialize dashboard
    initializeDashboard();
    
    // Restore active task if exists
    restoreActiveTask();
    
    // Update counters and render lists
    updateTaskCounters();
    renderTaskLists();
});


const sidebar = document.querySelector('.sidebar-aside');
const toggleBtn = document.querySelector(".toggler");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapse")
});


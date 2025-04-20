// // Global variables for task management
// const addNew = document.getElementById("addTaskBtn");
// const moreBtn = document.getElementById("moreBtn");
// const taskOptions = document.getElementById("taskOptions");
// const pauseTaskBtn = document.getElementById("pauseTaskBtn");
// const completeTaskBtn = document.getElementById("completeTaskBtn");
// const editTaskBtn = document.getElementById("editTaskBtn");
// const viewDetailsBtn = document.getElementById("viewDetailsBtn");
// const closeModalBtn = document.querySelector(".close");

// // Task counters
// const totalCountElement = document.getElementById("total-count");
// const ongoingCountElement = document.getElementById("ongoing-count");
// const completedCountElement = document.getElementById("completed-count");

// // Timer elements
// let seconds = 0;
// let minutes = 0;
// let hours = 0;
// let displayTime = document.getElementById("timer");
// let startBtn = document.getElementById("startTimerBtn");
// let pauseBtn = document.getElementById("pauseTimerBtn");
// let endBtn = document.getElementById("endTimerBtn");
// let timer = null;

// // Initialize event listeners
// addNew.addEventListener("click", () => {
//     addNewTaskForm();
// });

// moreBtn.addEventListener("click", () => {
//     // Only show options if there's an active task
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if (activeTaskId) {
//         taskOptions.style.display = "flex";
//     } else {
//         alert("No active task selected");
//     }
// });

// closeModalBtn.addEventListener("click", () => {
//     taskOptions.style.display = "none";
// });

// pauseTaskBtn.addEventListener("click", () => {
//     pauseCurrentTask();
//     taskOptions.style.display = "none";
// });

// completeTaskBtn.addEventListener("click", () => {
//     completeCurrentTask();
//     taskOptions.style.display = "none";
// });

// editTaskBtn.addEventListener("click", () => {
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if (activeTaskId) {
//         editTask(activeTaskId);
//     }
//     taskOptions.style.display = "none";
// });

// viewDetailsBtn.addEventListener("click", () => {
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if (activeTaskId) {
//         showDetailsModal(activeTaskId);
//     }
//     taskOptions.style.display = "none";
// });

// // Timer functions
// function updateTimerDisplay() {
//     let hrs = hours < 10 ? "0" + hours : hours;
//     let min = minutes < 10 ? "0" + minutes : minutes;
//     let sec = seconds < 10 ? "0" + seconds : seconds;
    
//     displayTime.innerHTML = `${hrs}:${min}:${sec}`;
// }

// function stopWatch() {
//     seconds++;
//     if (seconds === 60) {
//         seconds = 0;
//         minutes++;
//         if (minutes === 60) {
//             minutes = 0;
//             hours++;
//         }
//     }
    
//     updateTimerDisplay();
// }

// function initializeTimer() {
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if (!activeTaskId) {
//         // No active task, ensure timer is reset
//         seconds = 0;
//         minutes = 0;
//         hours = 0;
//         updateTimerDisplay();
//         return;
//     }
    
//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     const activeTask = tasks.find(t => t.id === activeTaskId && t.status === "ongoing");
    
//     if (!activeTask) {
//         // No valid active task, clear it
//         localStorage.removeItem("activeTaskId");
//         seconds = 0;
//         minutes = 0;
//         hours = 0;
//         updateTimerDisplay();
//         return;
//     }
    
//     const timerStartTime = localStorage.getItem("timerStartTime");
//     if (timerStartTime) {
//         // Calculate elapsed time since timer was started
//         const startTime = new Date(timerStartTime);
//         const now = new Date();
//         const elapsedSeconds = Math.floor((now - startTime) / 1000);
        
//         // Set timer values based on elapsed time only
//         seconds = elapsedSeconds % 60;
//         minutes = Math.floor(elapsedSeconds / 60) % 60;
//         hours = Math.floor(elapsedSeconds / 3600);
        
//         // Update display
//         updateTimerDisplay();
        
//         // Start timer automatically
//         timerStart(false); // Don't reset the timer
//     } else {
//         // No existing timer running, start fresh
//         seconds = 0;
//         minutes = 0;
//         hours = 0;
//         updateTimerDisplay();
//         localStorage.setItem("timerStartTime", new Date().toISOString());
//         timerStart(false);
//     }
// }

// function timerStart(resetStartTime = true) {
//     // Only start if there's an active task
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if (!activeTaskId) {
//         alert("Please select or create a task first");
//         return;
//     }
    
//     // Clear any existing timer
//     if (timer !== null) {
//         clearInterval(timer);
//     }
    
//     // Only set the timer start time if requested or it doesn't exist
//     if (resetStartTime || !localStorage.getItem("timerStartTime")) {
//         localStorage.setItem("timerStartTime", new Date().toISOString());
//     }
    
//     // Start the stopwatch
//     timer = setInterval(stopWatch, 1000);
    
//     // Update button states
//     startBtn.disabled = true;
//     pauseBtn.disabled = false;
//     endBtn.disabled = false;
// }

// function timerPause() {
//     clearInterval(timer);
    
//     // If there's an active task, pause it
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if (activeTaskId) {
//         const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//         const activeTask = tasks.find(t => t.id === activeTaskId);
        
//         if (activeTask) {
//             pauseCurrentTask();
//         }
//     }
    
//     // Reset timer state
//     localStorage.removeItem("timerStartTime");
    
//     // Update button states
//     startBtn.disabled = false;
//     pauseBtn.disabled = true;
//     endBtn.disabled = true;
// }

// function timerEnd() {
//     clearInterval(timer);
//     timer = null;
    
//     // Save the final timer state for the active task
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if (activeTaskId) {
//         const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//         const activeTask = tasks.find(t => t.id === activeTaskId);
        
//         if (activeTask) {
//             completeCurrentTask();
//         }
//     }
    
//     // Reset timer state
//     localStorage.removeItem("timerStartTime");
//     seconds = 0;
//     minutes = 0;
//     hours = 0;
//     updateTimerDisplay();
    
//     // Update button states
//     startBtn.disabled = false;
//     pauseBtn.disabled = true;
//     endBtn.disabled = true;
// }

// // Task management functions
// function addNewTaskForm() {
//     const taskForm = document.createElement("div");
//     taskForm.classList.add("modal");

//     taskForm.innerHTML = `
//     <div class="modal-content">
//         <span class="close">&times;</span>
//         <h2>New Task</h2>

//         <input type="text" id="taskName" placeholder="Task Name" required>

//         <select id="priority">
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="low">Low</option>
//         </select>

//         <input type="text" id="tag" placeholder="Tag" required>
//         <input type="date" id="startDate" value="${new Date().toISOString().split('T')[0]}">

//         <select id="status">
//             <option value="ongoing" selected>Ongoing</option>
//             <option value="paused">Paused</option>
//             <option value="completed">Completed</option>
//         </select>

//         <input type="date" id="targetTime" placeholder="Target Time" required>
//         <input type="text" id="details" placeholder="Details" required>

//         <button id="addTaskBtnModal">Add Task</button>
//     </div>
//     `;

//     document.body.appendChild(taskForm);
//     taskForm.style.display = "block";

//     taskForm.querySelector(".close").onclick = () => taskForm.remove();

//     taskForm.querySelector("#addTaskBtnModal").onclick = () => {
//         addNewTask(taskForm);
//         taskForm.remove();
//     };
// }

// function addNewTask(taskForm) {
//     const taskName = taskForm.querySelector("#taskName").value;
//     const priority = taskForm.querySelector("#priority").value;
//     const tag = taskForm.querySelector("#tag").value;
//     const startDate = taskForm.querySelector("#startDate").value;
//     const status = taskForm.querySelector("#status").value;
//     const targetTime = taskForm.querySelector("#targetTime").value;
//     const details = taskForm.querySelector("#details").value;

//     const taskId = Date.now().toString();

//     const task = {
//         id: taskId,
//         name: taskName,
//         tag,
//         priority,
//         startDate,
//         status,
//         targetTime,
//         details,
//         timeFragments: [],
//         timeTaken: "00:00:00"
//     };

//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//     // If there's an ongoing task and the new task is ongoing, pause the existing one
//     if (status === "ongoing") {
//         const ongoingTask = tasks.find(t => t.status === "ongoing");
//         if (ongoingTask) {
//             ongoingTask.status = "paused";
//             // Save the current timer state as a time fragment
//             saveTimerState(ongoingTask);
//         }

//         // Set this task as the active task
//         localStorage.setItem("activeTaskId", taskId);
//         // Reset timer
//         resetTimer();
//     }

//     // Add the new task to the task list
//     tasks.push(task);
//     localStorage.setItem("tasks", JSON.stringify(tasks));
    
//     if (status === "ongoing") {
//         setOngoingTask(task);
//     }
    
//     updateTaskCounters();
//     renderTaskLists();
//     renderCalendar(); // Add calendar rendering
// }

// function saveTimerState(task) {
//     // Get current timer values
//     const timerValue = document.getElementById("timer").textContent;
    
//     // Only save if timer is not at 00:00:00
//     if (timerValue !== "00:00:00") {
//         // Create a time fragment
//         const timeFragment = {
//             date: new Date().toISOString().split('T')[0],
//             start: localStorage.getItem("timerStartTime") || new Date().toISOString(),
//             end: new Date().toISOString(),
//             duration: timerValue
//         };
        
//         if (!task.timeFragments) {
//             task.timeFragments = [];
//         }
        
//         task.timeFragments.push(timeFragment);
        
//         // Update total time taken
//         if (!task.timeTaken || task.timeTaken === "00:00:00") {
//             task.timeTaken = timerValue;
//         } else {
//             // Add time values
//             task.timeTaken = addTimes(task.timeTaken, timerValue);
//         }
//     }
// }

// function addTimes(time1, time2) {
//     // Parse times (format: "HH:MM:SS")
//     const [hours1, minutes1, seconds1] = time1.split(':').map(Number);
//     const [hours2, minutes2, seconds2] = time2.split(':').map(Number);
    
//     // Calculate total seconds
//     let totalSeconds = seconds1 + seconds2;
//     let totalMinutes = minutes1 + minutes2 + Math.floor(totalSeconds / 60);
//     totalSeconds %= 60;
    
//     let totalHours = hours1 + hours2 + Math.floor(totalMinutes / 60);
//     totalMinutes %= 60;
    
//     // Format result
//     return `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
// }

// function resetTimer() {
//     // Reset timer to 00:00:00
//     seconds = 0;
//     minutes = 0;
//     hours = 0;
//     updateTimerDisplay();
    
//     // Clear existing timer
//     if (timer !== null) {
//         clearInterval(timer);
//         timer = null;
//     }
    
//     // Update button states
//     startBtn.disabled = false;
//     pauseBtn.disabled = true;
//     endBtn.disabled = true;
    
//     // Store start time
//     localStorage.setItem("timerStartTime", new Date().toISOString());
// }

// function pauseCurrentTask() {
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if (!activeTaskId) return;
    
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     const task = tasks.find(t => t.id === activeTaskId);
    
//     if (task) {
//         // Save timer state
//         saveTimerState(task);
        
//         // Update task status
//         task.status = "paused";
//         localStorage.setItem("tasks", JSON.stringify(tasks));
        
//         // Pause timer
//         clearInterval(timer);
//         timer = null;
//         localStorage.removeItem("timerStartTime");
        
//         // Clear active task
//         localStorage.removeItem("activeTaskId");
//         clearOngoingTaskDisplay();
        
//         // Update UI
//         updateTaskCounters();
//         renderTaskLists();
//         renderCalendar(); // Update calendar
        
//         // Update button states
//         startBtn.disabled = false;
//         pauseBtn.disabled = true;
//         endBtn.disabled = true;
//     }
// }

// function completeCurrentTask() {
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if (!activeTaskId) return;
    
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     const task = tasks.find(t => t.id === activeTaskId);
    
//     if (task) {
//         // Save timer state
//         saveTimerState(task);
        
//         // Update task status
//         task.status = "completed";
//         task.endDate = new Date().toISOString().split("T")[0];
//         localStorage.setItem("tasks", JSON.stringify(tasks));
        
//         // Stop timer
//         clearInterval(timer);
//         timer = null;
//         localStorage.removeItem("timerStartTime");
//         seconds = 0;
//         minutes = 0;
//         hours = 0;
//         updateTimerDisplay();
        
//         // Clear active task
//         localStorage.removeItem("activeTaskId");
//         clearOngoingTaskDisplay();
        
//         // Update UI
//         updateTaskCounters();
//         renderTaskLists();
//         renderCalendar(); // Update calendar
        
//         // Update button states
//         startBtn.disabled = false;
//         pauseBtn.disabled = true;
//         endBtn.disabled = true;
//     }
// }

// function clearOngoingTaskDisplay() {
//     document.getElementById("displayTaskName").textContent = " -- ";
//     document.getElementById("displayTag").textContent = " -- ";
//     document.getElementById("displayPriority").textContent = " -- ";
//     document.getElementById("displayStartDate").textContent = " -- ";
//     document.getElementById("displayStatus").textContent = "No Active Task";
//     document.getElementById("displayTargetTime").textContent = " -- ";
// }

// function resumeTask(taskId) {
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
//     // If there's an ongoing task, pause it first
//     const ongoingTask = tasks.find(t => t.status === "ongoing");
//     if (ongoingTask) {
//         saveTimerState(ongoingTask);
//         ongoingTask.status = "paused";
//     }
    
//     // Set the selected task to ongoing
//     const taskToResume = tasks.find(t => t.id === taskId);
//     if (taskToResume) {
//         taskToResume.status = "ongoing";
//         localStorage.setItem("activeTaskId", taskId);
        
//         // Reset timer for the new task
//         seconds = 0;
//         minutes = 0;
//         hours = 0;
//         updateTimerDisplay();
        
//         // Clear any existing timer
//         if (timer !== null) {
//             clearInterval(timer);
//             timer = null;
//         }
        
//         // Store new start time and start timer
//         localStorage.setItem("timerStartTime", new Date().toISOString());
//         timer = setInterval(stopWatch, 1000);
        
//         // Update button states
//         startBtn.disabled = true;
//         pauseBtn.disabled = false;
//         endBtn.disabled = false;
        
//         // Update UI
//         setOngoingTask(taskToResume);
//     }
    
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     updateTaskCounters();
//     renderTaskLists();
//     renderCalendar(); // Update calendar
// }

// function completeTask(taskId) {
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     const task = tasks.find(t => t.id === taskId);
    
//     if (task) {
//         // If this was the active task, save timer state
//         if (localStorage.getItem("activeTaskId") === taskId) {
//             saveTimerState(task);
//             localStorage.removeItem("activeTaskId");
//             clearOngoingTaskDisplay();
            
//             // Stop timer
//             clearInterval(timer);
//             timer = null;
//             localStorage.removeItem("timerStartTime");
//             seconds = 0;
//             minutes = 0;
//             hours = 0;
//             updateTimerDisplay();
            
//             // Update button states
//             startBtn.disabled = false;
//             pauseBtn.disabled = true;
//             endBtn.disabled = true;
//         }
        
//         task.status = "completed";
//         task.endDate = new Date().toISOString().split("T")[0];
//         localStorage.setItem("tasks", JSON.stringify(tasks));
        
//         // Update UI
//         updateTaskCounters();
//         renderTaskLists();
//         renderCalendar(); // Update calendar
//     }
// }

// function deleteTask(taskId) {
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     tasks = tasks.filter(t => t.id !== taskId);
//     localStorage.setItem("tasks", JSON.stringify(tasks));
    
//     // If this was the active task, clear it
//     if (localStorage.getItem("activeTaskId") === taskId) {
//         localStorage.removeItem("activeTaskId");
//         clearOngoingTaskDisplay();
        
//         // Stop timer
//         clearInterval(timer);
//         timer = null;
//         localStorage.removeItem("timerStartTime");
//         seconds = 0;
//         minutes = 0;
//         hours = 0;
//         updateTimerDisplay();
        
//         // Update button states
//         startBtn.disabled = false;
//         pauseBtn.disabled = true;
//         endBtn.disabled = true;
//     }
    
//     // Update UI
//     updateTaskCounters();
//     renderTaskLists();
//     renderCalendar(); // Update calendar
// }

// function setOngoingTask(task) {
//     document.getElementById("displayTaskName").textContent = task.name;
//     document.getElementById("displayTag").textContent = task.tag;
//     document.getElementById("displayPriority").textContent = task.priority;
//     document.getElementById("displayStartDate").textContent = task.startDate;
//     document.getElementById("displayStatus").textContent = task.status;
//     document.getElementById("displayTargetTime").textContent = task.targetTime;
// }

// function formatTimeFragment(fragments) {
//     if (!Array.isArray(fragments) || fragments.length === 0) return "--";
//     const lastThree = fragments.slice(-3);
//     return lastThree.map(frag => `${frag.date}: ${frag.duration}`).join("<br>");
// }

// function updateTaskCounters() {
//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
//     const totalCount = tasks.length;
//     const ongoingCount = tasks.filter(t => t.status === "ongoing").length;
//     const completedCount = tasks.filter(t => t.status === "completed").length;
    
//     totalCountElement.textContent = totalCount;
//     ongoingCountElement.textContent = ongoingCount;
//     completedCountElement.textContent = completedCount;
// }

// function renderTaskLists() {
//     renderTaskTable();
//     renderPausedTaskTable();
// }

// function renderTaskTable() {
//     const tableBody = document.getElementById('taskTableBody');
//     if (!tableBody) return; // Make sure the table exists
    
//     tableBody.innerHTML = "";
    
//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
//     tasks.forEach((task, index) => {
//         const row = document.createElement("tr");
//         row.classList.add(task.status); // Add status as class for styling
        
//         row.innerHTML = `
//             <td>${index + 1}</td>
//             <td>${task.name}</td>
//             <td>${task.priority}</td>
//             <td>${task.tag}</td>
//             <td>${task.startDate}</td>
//             <td>${task.status}</td>
//             <td>${task.endDate || "--"}</td>
//             <td>${task.timeTaken || "00:00:00"}</td>
//             <td>
//                 <button onclick="showDetailsModal('${task.id}')">Details</button>
//                 ${task.status === "paused" ? `<button onclick="resumeTask('${task.id}')">Resume</button>` : ""}
//                 ${task.status !== "completed" ? `<button onclick="completeTask('${task.id}')">Complete</button>` : ""}
//             </td>
//         `;
        
//         tableBody.appendChild(row);
//     });
// }

// function renderPausedTaskTable() {
//     const pausedTableBody = document.getElementById('pausedTaskTableBody');
//     if (!pausedTableBody) return; // If the table doesn't exist yet
    
//     pausedTableBody.innerHTML = "";
    
//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     const pausedTasks = tasks.filter(t => t.status === "paused");
    
//     pausedTasks.forEach((task, index) => {
//         const row = document.createElement("tr");
        
//         row.innerHTML = `
//             <td>${task.id.slice(-4)}</td>
//             <td>${task.name}</td>
//             <td>${task.priority}</td>
//             <td>${task.tag}</td>
//             <td>${task.startDate}</td>
//             <td>${task.timeTaken || "00:00:00"}</td>
//             <td>${formatTimeFragment(task.timeFragments)}</td>
//             <td>
//                 <button onclick="resumeTask('${task.id}')">Resume</button>
//                 <button onclick="editTask('${task.id}')">Edit</button>
//                 <button onclick="completeTask('${task.id}')">Complete</button>
//             </td>
//         `;
        
//         pausedTableBody.appendChild(row);
//     });
// }

// // New Calendar functionality
// function renderCalendar() {
//     const calendarContainer = document.getElementById('calendar-container');
//     if (!calendarContainer) return; // If the calendar container doesn't exist
    
//     // Clear existing calendar
//     calendarContainer.innerHTML = "";
    
//     // Get current date
//     const now = new Date();
//     const currentMonth = now.getMonth();
//     const currentYear = now.getFullYear();
    
//     // Create calendar header
//     const calendarHeader = document.createElement('div');
//     calendarHeader.className = 'calendar-header';
//     calendarHeader.innerHTML = `
//         <h2>${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}</h2>
//     `;
//     calendarContainer.appendChild(calendarHeader);
    
//     // Create weekday headers
//     const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const weekdayHeader = document.createElement('div');
//     weekdayHeader.className = 'calendar-weekdays';
    
//     weekdays.forEach(day => {
//         const dayElement = document.createElement('div');
//         dayElement.className = 'calendar-weekday';
//         dayElement.textContent = day;
//         weekdayHeader.appendChild(dayElement);
//     });
    
//     calendarContainer.appendChild(weekdayHeader);
    
//     // Create calendar grid
//     const calendarGrid = document.createElement('div');
//     calendarGrid.className = 'calendar-grid';
    
//     // Get first day of month and last day of month
//     const firstDay = new Date(currentYear, currentMonth, 1).getDay();
//     const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    
//     // Get all tasks
//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
//     // Calculate task dates
//     let taskDates = {};
//     tasks.forEach(task => {
//         const startDate = new Date(task.startDate);
//         if (startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear) {
//             const day = startDate.getDate();
//             if (!taskDates[day]) taskDates[day] = [];
//             taskDates[day].push(task);
//         }
        
//         // If the task has an end date and is completed
//         if (task.endDate && task.status === "completed") {
//             const endDate = new Date(task.endDate);
//             if (endDate.getMonth() === currentMonth && endDate.getFullYear() === currentYear) {
//                 const day = endDate.getDate();
//                 if (!taskDates[day]) taskDates[day] = [];
//                 // Don't add duplicate tasks
//                 if (!taskDates[day].some(t => t.id === task.id)) {
//                     taskDates[day].push(task);
//                 }
//             }
//         }
//     });
    
//     // Create empty cells for days before the first day of the month
//     for (let i = 0; i < firstDay; i++) {
//         const emptyCell = document.createElement('div');
//         emptyCell.className = 'calendar-day empty';
//         calendarGrid.appendChild(emptyCell);
//     }
    
//     // Create cells for each day of the month
//     for (let day = 1; day <= lastDate; day++) {
//         const dayCell = document.createElement('div');
//         dayCell.className = 'calendar-day';
        
//         // Highlight today
//         if (day === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear()) {
//             dayCell.classList.add('today');
//         }
        
//         // Add day number
//         const dayNumber = document.createElement('div');
//         dayNumber.className = 'day-number';
//         dayNumber.textContent = day;
//         dayCell.appendChild(dayNumber);
        
//         // Add tasks for this day
//         if (taskDates[day] && taskDates[day].length > 0) {
//             const taskList = document.createElement('div');
//             taskList.className = 'day-tasks';
            
//             taskDates[day].forEach(task => {
//                 const taskItem = document.createElement('div');
//                 taskItem.className = `task-item ${task.status}`;
//                 taskItem.textContent = task.name;
//                 taskItem.title = `${task.name} (${task.status})`;
//                 taskItem.addEventListener('click', () => showDetailsModal(task.id));
//                 taskList.appendChild(taskItem);
//             });
            
//             dayCell.appendChild(taskList);
//         }
        
//         calendarGrid.appendChild(dayCell);
//     }
    
//     calendarContainer.appendChild(calendarGrid);
// }

// function showDetailsModal(taskId) {
//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     const task = tasks.find(t => t.id === taskId);
    
//     if (!task) return;
    
//     const modal = document.createElement("div");
//     modal.classList.add("modal");
    
//     modal.innerHTML = `
//         <div class="modal-content">
//             <span class="close">&times;</span>
//             <h2>${task.name}</h2>
//             <p><strong>Priority:</strong> ${task.priority}</p>
//             <p><strong>Tag:</strong> ${task.tag}</p>
//             <p><strong>Status:</strong> ${task.status}</p>
//             <p><strong>Start Date:</strong> ${task.startDate}</p>
//             <p><strong>End Date:</strong> ${task.endDate || "--"}</p>
//             <p><strong>Target Date:</strong> ${task.targetTime}</p>
//             <p><strong>Total Time Taken:</strong> ${task.timeTaken || "00:00:00"}</p>
//             <p><strong>Details:</strong> ${task.details}</p>
            
//             <h3>Time Fragments</h3>
//             <div class="time-fragments">
//                 ${(task.timeFragments || []).map(f => `
//                     <div class="time-fragment">
//                         <p>${f.date}: ${f.duration}</p>
//                     </div>
//                 `).join("")}
//             </div>
            
//             <div class="modal-actions">
//                 ${task.status === "paused" ? `<button onclick="resumeTask('${task.id}')">✅ Resume Task</button>` : ""}
//                 <button onclick="editTask('${task.id}')">📝 Edit Task</button>
//                 ${task.status !== "completed" ? `<button onclick="completeTask('${task.id}')">✔️ Complete Task</button>` : ""}
//                 <button onclick="deleteTask('${task.id}')">❌ Delete Task</button>
//             </div>
//         </div>
//     `;
    
//     modal.querySelector(".close").onclick = () => modal.remove();
//     document.body.appendChild(modal);
// }

// function editTask(taskId) {
//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     const task = tasks.find(t => t.id === taskId);
    
//     if (!task) return;
    
//     const modal = document.createElement("div");
//     modal.classList.add("modal");
    
//     modal.innerHTML = `
//         <div class="modal-content">
//             <span class="close">&times;</span>
//             <h2>Edit Task</h2>
            
//             <input type="text" id="editTaskName" value="${task.name}" placeholder="Task Name" required>
            
//             <select id="editPriority">
//                 <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
//                 <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
//                 <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
//             </select>
            
//             <input type="text" id="editTag" value="${task.tag}" placeholder="Tag" required>
//             <input type="date" id="editStartDate" value="${task.startDate}">
            
//             <select id="editStatus">
//                 <option value="ongoing" ${task.status === 'ongoing' ? 'selected' : ''}>Ongoing</option>
//                 <option value="paused" ${task.status === 'paused' ? 'selected' : ''}>Paused</option>
//                 <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
//             </select>
            
//             <input type="date" id="editTargetTime" value="${task.targetTime}" placeholder="Target Time" required>
//             <input type="text" id="editDetails" value="${task.details}" placeholder="Details" required>
            
//             <button id="updateTaskBtn">Update Task</button>
//         </div>
//     `;
    
//     modal.querySelector(".close").onclick = () => modal.remove();
    
//     modal.querySelector("#updateTaskBtn").onclick = () => {
//         const name = modal.querySelector("#editTaskName").value;
//         const priority = modal.querySelector("#editPriority").value;
//         const tag = modal.querySelector("#editTag").value;
//         const startDate = modal.querySelector("#editStartDate").value;
//         const status = modal.querySelector("#editStatus").value;
//         const targetTime = modal.querySelector("#editTargetTime").value;
//         const details = modal.querySelector("#editDetails").value;
        
//         // Update task
//         task.name = name;
//         task.priority = priority;
//         task.tag = tag;
//         task.startDate = startDate;
        
//         // Handle status change
//         const previousStatus = task.status;
        
//         // If there's an ongoing task and this task is becoming ongoing, pause the current one
//         if (status === "ongoing" && previousStatus !== "ongoing") {
//             const ongoingTask = tasks.find(t => t.id !== taskId && t.status === "ongoing");
//             if (ongoingTask) {
//                 saveTimerState(ongoingTask);
//                 ongoingTask.status = "paused";
//             }
            
//             // Set this task as active
//             localStorage.setItem("activeTaskId", taskId);
            
//             // Reset and start timer
//             resetTimer();
//             timerStart(true);
            
//             // Update display
//             setOngoingTask(task);
//         } 
//         // If this task was ongoing but is no longer
//         else if (previousStatus === "ongoing" && status !== "ongoing") {
//             // Save timer state
//             saveTimerState(task);
            
//             // Clear active task
//             localStorage.removeItem("activeTaskId");
//             clearOngoingTaskDisplay();
            
//             // Stop timer
//             clearInterval(timer);
//             timer = null;
//             localStorage.removeItem("timerStartTime");
//             seconds = 0;
//             minutes = 0;
//             hours = 0;
//             updateTimerDisplay();
            
//             // Update button states
//             startBtn.disabled = false;
//             pauseBtn.disabled = true;
//             endBtn.disabled = true;
//         }
        
//         // Update status
//         task.status = status;
        
//         task.targetTime = targetTime;
//         task.details = details;
        
//         // If task becomes completed, set end date
//         if (status === "completed" && !task.endDate) {
//             task.endDate = new Date().toISOString().split("T")[0];
//         }
        
//         localStorage.setItem("tasks", JSON.stringify(tasks));
//         updateTaskCounters();
//         renderTaskLists();
//         renderCalendar(); // Update calendar
        
//         modal.remove();
//     };
    
//     document.body.appendChild(modal);
// }

// // Dashboard integration
// function initializeDashboard() {
//     // Create tabs for dashboard
//     const dashboardContainer = document.getElementById('dashboard-container');
//     if (!dashboardContainer) return;
    
//     dashboardContainer.innerHTML = `
//         <div class="dashboard-tabs">
//             <button class="tab-btn active" data-tab="tasks">Tasks</button>
//             <button class="tab-btn" data-tab="calendar">Calendar</button>
//             <button class="tab-btn" data-tab="stats">Statistics</button>
//         </div>
        
//         <div class="tab-content" id="tasks-tab">
//             <h2>All Tasks</h2>
//             <div class="filter-options">
//                 <select id="statusFilter">
//                     <option value="all">All Statuses</option>
//                     <option value="ongoing">Ongoing</option>
//                     <option value="paused">Paused</option>
//                     <option value="completed">Completed</option>
//                 </select>
//                 <select id="priorityFilter">
//                     <option value="all">All Priorities</option>
//                     <option value="high">High</option>
//                     <option value="medium">Medium</option>
//                     <option value="low">Low</option>
//                 </select>
//                 <input type="text" id="tagFilter" placeholder="Filter by tag...">
//             </div>
//             <table class="tasks-table">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Name</th>
//                         <th>Priority</th>
//                         <th>Tag</th>
//                         <th>Start Date</th>
//                         <th>Status</th>
//                         <th>End Date</th>
//                         <th>Time Taken</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody id="taskTableBody"></tbody>
//             </table>
//         </div>
        
//         <div class="tab-content" id="calendar-tab" style="display:none;">
//             <h2>Task Calendar</h2>
//             <div id="calendar-container"></div>
//         </div>
        
//         <div class="tab-content" id="stats-tab" style="display:none;">
//             <h2>Task Statistics</h2>
//             <div class="stats-grid">
//                 <div class="stat-card">
//                     <h3>Tasks by Status</h3>
//                     <div id="status-chart" class="chart"></div>
//                 </div>
//                 <div class="stat-card">
//                     <h3>Tasks by Priority</h3>
//                     <div id="priority-chart" class="chart"></div>
//                 </div>
//                 <div class="stat-card">
//                     <h3>Time Spent per Task</h3>
//                     <div id="time-chart" class="chart"></div>
//                 </div>
//                 <div class="stat-card">
//                     <h3>Tasks by Tag</h3>
//                     <div id="tag-chart" class="chart"></div>
//                 </div>
//             </div>
//         </div>
//     `;
    
//     // Add event listeners to tabs
//     const tabButtons = dashboardContainer.querySelectorAll('.tab-btn');
//     tabButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             // Remove active class from all buttons
//             tabButtons.forEach(btn => btn.classList.remove('active'));
//             // Add active class to clicked button
//             button.classList.add('active');
            
//             // Hide all tab content
//             const tabContents = dashboardContainer.querySelectorAll('.tab-content');
//             tabContents.forEach(content => content.style.display = 'none');
            
//             // Show selected tab content
//             const tabName = button.getAttribute('data-tab');
//             document.getElementById(`${tabName}-tab`).style.display = 'block';
            
//             // Special handling for different tabs
//             if (tabName === 'calendar') {
//                 renderCalendar();
//             } else if (tabName === 'stats') {
//                 renderStatistics();
//             }
//         });
//     });
    
//     // Add event listeners to filters
//     const statusFilter = document.getElementById('statusFilter');
//     const priorityFilter = document.getElementById('priorityFilter');
//     const tagFilter = document.getElementById('tagFilter');
    
//     if (statusFilter && priorityFilter && tagFilter) {
//         statusFilter.addEventListener('change', filterTasks);
//         priorityFilter.addEventListener('change', filterTasks);
//         tagFilter.addEventListener('input', filterTasks);
//     }
    
//     // Initialize everything
//     renderTaskLists();
// }

// function filterTasks() {
//     const statusFilter = document.getElementById('statusFilter').value;
//     const priorityFilter = document.getElementById('priorityFilter').value;
//     const tagFilter = document.getElementById('tagFilter').value.toLowerCase();
    
//     const tableBody = document.getElementById('taskTableBody');
//     if (!tableBody) return;
    
//     tableBody.innerHTML = "";
    
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
//     // Apply filters
//     tasks = tasks.filter(task => {
//         const statusMatch = statusFilter === 'all' || task.status === statusFilter;
//         const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
//         const tagMatch = tagFilter === '' || task.tag.toLowerCase().includes(tagFilter);
        
//         return statusMatch && priorityMatch && tagMatch;
//     });
    
//     // Render filtered tasks
//     tasks.forEach((task, index) => {
//         const row = document.createElement("tr");
//         row.classList.add(task.status); // Add status as class for styling
        
//         row.innerHTML = `
//             <td>${index + 1}</td>
//             <td>${task.name}</td>
//             <td>${task.priority}</td>
//             <td>${task.tag}</td>
//             <td>${task.startDate}</td>
//             <td>${task.status}</td>
//             <td>${task.endDate || "--"}</td>
//             <td>${task.timeTaken || "00:00:00"}</td>
//             <td>
//                 <button onclick="showDetailsModal('${task.id}')">Details</button>
//                 ${task.status === "paused" ? `<button onclick="resumeTask('${task.id}')">Resume</button>` : ""}
//                 ${task.status !== "completed" ? `<button onclick="completeTask('${task.id}')">Complete</button>` : ""}
//             </td>
//         `;
        
//         tableBody.appendChild(row);
//     });
// }

// function renderStatistics() {
//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
//     // Calculate statistics
//     const statusCounts = {
//         ongoing: tasks.filter(t => t.status === "ongoing").length,
//         paused: tasks.filter(t => t.status === "paused").length,
//         completed: tasks.filter(t => t.status === "completed").length
//     };
    
//     const priorityCounts = {
//         high: tasks.filter(t => t.priority === "high").length,
//         medium: tasks.filter(t => t.priority === "medium").length,
//         low: tasks.filter(t => t.priority === "low").length
//     };
    
//     // Get unique tags and count them
//     const tagCounts = {};
//     tasks.forEach(task => {
//         if (!tagCounts[task.tag]) {
//             tagCounts[task.tag] = 1;
//         } else {
//             tagCounts[task.tag]++;
//         }
//     });
    
//     // Calculate time spent on each task
//     const timePerTask = tasks.map(task => ({
//         name: task.name,
//         time: task.timeTaken || "00:00:00",
//         // Convert time to minutes for charting
//         minutes: convertTimeToMinutes(task.timeTaken || "00:00:00")
//     })).sort((a, b) => b.minutes - a.minutes).slice(0, 10); // Top 10 tasks by time
    
//     // Render charts (simplified representation)
//     renderSimpleBarChart('status-chart', Object.keys(statusCounts), Object.values(statusCounts), ['green', 'orange', 'blue']);
//     renderSimpleBarChart('priority-chart', Object.keys(priorityCounts), Object.values(priorityCounts), ['red', 'orange', 'yellow']);
//     renderSimpleBarChart('time-chart', timePerTask.map(t => t.name), timePerTask.map(t => t.minutes), ['blue']);
//     renderSimpleBarChart('tag-chart', Object.keys(tagCounts), Object.values(tagCounts), ['purple']);
// }

// function convertTimeToMinutes(timeString) {
//     const [hours, minutes, seconds] = timeString.split(':').map(Number);
//     return hours * 60 + minutes + seconds / 60;
// }

// function renderSimpleBarChart(containerId, labels, values, colors) {
//     const container = document.getElementById(containerId);
//     if (!container) return;
    
//     // Clear container
//     container.innerHTML = "";
    
//     // Create simple bar chart
//     const chart = document.createElement('div');
//     chart.className = 'simple-bar-chart';
    
//     // Find max value for scaling
//     const maxValue = Math.max(...values, 1);
    
//     // Create bars
//     labels.forEach((label, index) => {
//         const barContainer = document.createElement('div');
//         barContainer.className = 'bar-container';
        
//         const labelElement = document.createElement('div');
//         labelElement.className = 'bar-label';
//         labelElement.textContent = label;
        
//         const barWrapper = document.createElement('div');
//         barWrapper.className = 'bar-wrapper';
        
//         const bar = document.createElement('div');
//         bar.className = 'bar';
//         bar.style.width = `${(values[index] / maxValue) * 100}%`;
//         bar.style.backgroundColor = colors[index % colors.length];
        
//         const valueLabel = document.createElement('span');
//         valueLabel.className = 'value-label';
//         valueLabel.textContent = values[index];
        
//         barWrapper.appendChild(bar);
//         barWrapper.appendChild(valueLabel);
        
//         barContainer.appendChild(labelElement);
//         barContainer.appendChild(barWrapper);
        
//         chart.appendChild(barContainer);
//     });
    
//     container.appendChild(chart);
// }

// function addDashboardStyles() {
//     const style = document.createElement('style');
//     style.textContent = `
//         .dashboard-tabs {
//             display: flex;
//             margin-bottom: 20px;
//             border-bottom: 1px solid #ddd;
//         }
        
//         .tab-btn {
//             padding: 10px 20px;
//             background: none;
//             border: none;
//             cursor: pointer;
//             font-size: 16px;
//             border-bottom: 3px solid transparent;
//         }
        
//         .tab-btn.active {
//             border-bottom-color: #4CAF50;
//             font-weight: bold;
//         }
        
//         .tab-content {
//             padding: 20px 0;
//         }
        
//         .filter-options {
//             display: flex;
//             gap: 10px;
//             margin-bottom: 15px;
//         }
        
//         .tasks-table {
//             width: 100%;
//             border-collapse: collapse;
//         }
        
//         .tasks-table th, .tasks-table td {
//             padding: 8px 12px;
//             text-align: left;
//             border-bottom: 1px solid #ddd;
//         }
        
//         .tasks-table th {
//             background-color: #f5f5f5;
//         }
        
//         .tasks-table tr.ongoing {
//             background-color: rgba(76, 175, 80, 0.1);
//         }
        
//         .tasks-table tr.paused {
//             background-color: rgba(255, 152, 0, 0.1);
//         }
        
//         .tasks-table tr.completed {
//             background-color: rgba(3, 155, 229, 0.1);
//         }
        
//         /* Calendar styles */
//         .calendar-container {
//             margin-top: 20px;
//         }
        
//         .calendar-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 10px;
//         }
        
//         .calendar-weekdays {
//             display: grid;
//             grid-template-columns: repeat(7, 1fr);
//             text-align: center;
//             font-weight: bold;
//             background-color: #f5f5f5;
//             border-bottom: 1px solid #ddd;
//         }
        
//         .calendar-weekday {
//             padding: 10px;
//         }
        
//         .calendar-grid {
//             display: grid;
//             grid-template-columns: repeat(7, 1fr);
//             grid-gap: 1px;
//             background-color: #ddd;
//         }
        
//         .calendar-day {
//             min-height: 100px;
//             background-color: white;
//             padding: 5px;
//             position: relative;
//         }
        
//         .calendar-day.empty {
//             background-color: #f9f9f9;
//         }
        
//         .calendar-day.today {
//             background-color: #f0f8ff;
//         }
        
//         .day-number {
//             font-weight: bold;
//             text-align: right;
//             margin-bottom: 5px;
//         }
        
//         .day-tasks {
//             display: flex;
//             flex-direction: column;
//             gap: 3px;
//         }
        
//         .task-item {
//             font-size: 12px;
//             padding: 2px 5px;
//             border-radius: 3px;
//             cursor: pointer;
//             white-space: nowrap;
//             overflow: hidden;
//             text-overflow: ellipsis;
//         }
        
//         .task-item.ongoing {
//             background-color: rgba(76, 175, 80, 0.2);
//         }
        
//         .task-item.paused {
//             background-color: rgba(255, 152, 0, 0.2);
//         }
        
//         .task-item.completed {
//             background-color: rgba(3, 155, 229, 0.2);
//             text-decoration: line-through;
//         }
        
//         /* Statistics styles */
//         .stats-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//             gap: 20px;
//         }
        
//         .stat-card {
//             background-color: white;
//             border-radius: 5px;
//             box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//             padding: 15px;
//         }
        
//         .simple-bar-chart {
//             margin-top: 15px;
//         }
        
//         .bar-container {
//             margin-bottom: 10px;
//         }
        
//         .bar-label {
//             margin-bottom: 5px;
//             font-size: 14px;
//         }
        
//         .bar-wrapper {
//             height: 20px;
//             background-color: #f5f5f5;
//             position: relative;
//             border-radius: 3px;
//             overflow: hidden;
//         }
        
//         .bar {
//             height: 100%;
//             transition: width 0.5s ease;
//         }
        
//         .value-label {
//             position: absolute;
//             right: 5px;
//             top: 50%;
//             transform: translateY(-50%);
//             font-size: 12px;
//             color: #333;
//         }
//     `;
    
//     document.head.appendChild(style);
// }

// // Initialize everything
// window.addEventListener("DOMContentLoaded", () => {
//     // Add styles for dashboard
//     addDashboardStyles();
    
//     // Setup event listeners for timer
//     startBtn.addEventListener("click", timerStart);
//     pauseBtn.disabled = true;
//     pauseBtn.addEventListener("click", timerPause);
//     endBtn.disabled = true;
//     endBtn.addEventListener("click", timerEnd);
    
//     // Initialize timer state
//     initializeTimer();
    
//     // Initialize dashboard
//     initializeDashboard();
    
//     // Restore active task if exists
//     restoreActiveTask();
    
//     // Update counters and render lists
//     updateTaskCounters();
//     renderTaskLists();
// });


// const sidebar = document.querySelector('.sidebar-aside');
// const toggleBtn = document.querySelector(".toggler");

// toggleBtn.addEventListener("click", () => {
//     sidebar.classList.toggle("collapse")
// });


// main.js - Fixed version with improved functionality

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

// Initialize timer variables
let timer = null;
let seconds = 0;
let minutes = 0;
let hours = 0;

// Navigation setup
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const targetPage = link.getAttribute('data-page');

        // Update active navigation link
        navLinks.forEach(el => el.parentElement.classList.remove('active'));
        link.parentElement.classList.add('active');

        // Show appropriate page
        pages.forEach(page => {
            if(page.id === `${targetPage}-page`){
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });

        // Load appropriate content based on the page
        if(targetPage === 'works-done'){
            renderCompletedTaskTable();
        } else if(targetPage === 'analytics'){
            renderAnalytics();
        } else if(targetPage === 'dashboard') {
            renderPausedTaskTable();
        }
    });
});

// Button event listeners
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

// Add new task form
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
    taskForm.style.display = "block";

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

// Add new task functionality
function addNewTask(taskForm){
    const taskName = taskForm.querySelector("#taskName").value;
    const priority = taskForm.querySelector("#priority").value;
    const tag = taskForm.querySelector("#tag").value;
    const startDate = taskForm.querySelector('#startDate').value;
    const status = taskForm.querySelector("#status").value;
    const targetDate = taskForm.querySelector("#targetDate").value;
    const details = taskForm.querySelector("#details").value || "";

    if(!taskName || !tag || !targetDate){
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
        targetDate,
        details,
        timeFragments: [],
        timeTaken: "00:00:00"
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Handle ongoing task logic
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

// Save timer state for a task
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
    
    // Save tasks to localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
        tasks[index] = task;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Add times helper function
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

// Reset timer
function resetTimer(){
    clearInterval(timer);
    timer = null;
    seconds = 0; 
    minutes = 0;
    hours = 0;

    timerDisplay.textContent = "00:00:00";

    localStorage.setItem("timerStartTime", new Date().toISOString());
}

// Pause current task
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

// Complete current task
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

// Resume a task
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

// Complete a task
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

// Delete a task
function deleteTask(taskId){
    if(!confirm("Are you sure you want to delete this task?")) return;

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

// Clear the ongoing task display
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

// Set the ongoing task display
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

// Format time fragments for display
function formatTimeFragment(fragments){
    if(!Array.isArray(fragments) || fragments.length === 0) return "--";

    const lastThree = fragments.slice(-3);
    return lastThree.map(frag => `${frag.date}: ${frag.duration}`).join("<br>");
}

// Update task counters
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

// Render all task lists
function renderTaskLists(){
    renderPausedTaskTable();
}

// Render paused tasks table (Dashboard)
function renderPausedTaskTable(){
    const pausedTableBody = document.getElementById('pausedTaskTableBody');
    if(!pausedTableBody) return;

    pausedTableBody.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const pausedTasks = tasks.filter(t => t.status === "paused");

    pausedTasks.forEach((task, index) => {
        const row = document.createElement("tr");
        
        // Get the last 3 time fragments for display
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

// Render completed tasks table (Works Done page)
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

// Show details modal for a task
function showDetailsModal(taskId){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === taskId);

    if(!task) return;

    const taskDetailsModal = document.getElementById("taskDetailsModal");
    const detailsContainer = document.getElementById("taskDetailsContent");

    if (!taskDetailsModal || !detailsContainer) {
        // Create modal if it doesn't exist
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
                        ${task.status === "paused" ? `<button class="btn-primary" onclick="resumeTask('${task.id}')">✅ Resume Task</button>` : ''}
                        <button class="btn-secondary" onclick="editTask('${task.id}')">📝 Edit Task</button>
                        ${task.status !== "completed" ? `<button class="btn-success" onclick="completeTask('${task.id}')">✔️ Complete Task</button>` : ''}
                        <button class="btn-danger" onclick="deleteTask('${task.id}')">❌ Delete Task</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalElement);
        
        // Add event listener to close button
        modalElement.querySelector(".close").addEventListener("click", () => {
            modalElement.style.display = "none";
        });
        
        modalElement.style.display = "block";
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
                    ${task.status === "paused" ? `<button class="btn-primary" onclick="resumeTask('${task.id}')">✅ Resume Task</button>` : ''}
                    <button class="btn-secondary" onclick="editTask('${task.id}')">📝 Edit Task</button>
                    ${task.status !== "completed" ? `<button class="btn-success" onclick="completeTask('${task.id}')">✔️ Complete Task</button>` : ''}
                    <button class="btn-danger" onclick="deleteTask('${task.id}')">❌ Delete Task</button>
                </div>
            </div>
        `;
        
        // Add event listener to close button
        taskDetailsModal.querySelector(".close").addEventListener("click", () => {
            taskDetailsModal.style.display = "none";
        });
        
        taskDetailsModal.style.display = "block";
    }
}

// Edit task
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
    editForm.style.display = "block";

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

// Update task data after edit
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

// Render analytics
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

// Initialize the application
function initApp() {
    // Check for active task on page load
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (activeTaskId) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const activeTask = tasks.find(t => t.id === activeTaskId);
        
        if (activeTask) {
            setOngoingTask(activeTask);
            timerStart();
        } else {
            localStorage.removeItem("activeTaskId");
        }
    } else {
        clearOngoingTaskDisplay();
    }
    
    updateTaskCounters();
    renderTaskLists();
    
    // Set up global handlers for modal closing
    window.onclick = function(event) {
        const modals = document.getElementsByClassName('modal');
        for (let i = 0; i < modals.length; i++) {
            if (event.target === modals[i]) {
                modals[i].style.display = "none";
            }
        }
    };
    
    // Make functions available globally
    window.showDetailsModal = showDetailsModal;
    window.resumeTask = resumeTask;
    window.editTask = editTask;
    window.completeTask = completeTask;
    window.deleteTask = deleteTask;
}

function initializeAnalytics() {
    const analyticsContainer = document.querySelector('.analytics-container');
    
    // Create a better structured layout for analytics
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
    // Get the last 7 days
    const dates = [];
    const timeSpent = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        dates.push(dateStr.substring(5)); // Show MM-DD format
        
        // Calculate total time spent on that day
        const dayTotal = tasks.reduce((total, task) => {
            const taskDate = task.timeSpent && task.timeSpent[dateStr];
            return total + (taskDate || 0);
        }, 0);
        
        timeSpent.push(dayTotal / 60); // Convert to hours
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

// Add event listener for analytics tab
document.addEventListener('DOMContentLoaded', () => {
    const analyticsTab = document.querySelector('a[href="#analytics"]');
    if (analyticsTab) {
        analyticsTab.addEventListener('click', () => {
            // Initialize analytics when the tab is clicked
            setTimeout(initializeAnalytics, 100); // Small delay to ensure DOM is ready
        });
    }
    
    // Initialize charts if we're already on the analytics page
    if (window.location.hash === '#analytics') {
        setTimeout(initializeAnalytics, 100);
    }
    
    // Add window resize handler for responsive charts
    window.addEventListener('resize', () => {
        if (window.location.hash === '#analytics') {
            setTimeout(initializeAnalytics, 200);
        }
    });
});

// Call init on page load
document.addEventListener('DOMContentLoaded', initApp);
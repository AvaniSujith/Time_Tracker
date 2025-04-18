// const addNew = document.getElementById("addTaskBtn");

// addNew.addEventListener("click", () => {
//     addNewTaskForm()
// })

// function addNewTaskForm(){
//     const taskForm = document.createElement("div");
//     // taskForm.id = "newTaskForm"
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
//         <input type="date" id="startDate" >

//         <select id="status">
//             <option value="ongoing" selected> Ongoing </option>
//             <option value="paused">Paused</option>
//             <option value="completed">Completed</option>
//         </select>

//         <input type="date" id="targetTime" placeholder="Target Time" required>
//         <input type="text" id="details" placeholder="Details" required>

//         <button id="addTaskBtnModal">Add Task</button>

//     </div>
//     `;

//     // const section = document.querySelector(".task-table");
//     // section.insertBefore(taskForm, document.getElementById("taskTable"));

//     document.body.appendChild(taskForm);
//     taskForm.style.display = "block";

//     taskForm.querySelector(".close").onclick = () => taskForm.remove();

//     taskForm.querySelector("#addTaskBtnModal").onclick = () => {
//         addNewTask(taskForm);
//         taskForm.remove();
//     }
// };


// // function addNewTask() {
// //     const name = document.getElementById("taskName").value;
// //     const priority = document.getElementById("priority").value;
// //     const tag = document.getElementById("tag").value;
// //     const startDate = document.getElementById("startDate").value;
// //     const status = document.getElementById("status").value;
// //     const targetTime = document.getElementById("targetTime").value;
// //     const details = document.getElementById("details").value;

// //     const task = document.createElement("div");
// //     task.className = "task";
// //     task.innerHTML = `
// //         <h3>Ongoing Task</h3>
// //         <p><strong>Name:</strong>${name}</p>
// //         <p><strong>Priority:</strong> ${priority}</p>
// //         <p><strong>Tag:</strong> ${tag}</p>
// //         <p><strong>Start Date:</strong> ${startDate}</p>
// //         <p><strong>Status:</strong> ${status}</p>
// //         <p><strong>Target Time:</strong> ${targetTime}</p>
// //         <p><strong>Details:</strong> ${details}</p>
// //     `;

// //     // document.querySelector(".active-task-panel").appendChild(task);
// //     document.getElementById("taskList").appendChild(task);
// // }

// function addNewTask(taskForm) {
//     // const taskName = document.getElementById("taskName").value;
//     // const priority = document.getElementById("priority").value; 
//     // const tag = document.getElementById("tag").value; 
//     // const startDate = document.getElementById("startDate").value; 
//     // const status = document.getElementById("status").value;
//     // const targetTime = document.getElementById("targetTime").value;
//     // const details = document.getElementById("details").value; 

//     const taskName = taskForm.querySelector("#taskName").value; 
//     const priority = taskForm.querySelector("#priority").value;
//     const tag = taskForm.querySelector("#tag").value;
//     const startDate = taskForm.querySelector("#startDate").value;
//     const status = taskForm.querySelector("#status").value;
//     const targetTime = taskForm.querySelector("#targetTime").value;
//     const details = taskForm.querySelector("#details").value;

//     // const taskList = document.getElementById("taskList");
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
//         timeFragments: []
//     };

//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//     const ongoing = tasks.find(t => t.status === "ongoing");

//     if(ongoing){
//         ongoing.status = "paused";
//     }

//     task.status = "ongoing";
//     tasks.push(task);

//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     setOngoingTask(task);
//     renderTaskList();

// }



// function setOngoingTask(task){
//     document.getElementById("displayTaskName").textContent = task.name;
//     document.getElementById("displayTag").textContent = task.tag;
//     document.getElementById("displayPriority").textContent = task.priority;
//     document.getElementById("displayStartDate").textContent = task.startDate;
//     document.getElementById("displayStatus").textContent = task.status;
//     document.getElementById("displayTargetTime").textContent = task.targetTime;
//     // document.getElementById("displayTaskName").textContent = taskName;

// }
//     // task.innerHTML = `
//     //     <h3>${taskName}</h3>
//     //     <p><strong>Tag:</strong> ${tag}</p>
//     //     <p><strong>Priority:</strong> ${priority}</p>
//     //     <p><strong>Start Date:</strong> ${startDate}</p>
//     //     <p><strong>Status:</strong> ${status}</p>
//     //     <p><strong>Target Time:</strong> ${targetTime}</p>
//     //     <p><strong>Details:</strong> ${details}</p>
//     // `;

//     // taskList.appendChild(task);



  

//     // // if(!name|| !startDate || !status || !timeTaken){
//     // //     alert("Please fill all required ")
//     // //     return;,
//     // // }

    
//     // tasks.push(newTask);
//     // tableData();

// // document.getElementById("new-task").addEventListener("click", () => {
// //     if(!document.getElementById("newTaskForm")){
// //         addNewTaskForm()
// //         addNewTask()

// //     }
// // });


// function renderTaskList() {
//     const taskList = document.getElementById("taskList");
//     taskList.innerHTML = "";
//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     tasks.filter(t => t.status === "paused").forEach(task => {
//         const taskCard = document.createElement("div");
//         taskCard.className = "task-card";
//         taskCard.innerHTML = `
//             <h3>${task.name}</h3>
//             <p><strong>Tag:</strong> ${task.tag}</p>
//             <p><strong>Priority:</strong> ${task.priority}</p>
//             <p><strong>Start:</strong> ${task.startDate}</p>
//             <p><strong>Target:</strong> ${task.targetTime}</p>
//             <button onclick="resumeTask('${task.id}')">Resume</button>
//             <button onclick="viewTaskDetails('${task.id}')">Details</button>
//             <button onclick="completeTask('${task.id}')">Complete</button>
//             <button onclick="deleteTask('${task.id}')">Delete</button>
//         `;
//         taskList.appendChild(taskCard);
//     });
// }

// function viewTaskDetails(id) {
//     const tasks = JSON.parse(localStorage.getItem("tasks"));
//     const task = tasks.find(t => t.id === id);
//     if (!task) return;

//     let modal = document.createElement("div");
//     modal.classList.add("modal");
//     modal.innerHTML = `
//         <div class="modal-content">
//             <span class="close">&times;</span>
//             <h3>Task Details</h3>
//             <p><strong>Name:</strong> ${task.name}</p>
//             <p><strong>Details:</strong> ${task.details}</p>
//             <h4>Time Fragments</h4>
//             ${task.timeFragments.map(f => `
//                 <div>
//                     <p><strong>Start:</strong> ${new Date(f.start).toLocaleString()}</p>
//                     <p><strong>End:</strong> ${new Date(f.end).toLocaleString()}</p>
//                     <p><strong>Duration:</strong> ${f.duration}</p>
//                 </div>
//             `).join("")}
//         </div>
//     `;
//     document.body.appendChild(modal);
//     modal.style.display = "block";
//     modal.querySelector(".close").onclick = () => modal.remove();
// }

// function resumeTask(id) {
//     let tasks = JSON.parse(localStorage.getItem("tasks"));
//     tasks.forEach(t => t.status = (t.id === id ? "ongoing" : t.status === "ongoing" ? "paused" : t.status));
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     renderTaskList();
//     const resumedTask = tasks.find(t => t.id === id);
//     setOngoingTask(resumedTask);
// }

// function completeTask(id) {
//     let tasks = JSON.parse(localStorage.getItem("tasks"));
//     const task = tasks.find(t => t.id === id);
//     task.status = "completed";
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     renderTaskList();
// }

// function deleteTask(id) {
//     let tasks = JSON.parse(localStorage.getItem("tasks"));
//     tasks = tasks.filter(t => t.id !== id);
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     renderTaskList();
// }

// renderTaskList();




// const addNew = document.getElementById("addTaskBtn");
// const moreBtn = document.getElementById("moreBtn");
// const taskOptions = document.getElementById("taskOptions");
// const pauseTaskBtn = document.getElementById("pauseTaskBtn");
// const completeTaskBtn = document.getElementById("completeTaskBtn");
// const editTaskBtn = document.getElementById("editTaskBtn");
// const viewDetailsBtn = document.getElementById("viewDetailsBtn");
// const closeModalBtn = document.getElementById(".close");



// const totalCountElement = document.getElementById("total-count");
// const ongoingCountElement = document.getElementById("ongoing-count");
// const completedCountElement = document.getElementById("completed-count");



// addNew.addEventListener("click", () => {
//     addNewTaskForm();
// });


// moreBtn.addEventListener("click", () => {
//     taskOptions.style.display = "flex";
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
//     if(activeTaskId){
//         editTask(activeTaskId);
//     }
//     taskOptions.style.display = "none";
// });

// viewDetailsBtn.addEventListener("click", ()=>{
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if(activeTaskId){
//         showDetailsModal(activeTaskId);
//     }
//     taskOptions.style.display = "none";
// });




// function addNewTaskForm(){
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
//         <input type="date" id="startDate" value="${new Date().toISOString().split("T")[0]}">

//         <select id="status">
//             <option value="ongoing" selected> Ongoing </option>
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
//         addNewTaskForm(taskForm);
//         taskForm.remove();
//     }
// }


// function addNewTask(taskForm){
//     const taskName = taskForm.querySelector("#taskName").value;
//     const priority = taskForm.querySelector("#priority").value;
//     const tag = taskForm.querySelector("#tag").value;
//     const startDate = taskForm.querySelector('#startDate').value;
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

//     const ongoingTask = tasks.find(t => t.status === "ongoing");
//     if(ongoingTask){
//         ongoingTask.status = "paused"
//         saveTimerState(ongoingTask);
//     }

//     if(status === "ongoing"){
//         localStorage.setItem("activeTaskId", taskId);
//         resetTimer();
//     }

//     task.status = status;
//     tasks.push(task);

//     localStorage.setItem("tasks", JSON.stringify(tasks));

//     if(status === "ongoing"){
//         setOngoingTask(task);
//     }

//     updateTaskCounters();
//     renderTaskLists();
// }


// function saveTimerState(task){

//     const timerValue = document.getElementById("timer").textContent;

//     const timeFragment = {
//         date: new Date().toISOString().split('T')[0],
//         start: localStorage.getItem("timerStartTime") || new Date().toISOString(),
//         end: new Date().toISOString(),
//         duration: timerValue
//     };

//     if(!task.timeFragments){
//         task.timeFragments = [];
//     }

//     task.timeFragments.push(timeFragment);


//     if(!task.timeTaken || task.timeTaken === "00:00:00"){
//         task.timeTaken = timerValue;
//     }else{
//         task.timeTaken = addTimes(task.timeTaken, timerValue);
//     }
// }



// function addTimes(time1, time2){
//     const [hours1, minutes1, seconds1] = time1.split(':').map(Number);
//     const [hours2, minutes2, seconds2] = time2.split(':').map(Number);

//     let totalSeconds = seconds1 + seconds2;
//     let totalMinutes = minutes1 + minutes2 + Math.floor(totalSeconds / 60);
//     totalSeconds %= 60;


//     let totalHours = hours1 + hours2 + Math.floor(totalMinutes / 60);
//     totalMinutes %= 60;

//     return `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`

// }


// function resetTimer(){

//     if(typeof timerEnd === 'function'){
//         timerEnd();
//     }else{
//         document.getElementById("timer").textContext = "00:00:00";
//     }

//     localStorage.setItem("timerStartTime", new Date().toISOString());

// }


// function pauseCurrentTask(){
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if (!activeTaskId) return;

//     let tasks = JSON.parse(localStorage.getItem("task")) || [];
//     const task = tasks.find(t => t.id === activeTaskId);

//     if(task){

//         saveTimerState(task);

//         task.status = 'paused';
//         localStorage.setItem("tasks", JSON.stringify(tasks));


//         if(typeof timerPause === 'function'){
//             timerPause();
//         }

//         localStorage.removeItem("activeTaskId");
//         clearOngoingTaskDisplay();

//         updateTaskCounters();
//         renderTaskLists();

//     }
// }

// function completeCurrentTask(){
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if(!activeTaskId) return;

//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     const task = tasks.find(t => t.id === activeTaskId);

//     if(task){
//         saveTimerState(task);

//         task.status = "completed";
//         task.endDate = new Date().toISOString().split("T")[0];
//         localStorage.setItem("task". JSON.stringify(tasks));


//         if(typeof timerEnd === 'function'){
//             timerEnd();
//         }

//         localStorage.removeItem("activeTaskId");
//         clearOngoingTaskDisplay();


//         updateTaskCounters();
//         renderTaskLists();

//     }

// }

// function resumeTask(taskId){
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//     const ongoingTask = tasks.find(t => t.status === "ongoing");
//     if(ongoingTask){
//         saveTimerState(ongoingTask);
//         ongoingTask.status = "paused";
//     }

//     const taskToResume = tasks.find(t => t.id === taskId);
//     if(taskToResume){
//         taskToResume.status = "ongoing";
//         localStorage.setItem("activeTaskId", taskId);

//         resetTimer();


//         if(typeof timerStart === 'function'){
//             timerStart();
//         }


//         setOngoingTask(taskToResume);
//     }

//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     updateTaskCounters();
//     renderTaskLists();
// }


// function completeTask(taskId){
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     const task = tasks.find(t => t.id === taskId);

//     if(task){
//         task.status = "completed";
//         task.endDate = new Date().toISOString.split("T")[0];
//         localStorage.setItem("tasks". JSON.stringify(tasks));


//         if(localStorage.getItem("activeTaskId") === taskId){
//             localStorage.removeItem("activeTaskId");
//             clearOngoingTaskDisplay();


//             if(typeof timerEnd === 'function'){
//                 timerEnd();
//             }
//         }

//         updateTaskCounters();
//         renderTaskLists();
//     }
// }

// function deleteTask(taskId){
//     let tasks = JSON.parse(localStorage.getItem("task")) || [];
//     tasks = tasks.filter(t => t.id !== taskId);
//     localStorage.setItem("tasks", JSON.stringify(tasks));


//     if(localStorage.getItem("activeTaskId") === taskId){
//         localStorage.removeItem("activeTaskId");
//         clearOngoingTaskDisplay();

//         if(typeof timerEnd === 'function'){
//             timerEnd();
//         }
//     }

//     updateTaskCounters();
//     renderTaskLists();

// }

// function setOngoingTask(task){
//     document.getElementById("displayTaskName").textContent = task.name;
//     document.getElementById("displayTag").textContent = task.tag;
//     document.getElementById("displayPriority").textContent = task.priority;
//     document.getElementById("displayStartDate").textContent = task.startDate;
//     document.getElementById("displayStatus").textContent = task.status;
//     document.getElementById("displayTargetTime").textContent = task.targetTime;
    
// }

// function formatTimeFragment(fragments){
//     if(!Array.isArray(fragments) || fragments.length === 0) return "--";
//     const lastThree = fragments.slice(-3);
//     return lastThree.map(frag => `${frag.date}: ${frag.duration}`).join("<br>");
// }

// function updateTaskCounters(){
//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//     const totalCount = tasks.length;
//     const ongoingCount = tasks.filter(t => t.status === "ongoing").length;
//     const completedCount = tasks.filter(t => t.status === "completed").length;


//     totalCountElement.textContent = totalCount;
//     ongoingCountElement.textContent = ongoingCount;
//     completedCountElement.textContent = completedCount
// }

// function renderTaskLists(){
//     renderTaskTable();
//     renderPausedTaskTable();
// }


// function renderTaskTable(){
//     const tableBody = document.getElementById('taskTableBody');
//     tableBody.innerHTML = "";

//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//     tasks.forEach((task, index) => {
//         const row = document.createElement("tr");

//         row.innerHTML = `
//             <td>${index + 1}</td>
//             <td>${task.name}</td>
//             <td>${task.priority}</td>
//             <td>${task.tag}</td>
//             <td>${task.startDate}</td>
//             <td>${task.status}</td>
//             <td>${task.endDate || "--"}</td>
//             <td>${task.timeTaken || "00:00:00"}</td>
//             <td><button onclick="showDetailsModal('${task.id}')">More</button></td>
//         `;

//         tableBody.appendChild(row);
//     });
// }


// function renderPausedTaskTable(){
//     const pausedTableBody = document.getElementById('pausedTaskTableBody');
//     if(!pausedTableBody) return;

//     pausedTableBody.innerHTML = "";

//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     const pausedTasks = tasks.filter(t => t.status === "paused");


//     pausedTasks.forEach((task, index) => {
//         const row = document.createElement("tr");

//         row.innerHTML =`
//             <td>${task.id.slice(-4)}</td>
//             <td>${task.name}</td>
//             <td>${task.priority}</td>
//             <td>${task.tag}</td> 
//             <td>${task.status}</td>
//             <td>${task.startDate}</td>
//             <td>${task.status}</td>
//             <td>${task.endDate || "--"}</td>
//             <td>${task.timeTaken || "00:00:00"}</td>
//             <td><button onclick="showDetailsModal('${task.id}')">More</button></td>  
//         `;

//         pausedTableBody.appendChild(row);
//     });
// }


// function showDetailsModal(taskId){
//     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     const task = tasks.find(t => t.id === taskId);


//     if(!task) return;


//     const modal = document.createElement("div");
//     modal.classList.add("modal");

//     modal.innerHTML = `
//         <div class="modal-content">
//             <span class="close">&times;</span>
//             <h2>${task.name}</h2>
//             <p><strong>Priority:</strong>${task.priority}</p>
//             <p><strong>Tag:</strong>${task.tag}</p>
//             <p><strong>Status:</strong>${task.status}</p>
//             <p><strong>Start Date:</strong>${task.startDate}</p>
//             <p><strong>End Date:</strong>${task.endDate || "--"}</p>
//             <p><strong>Target Date:</strong>${task.targetTime}</p>
//             <p><strong>Total Time Taken:</strong>${task.timeTaken || "00:00:00"}</p>
//             <p><strong>Description:</strong>${task.details}</p>



//             <h3>Time Details</h3>
//             <div class="time-fragments">
//                 ${(task.taimeFragments || []).map(f => `
//                     <div class="time-fragment">
//                         <p>${f.date}: ${f.duration}</p>
//                     </div>
//                 `).join("")}
//             </div>

//             <div class="modal-actions">
//                 ${task.status === "paused" ? `<button onclick="resumeTask('${task.id}')">Resume Task</button>` : ""}
//                 <button onclick="editTask('${task.id}')">Edit task</button.
//                 <button onclick="viewTaskDetails('${task.id}')">Details</button>
//                 ${task.status !== "completed" ? `<button onclick="completeTask('${task.id}')">Completed Task</button>` : ""}
//                 <button onclick="deleteTask('${task.id}')">Delete Task</button>
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
//         task.status = status;
        
//         if (previousStatus !== "ongoing" && status === "ongoing") {
//             // Task is becoming active, set as active task
//             const currentActive = tasks.find(t => t.id !== taskId && t.status === "ongoing");
//             if (currentActive) {
//                 currentActive.status = "paused";
//                 saveTimerState(currentActive);
//             }
            
//             localStorage.setItem("activeTaskId", taskId);
//             resetTimer();
//             setOngoingTask(task);
            
//             if (typeof timerStart === 'function') {
//                 timerStart();
//             }
//         } else if (previousStatus === "ongoing" && status !== "ongoing") {
//             // Task is no longer active
//             saveTimerState(task);
//             localStorage.removeItem("activeTaskId");
//             clearOngoingTaskDisplay();
            
//             if (typeof timerEnd === 'function') {
//                 timerEnd();
//             }
//         }
        
//         task.targetTime = targetTime;
//         task.details = details;
        
//         if (status === "completed" && !task.endDate) {
//             task.endDate = new Date().toISOString().split("T")[0];
//         }
        
//         localStorage.setItem("tasks", JSON.stringify(tasks));
//         updateTaskCounters();
//         renderTaskLists();
        
//         modal.remove();
//     };
    
//     document.body.appendChild(modal);
// }

// function viewTaskDetails(taskId) {
//     // Navigate to a detailed view page (can be implemented later)
//     alert("Detailed view for task ID: " + taskId + " (This will be implemented in the future)");
// }

// // Initialize the task lists
// updateTaskCounters();
// renderTaskLists();

// // Restore active task if exists
// function restoreActiveTask() {
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if (activeTaskId) {
//         const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//         const activeTask = tasks.find(t => t.id === activeTaskId && t.status === "ongoing");
        
//         if (activeTask) {
//             setOngoingTask(activeTask);
            
//             // Resume timer if there's an active task
//             if (typeof timerStart === 'function') {
//                 timerStart();
//             }
//         } else {
//             // No valid active task, clear it
//             localStorage.removeItem("activeTaskId");
//             clearOngoingTaskDisplay();
//         }
//     } else {
//         clearOngoingTaskDisplay();
//     }
// }

// // Initialize everything
// window.addEventListener("DOMContentLoaded", () => {
//     restoreActiveTask();
//     updateTaskCounters();
//     renderTaskLists();
// });

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

// Initialize event listeners
addNew.addEventListener("click", () => {
    addNewTaskForm();
});

moreBtn.addEventListener("click", () => {
    taskOptions.style.display = "flex";
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

    // If there's an ongoing task, pause it
    const ongoingTask = tasks.find(t => t.status === "ongoing");
    if (ongoingTask) {
        ongoingTask.status = "paused";
        // Save the current timer state as a time fragment
        saveTimerState(ongoingTask);
    }

    if (status === "ongoing") {
        // Set this task as the active task
        localStorage.setItem("activeTaskId", taskId);
        // Reset timer
        resetTimer();
    }

    task.status = status;
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    if (status === "ongoing") {
        setOngoingTask(task);
    }
    
    updateTaskCounters();
    renderTaskLists();
}

function saveTimerState(task) {
    // Get current timer values
    const timerValue = document.getElementById("timer").textContent;
    
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
    if (typeof timerEnd === 'function') {
        timerEnd();
    } else {
        document.getElementById("timer").textContent = "00:00:00";
    }
    
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
        if (typeof timerPause === 'function') {
            timerPause();
        }
        
        // Clear active task
        localStorage.removeItem("activeTaskId");
        clearOngoingTaskDisplay();
        
        // Update UI
        updateTaskCounters();
        renderTaskLists();
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
        if (typeof timerEnd === 'function') {
            timerEnd();
        }
        
        // Clear active task
        localStorage.removeItem("activeTaskId");
        clearOngoingTaskDisplay();
        
        // Update UI
        updateTaskCounters();
        renderTaskLists();
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
        
        // Reset timer
        resetTimer();
        
        // Start timer
        if (typeof timerStart === 'function') {
            timerStart();
        }
        
        // Update UI
        setOngoingTask(taskToResume);
    }
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskCounters();
    renderTaskLists();
}

function completeTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.status = "completed";
        task.endDate = new Date().toISOString().split("T")[0];
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        // If this was the active task, clear it
        if (localStorage.getItem("activeTaskId") === taskId) {
            localStorage.removeItem("activeTaskId");
            clearOngoingTaskDisplay();
            
            // Stop timer
            if (typeof timerEnd === 'function') {
                timerEnd();
            }
        }
        
        // Update UI
        updateTaskCounters();
        renderTaskLists();
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
        if (typeof timerEnd === 'function') {
            timerEnd();
        }
    }
    
    // Update UI
    updateTaskCounters();
    renderTaskLists();
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
            <td>${task.status}</td>
            <td>${task.startDate}</td>
            <td>${task.endDate || "--"}</td>
            <td>${task.timeTaken || "00:00:00"}</td>
            <td>${formatTimeFragment(task.timeFragments)}</td>
            <td><button onclick="showDetailsModal('${task.id}')">More</button></td>
        `;
        
        pausedTableBody.appendChild(row);
    });
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
                <button onclick="viewTaskDetails('${task.id}')">📄 Go to Details Page</button>
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
        task.status = status;
        
        if (previousStatus !== "ongoing" && status === "ongoing") {
            // Task is becoming active, set as active task
            const currentActive = tasks.find(t => t.id !== taskId && t.status === "ongoing");
            if (currentActive) {
                currentActive.status = "paused";
                saveTimerState(currentActive);
            }
            
            localStorage.setItem("activeTaskId", taskId);
            resetTimer();
            setOngoingTask(task);
            
            if (typeof timerStart === 'function') {
                timerStart();
            }
        } else if (previousStatus === "ongoing" && status !== "ongoing") {
            // Task is no longer active
            saveTimerState(task);
            localStorage.removeItem("activeTaskId");
            clearOngoingTaskDisplay();
            
            if (typeof timerEnd === 'function') {
                timerEnd();
            }
        }
        
        task.targetTime = targetTime;
        task.details = details;
        
        if (status === "completed" && !task.endDate) {
            task.endDate = new Date().toISOString().split("T")[0];
        }
        
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateTaskCounters();
        renderTaskLists();
        
        modal.remove();
    };
    
    document.body.appendChild(modal);
}

function viewTaskDetails(taskId) {
    // Navigate to a detailed view page (can be implemented later)
    alert("Detailed view for task ID: " + taskId + " (This will be implemented in the future)");
}

// Initialize the task lists
updateTaskCounters();
renderTaskLists();

// Restore active task if exists
function restoreActiveTask() {
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (activeTaskId) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const activeTask = tasks.find(t => t.id === activeTaskId && t.status === "ongoing");
        
        if (activeTask) {
            setOngoingTask(activeTask);
            
            // Resume timer if there's an active task
            if (typeof timerStart === 'function') {
                timerStart();
            }
        } else {
            // No valid active task, clear it
            localStorage.removeItem("activeTaskId");
            clearOngoingTaskDisplay();
        }
    } else {
        clearOngoingTaskDisplay();
    }
}

// Initialize everything
window.addEventListener("DOMContentLoaded", () => {
    restoreActiveTask();
    updateTaskCounters();
    renderTaskLists();
});

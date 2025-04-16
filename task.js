const addNew = document.getElementById("addTaskBtn");

addNew.addEventListener("click", () => {
    addNewTaskForm()
})

function addNewTaskForm(){
    const taskForm = document.createElement("div");
    // taskForm.id = "newTaskForm"
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
        <input type="date" id="startDate" >

        <select id="status">
            <option value="ongoing" selected> Ongoing </option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
        </select>

        <input type="date" id="targetTime" placeholder="Target Time" required>
        <input type="text" id="details" placeholder="Details" required>

        <button id="addTaskBtnModal">Add Task</button>

    </div>
    `;

    // const section = document.querySelector(".task-table");
    // section.insertBefore(taskForm, document.getElementById("taskTable"));

    document.body.appendChild(taskForm);
    taskForm.style.display = "block";

    taskForm.querySelector(".close").onclick = () => taskForm.remove();

    taskForm.querySelector("#addTaskBtnModal").onclick = () => {
        addNewTask(taskForm);
        taskForm.remove();
    }
};


// function addNewTask() {
//     const name = document.getElementById("taskName").value;
//     const priority = document.getElementById("priority").value;
//     const tag = document.getElementById("tag").value;
//     const startDate = document.getElementById("startDate").value;
//     const status = document.getElementById("status").value;
//     const targetTime = document.getElementById("targetTime").value;
//     const details = document.getElementById("details").value;

//     const task = document.createElement("div");
//     task.className = "task";
//     task.innerHTML = `
//         <h3>Ongoing Task</h3>
//         <p><strong>Name:</strong>${name}</p>
//         <p><strong>Priority:</strong> ${priority}</p>
//         <p><strong>Tag:</strong> ${tag}</p>
//         <p><strong>Start Date:</strong> ${startDate}</p>
//         <p><strong>Status:</strong> ${status}</p>
//         <p><strong>Target Time:</strong> ${targetTime}</p>
//         <p><strong>Details:</strong> ${details}</p>
//     `;

//     // document.querySelector(".active-task-panel").appendChild(task);
//     document.getElementById("taskList").appendChild(task);
// }

function addNewTask(taskForm) {
    const taskName = document.getElementById("taskName").value;
    const priority = document.getElementById("priority").value;
    const tag = document.getElementById("tag").value;
    const startDate = document.getElementById("startDate").value;
    const status = document.getElementById("status").value;
    const targetTime = document.getElementById("targetTime").value;
    const details = document.getElementById("details").value;


    // const taskList = document.getElementById("taskList");
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
        timeFragments: []
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const ongoing = tasks.find(t => t.status === "ongoing");

    if(ongoing){
        ongoing.status = "paused";
    }

    task.status = "ongoing";
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    setOngoingTask(task);
    renderTaskList();

}



function setOngoingTask(task){
    document.getElementById("displayTaskName").textContent = task.name;
    document.getElementById("displayTag").textContent = task.tag;
    document.getElementById("displayPriority").textContent = task.priority;
    document.getElementById("displayStartDate").textContent = task.startDate;
    document.getElementById("displayStatus").textContent = task.status;
    document.getElementById("displayTargetTime").textContent = task.targetTime;
    // document.getElementById("displayTaskName").textContent = taskName;

}
    // task.innerHTML = `
    //     <h3>${taskName}</h3>
    //     <p><strong>Tag:</strong> ${tag}</p>
    //     <p><strong>Priority:</strong> ${priority}</p>
    //     <p><strong>Start Date:</strong> ${startDate}</p>
    //     <p><strong>Status:</strong> ${status}</p>
    //     <p><strong>Target Time:</strong> ${targetTime}</p>
    //     <p><strong>Details:</strong> ${details}</p>
    // `;

    // taskList.appendChild(task);



  

    // // if(!name|| !startDate || !status || !timeTaken){
    // //     alert("Please fill all required ")
    // //     return;,
    // // }

    
    // tasks.push(newTask);
    // tableData();

// document.getElementById("new-task").addEventListener("click", () => {
//     if(!document.getElementById("newTaskForm")){
//         addNewTaskForm()
//         addNewTask()

//     }
// });


function renderTaskList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.filter(t => t.status === "paused").forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.className = "task-card";
        taskCard.innerHTML = `
            <h3>${task.name}</h3>
            <p><strong>Tag:</strong> ${task.tag}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Start:</strong> ${task.startDate}</p>
            <p><strong>Target:</strong> ${task.targetTime}</p>
            <button onclick="resumeTask('${task.id}')">Resume</button>
            <button onclick="viewTaskDetails('${task.id}')">Details</button>
            <button onclick="completeTask('${task.id}')">Complete</button>
            <button onclick="deleteTask('${task.id}')">Delete</button>
        `;
        taskList.appendChild(taskCard);
    });
}

function viewTaskDetails(id) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>Task Details</h3>
            <p><strong>Name:</strong> ${task.name}</p>
            <p><strong>Details:</strong> ${task.details}</p>
            <h4>Time Fragments</h4>
            ${task.timeFragments.map(f => `
                <div>
                    <p><strong>Start:</strong> ${new Date(f.start).toLocaleString()}</p>
                    <p><strong>End:</strong> ${new Date(f.end).toLocaleString()}</p>
                    <p><strong>Duration:</strong> ${f.duration}</p>
                </div>
            `).join("")}
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = "block";
    modal.querySelector(".close").onclick = () => modal.remove();
}

function resumeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(t => t.status = (t.id === id ? "ongoing" : t.status === "ongoing" ? "paused" : t.status));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTaskList();
    const resumedTask = tasks.find(t => t.id === id);
    setOngoingTask(resumedTask);
}

function completeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks.find(t => t.id === id);
    task.status = "completed";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTaskList();
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTaskList();
}

renderTaskList();

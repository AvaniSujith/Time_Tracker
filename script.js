// const ctx = document.getElementById('myChart');

// new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# ofVotes',
//             data: [12, 19, 3, 5, 2, 3],
//             borderWidth: 1

//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero:true
//             }
//         }
//     }
// });

// const ctx = document.getElementById('myChart');
      
// new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// });

const sidebar = document.querySelector('.sidebar-aside');
const toggleBtn = document.querySelector(".toggler");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapse")
})


// let tasks =[
//     {
//         id:1,
//         name: "Learn Javascript",
//         priority: "high",
//         tag:"JAVASCIPT",
//         startDate:"11-04-2025",
//         status: "Ongoing",
//         endDate: "",
//         timeTaken: "12:00:00",
//         details:"Learning Javascript topics like hoisting, promises, etc"
//     },
//     {
//         id:2,
//         name: "CSS tutuorial",
//         priority: "medium",
//         tag:"CSS",
//         startDate:"10-04-2025",
//         status: "Paused",
//         endDate: "",
//         timeTaken: "12:00:00",
//         details:"Learning posiiton, display etc"
//     },
//     {
//         id:3,
//         name: "Debugging",
//         priority: "low",
//         tag:"DEBUG",
//         startDate:"09-04-2025",
//         status: "Paused",
//         endDate: "",
//         timeTaken: "12:00:00",
//         details:"Debugging"
//     }
// ]


let tasks = JSON.parse(localStorage.getItem("task")) || [];

function formatTimeFragment(fragments){
    if(!Array.isArray(fragments)) return "--";
    const lastThree = fragments.slice(-3);
    return lastThree.map(frag => `${frag.date}: ${frag.duration}`).join("<br>");
}

function tableData(){
    const tableBody = document.getElementById('taskTableBody')
    tableBody.innerHTML = "";

    tasks.forEach((task, index) => {
        const row = document.createElement("tr");


        row.innerHTML = `
            <td>${index+1}</td>
            <td>${task.name}</td>
            <td>${task.priority}</td>
            <td>${task.tag}</td>
            <td>${task.startDate}</td>
            <td>${task.status}</td>
            <td>${task.endDate || "--"}</td>
            <td>${task.timeTaken || "00:00:00"}</td>
            <td>${formatTimeFragment(task.timeFragments)}</td>
            <td><button onClick="showDetails(${task.id})">More</button></td>
            `;

            tableBody.appendChild(row)
    })

}

// tableData();

function showDetails(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if(!task) return;

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${task.name}</h2>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Tag:</strong> ${task.tag}</p>
            <p><strong>Start Date:</strong> ${task.startDate}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <p><strong>End Date:</strong> ${task.endDate || "--"}</p>
            <p><strong>Total Time Taken:</strong> ${task.timeTaken || "00:00:00"}</p>
            <p><strong>Details:</strong> ${task.details}</p>
            <p><strong>Time Fragments:</strong><br>${(task.timeFragments || []).map(f => `${f.date}: ${f.duration}`).join("<br>")}</p>
            <div class="modal-actions">
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="resumeTask(${task.id})">Resume Timer</button>
                <button onclick="completeTask(${task.id})">Mark Completed</button>
            </div>
        </div>
    `;

    modal.querySelector(".close").onClick = () =>  modal.remove();
    document.body.appendChild(modal);
}


function editTask(taskId){
    const task = tasks.find( t=> t.id === taskId);
    if (!task) return;

    const existingModal = document.querySelector(".modal");
    if(existingModal) existingModal.remove();

    const taskForm = document.createElement("div");
    taskForm.classList.add("modal");

    taskForm.innerHTML = `
         <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${task.name}</h2>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Tag:</strong> ${task.tag}</p>
            <p><strong>Start Date:</strong> ${task.startDate}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <p><strong>End Date:</strong> ${task.endDate || "--"}</p>
            <p><strong>Total Time Taken:</strong> ${task.timeTaken || "00:00:00"}</p>
            <p><strong>Details:</strong> ${task.details}</p>
            <p><strong>Time Fragments:</strong><br>${(task.timeFragments || []).map(f => `${f.date}: ${f.duration}`).join("<br>")}</p>
            <div class="modal-actions">
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="resumeTask(${task.id})">Resume Timer</button>
                <button onclick="completeTask(${task.id})">Mark Completed</button>
            </div>
        </div>
    `;


    modal.querySelector(".close").onClick = () => modal.remove();
    document.body.appendChild(modal);
}

function editTask(taskId){
    const task = tasks.find(t => t.id === taskId);
    if(!task) return;

    const existingModal = document.querySelector(".modal");
    if(existingModal) existingModal.remove();

    const taskForm = document.createElement("div");
    taskForm.classList.add("modal");

    taskForm.innerHTML = `
        <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Edit Task</h2>
        <input type="text" id="taskName" value="${task.name}" required>
        <select id="priority">
            <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
            <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
        </select>
        <input type="text" id="tag" value="${task.tag}" required>
        <input type="date" id="startDate" value="${task.startDate}" required>
        <select id="status">
            <option value="ongoing" ${task.status === 'ongoing' ? 'selected' : ''}>Ongoing</option>
            <option value="paused" ${task.status === 'paused' ? 'selected' : ''}>Paused</option>
            <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
        </select>
        <input type="date" id="targetTime" value="${task.targetTime || ''}">
        <input type="text" id="details" value="${task.details}" required>
        <button id="updateTaskBtn">Update Task</button>
    </div>`;

    taskForm.querySelector(".close").onclick = () => taskForm.remove();
    taskForm.querySelector("#updateTaskBtn").onClick = () => {
        task.name = document.getElementById("taskName").value;
        task.priority = document.getElementById("priority").value;
        task.tag = document.getElementById("tag").value;
        task.startDate = document.getElementById("startDate").value;
        task.status = document.getElementById("status").value;
        task.targetTime = document.getElementById("targetTime").value;
        task.details = document.getElementById("details").value;

        localStorage.setItem("tasks", JSON.stringify(tasks));
        tableData();
        taskForm.remove();
    };
    document.body.appendChild(taskForm);
}

function resumeTask(taskId){
    localStorage.setItem("actvieTaskId", taskId);
    localStorage.setItem("timerStartTime", new Date().toISOString());
    
    alert(`Resume timer for task ID ${taskId} (implement logic in timer.js)`);
}


function completeTask(taskId){
    const task = tasks.find(t => t.id === taskId);
    if(!task) return;
    task.status = "completed";
    task.endDate = new Date().toISOString().split("T")[0];

    localStorage.setItem("tasks", JSON.stringify(tasks));
    tableData();

    const modal = document.querySelector(".modal");
    if(modal) modal.remove();

}

tableData();
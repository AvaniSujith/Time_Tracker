const applyFilterBtn = document.getElementById('applyFiltersBtn');

applyFilterBtn.addEventListener("click", filteration);


function filteration(){
    const filterName = document.getElementById("filterName");
    const filterTag = document.getElementById("filterTag");
    const filterPriority = document.getElementById("filterPriority");
    const filterStatus = document.getElementById("filterStatus");
    const filterStartDate = document.getElementById("filterStartDate");
    const filterEndDate = document.getElementById("filterEndDate");

    const name = filterName.value.trim().toLowerCase();
    const tag = filterTag.value.trim().toUpperCase();
    const priority = filterPriority.value;
    const status = filterStatus.value;    
    const startDate = filterStartDate.value;
    const endDate = filterEndDate.value;


    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];


    const filteredTasks = allTasks.filter(task => {

        const checkName = !name || task.name.toLowerCase().includes(name);
        const checkTag = !tag || task.tag.toUpperCase().includes(tag);
        const checkPriority = !priority || task.priority === priority;
        const checkStatus = !status || task.status === status;
        // const checkStartDate = !startDate || (task.startDate >= startDate && task.endDate <= endDate);
        const checkDate = (!startDate || task.startDate >= startDate) && (!endDate || task.endDate <= endDate);
        // const checkEndDate = !endDate || (task.endDate >= startDate && task.endDate <= endDate);

        return checkName && checkTag && checkPriority && checkStatus && checkDate;
        
    });

    const tbody = document.getElementById("searchResultsTableBody");
    tbody.innerHTML = "";

    if(filteredTasks.length === 0){
        tbody.innerHTML = "<tr><td colspan='9'>No tasks</td><tr>";
        return;
    }

    filteredTasks.forEach(task => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.priority}</td>
            <td>${task.tag}</td>
            <td>${task.status}</td>
            <td>
                <button class="action-btn more-btn" onclick="viewDetails('${task.id}')">More</button>
            </td>
        `;

        tbody.appendChild(row);

    });
}

function viewDetails(taskId){
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = allTasks.find(t => t.id === taskId);

    const taskDetailsModal = document.getElementById("taskDetailsModal");
    const detailsContainer = document.getElementById("taskDetailsContent");

    if(!taskDetailsModal || !detailsContainer){

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

// if(applyFilterBtn){
//     applyFilterBtn.addEventListener("click", () => {
//         applyFilterBtn.innerText = "Reset Filters"
//     });
// };

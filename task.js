const addNew = document.getElementById("new-task");

function addNewTaskForm(){
    const taskForm = document.createElement("div");
    taskForm.id = "newTaskForm"


    taskForm.innerHTML = `
        <input type="text" id="taskName" placeholder="Task Name" required>
        <select id="priority">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
        <input type="text" id="tag" placeholder="Tag" required>
        <input type="date" id="startDate" >
        <input type="text" id="status" >
        <input type="text" id="timeTaken" required>
        <input type="text" id="details" placeholder="Details" required>
        <button onClick="addNewTask()">Add Task</button>
    `;

    const section = document.querySelector(".task-table");
    section.insertBefore(taskForm, document.getElementById("taskTable"));
};


function addNewTask(){
    const name = document.getElementById("taskName").value;
    const priority = document.getElementById("priority").value;
    const tag = document.getElementById("tag").value;
    const startDate = document.getElementById("startDate").value;
    const status = document.getElementById("status").value;
    const timeTaken = document.getElementById("timeTaken").value;
    const taskDetail= document.getElementById("details").value;


    

    const newTask = {
        id: tasks.length+1,
        name,
        priority,
        tag,
        startDate,
        status,
        endDate:" ",
        timeTaken,
        taskDetail
    };

    // if(!name|| !startDate || !status || !timeTaken){
    //     alert("Please fill all required ")
    //     return;,
    // }

    
    tasks.push(newTask);
    tableData();
}


document.getElementById("new-task").addEventListener("click", () => {
    if(!document.getElementById("newTaskForm")){
        addNewTaskForm()
        addNewTask()

    }
})
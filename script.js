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

let tasks =[
    {
        id:1,
        name: "Learn Javascript",
        priority: "high",
        tag:"JAVASCIPT",
        startDate:"11-04-2025",
        status: "Ongoing",
        endDate: "",
        timeTaken: "12:00:00",
        details:"Learning Javascript topics like hoisting, promises, etc"
    },
    {
        id:2,
        name: "CSS tutuorial",
        priority: "medium",
        tag:"CSS",
        startDate:"10-04-2025",
        status: "Paused",
        endDate: "",
        timeTaken: "12:00:00",
        details:"Learning posiiton, display etc"
    },
    {
        id:3,
        name: "Debugging",
        priority: "low",
        tag:"DEBUG",
        startDate:"09-04-2025",
        status: "Paused",
        endDate: "",
        timeTaken: "12:00:00",
        details:"Debugging"
    }
]


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
            <td>${task.timeTaken}</td>
            <td><button onClick="showDetails(${task.id})">More details</button></td>
            `;

            tableBody.appendChild(row)
    })

}

tableData();
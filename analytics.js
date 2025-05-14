
// function createGraph(startDate){
//     const grid = document.getElementById("gridBlock");
//     grid.innerHTML = "";

//     grid.style.display = "grid";
//     grid.style.gridTemplateColumns = `50px repeat(7, 1fr)`;
//     // grid.style.columnGap = '30px';
//     grid.style.gridTemplateRows = `40px repeat(15, 45px)`;

//     grid.appendChild(document.createElement("div"));

//     const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// //     for(let i = 0; i <dayNames.length; i++){
// //         const day = document.createElement("div");
// //         day.classList.add("day-x")
// //         day.textContent = dayNames[i];
// //         grid.appendChild(day);
// //     }

// //     for(let hour = 12; hour >= 1; hour --){ 
// //         const hourLabel = document.createElement("div");
// //         hourLabel.classList.add("hour-y")
// //         hourLabel.textContent = `${hour}hr`;
// //         grid.appendChild(hourLabel);


// //         for(let day = 0; day < 7; day++){
// //             const box = document.createElement("div");
// //             box.classList.add("grid-cell"); 
// //             box.dataset.row = hour;
// //             box.dataset.col = day + 1;
// //             box.style.border = "1px solid #ccc";
// //             grid.appendChild(box)
// //         }
// //     }
// // }

// // function formatDate(date){
// //     return date.toISOString().split("T")[0];
// // }

// // function displayWeekRange(startDate){
// //     const endDate = new Date(startDate);
// //     endDate.setDate(startDate.getDate() + 6);

// //     const label = document.getElementById("weekLabel");
// //     label.textContent = `${formatDate(startDate)} - ${formatDate(endDate)}`
// // }

// // function getWeekStartDate(){
// //     const today = new Date();
// //     const day = today.getDay();
// //     const diff = (day === 0 ? -6 : 1 - day);
// //     const startDate = new Date(today);
// //     startDate.setDate(today.getDate() + diff)
// //     return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
// // }


// // function addDays(date, days){
// //     const result = new Date(date);
// //     result.setDate(date.getDate() + days);
// //     return result;
// // }

// // function renderWeekGraph(){
// //     const weekStart = getWeekStartDate();
// //     displayWeekRange(weekStart);
// //     createGraph(weekStart);

// //     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// //     tasks.forEach(task => {
// //         (task.timeFragments || []).forEach(fragment => {
// //             const fragmentDate = new Date(fragment.date);
// //             const fragmentDayIndex = (fragmentDate.getDate() + 6) % 7;
            
// //             if(fragmentDate >= weekStart && fragmentDate < addDays(weekStart, 7)){
// //                 const hours = parseInt(fragment.duration.split(":")[0]);

// //                 for(let h = 0; h < hours; h++){
// //                     const hour = 12 - h;
// //                     const cell = document.querySelector(`.grid-cell[data-row="${hour}"][data-col="${fragmentDayIndex + 1}"]`);
// //                     if(cell){
// //                         cell.style.backgroundColor = "#76c7c0";
// //                         cell.title = `${task.title || "Task"} (${fragment.duration})`;
// //                     }
// //                 }
// //             }
// //         });
// //     });
// // }

// // // function renderWeekGraph(){
// // //     const weekStart = getWeekStartDate();
// // //     displayWeekRange(weekStart);
// // //     createEmptyWeeklyGrid(weekStart);
// // // }

// // document.addEventListener("DOMContentLoaded", () => {
// //     renderWeekGraph();
// // });


// const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// const gridContainer = document.getElementById("gridContainer");


// function generateWeeklyGraph(){
//     gridContainer.innerHTML = "";

//     gridContainer.style.display = "grid";
//     gridContainer.style.gridTemplateColumns = `50px repeat(${colNum}, 1fr)`;
//     gridContainer.style.gridTemplateRows = `40px repeat(${rowNum}, 1fr)`;

//     const headerBlock = document.createElement("div");
//     headerBlock.textContent = "";
//     gridContainer.appendChild(headerBlock);

//     for(let i = 0; i < weekDays.length;i++){
//         const day = document.createElement("div");
//         day.textContent = weekDays[i];
//         gridContainer.appendChild(day)
//     }

//     for(let hour = 12; hour >= 1; hour--){
//         const label = document.createElement("div");
//         label.textContent = `${hour}hr`;
//         gridContainer.appendChild(label);

//         for(let day = 0; day < colName; day++){
//             const cell = document.createElement("div");
//             cell.classList.add("box");
//             cell.classList.add(`row-${hour}`, `col-${day + 1}`);
//             gridContainer.appendChild(cell);
//         }
//     }
// }


 
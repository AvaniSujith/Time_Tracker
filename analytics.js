
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

const GRAPH_SETTINGS = {
    timeUnit: "hours",
    period: "1week",
};

export const createGraph = (graphContainer) => {

    const container = document.getElementById("graphContainer");
    if(!container) return;

    const wrapper = document.createElement("div");
    wrapper.className = "analytics-wrapper";

    const controls = buildControls();
    const graph = document.createElement("div");
    graph.className = "analytics-graph"

    wrapper.appendChild(controls);
    wrapper.appendChild(graph);
    container.innerHTML = "";
    container.appendChild(wrapper);

    bindGraphEvents(controls, graph);
    renderGraph(graph);
};

const buildControls = () => {
    const controlPanel = document.createElement("div");
    controlPanel.className = "graph-controls";

    controlPanel.innerHTML = `
        <label>Period:
            <select id="period-select">
                <option value="1week">1 Week</option>
                <option value="2week">2 Week</option>
                <option value="1month">1 Month</option>
                <option value="6month">6 Month</option>
                <option value="1year">1 Year</option>
            </select>
        </label>
        <label>Unit:
            <select id="unit-select">
                <option value="hours">Hours</option>
                <option value="minutes">Minutes</option>
            </select>
        </label>
    `;

    return controlPanel;
};

const bindGraphEvents = (controls, graph) => {
    controls.querySelector('#period-select').addEventListener("change", (e) => {
        GRAPH_SETTINGS.period = e.target.value;
        renderGraph(graph);
    });
    controls.querySelector('#unit-select').addEventListener("change", (e) => {
        GRAPH_SETTINGS.timeUnit = e.target.value;
        renderGraph(graph);
    });
};

const renderGraph = (graph) => {
    graph.innerHTML = "";

    const data = fetchLocalStorageDate();
    const filtered  = filterDataByPeriod(data, GRAPH_SETTINGS.period);

    const maxTime = getMaxTime(filtered);
    const normalizedMax = normalizeMaxTime(maxTime, GRAPH_SETTINGS.timeUnit);
    
    const yLabels = generateYAxisLabels(normalizedMax, GRAPH_SETTINGS.timeUnit);
    const xLabels = filtered.map(d => formatDate(d.date));

    const grid = document.createElement("div");
    grid.className = "grid";
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `auto repeat(${xLabels.length}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${yLabels.length}, 1fr) auto`;

    yLabels.slice().reverse().forEach(label => {
        const yCell = document.createElement("div");
        yCell.className = "cell y-label";
        yCell.textContent = label;
        grid.appendChild(yCell);
    });

    filtered.forEach((entry, colIndex) => {
        const timeVal = GRAPH_SETTINGS.timeUnit === "hours" ? entry.hours : entry.minutes;

        yLabels.slice().reverse().forEach(label => {
            const threshold = labelToMinutes(label, GRAPH_SETTINGS.timeUnit);
            const bar = document.createElement("div");
            bar.className = "cell graph-cell";

            if(timeVal >= threshold){
                bar.style.backgroundColor = "#4CAF50";
            }

            grid.appendChild(bar);
        });
    });

    const empty = document.createElement("div");
    empty.className = "cell x-label";
    grid.appendChild(empty);

    xLabels.forEach(label => {
        const xCell = document.createElement("div");
        xCell.className = "cell x-label";
        xCell.textContent = label;
        grid.appendChild(xCell);
    });

    graph.appendChild(grid);
};

const fetchLocalStorageDate = () => {
    const raw = localStorage.getItem("taskData");
    if(!raw) return [];

    let tasks;
    try{
        tasks = JSON.parse(raw);

    }catch{
        return [];
    }

    const dateMap = new Map();

    for(const task of tasks){
        if(!task.timeFragments || !Array.isArray(task.timeFragments)) continue;

        for(const fragment of task.timeFragments){
            const date = fragment.date;
            const duration = parseDurationToMinutes(fragment.duration);

            if(!dateMap.has(date)){
                dateMap.set(date, 0)
            }
            dateMap.set(date, dateMap.get(date) + duration);
        }
    }

    return Array.from(dateMap.entries()).map(([date, totalMinutes]) => ({
        date,
        minutes: totalMinutes,
        hours: +(totalMinutes / 60).toFixed(2)
    }));
};

const parseDurationToMinutes = (durationStr) => {
    const parts = durationStr.split(":").map(Number);
    const [hh, mm, ss] = parts;
    return hh * 60 + mm + ss / 60;
}


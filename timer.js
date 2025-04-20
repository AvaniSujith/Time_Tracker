// // let [seconds, minutes, hours] = [0,0,0,];


// let seconds = 0;
// let minutes = 0;
// let hours = 0;

// let displayTime = document.getElementById("timer");
// let startBtn = document.getElementById("startTimerBtn");
// let pauseBtn = document.getElementById("pauseTimerBtn");
// let endBtn = document.getElementById("endTimerBtn");

// let timer = null;

// function stopWatch(){
//     seconds++;
//     if(seconds === 60){
//         seconds = 0;
//         minutes++;
//         if(minutes === 60){
//             minutes = 0;
//             hours++;
//         }
//     }

//     let hrs = hours < 10 ? "0" + hours : hours;
//     let min = minutes < 10 ? "0" + minutes : minutes;
//     let sec = seconds < 10 ? "0" + seconds : seconds;

//     // displayTime.innerHTML = hrs + ":" + min + ":" + sec;
//     // return `${hours} : ${minutes} : ${seconds}`;
//     displayTime.innerHTML = `${hrs}:${min}:${sec}`;
    
// }

// // function watching(){
// //     displayTime.textContent = stopWatch()
// // }
// // // stopWatch(); 

// // setTimeInterval(() => {
// //     watching();
// // }, 200);

// function timerStart(){
//     if(timer !== null){
//         clearInterval(timer);
//     }
//     timer = setInterval(stopWatch, 1000);
// }

// function timerPause(){
//     clearInterval(timer);
// }

// function timerEnd(){

//     clearInterval(timer);
//     seconds = 0;
//     minutes = 0;
//     hours = 0;

//     displayTime.innerHTML = "00:00:00"
// }

// startBtn.addEventListener("click", timerStart);
// pauseBtn.addEventListener("click", timerPause);
// endBtn.addEventListener("click", timerEnd);



// let seconds = 0;
// let minutes = 0;
// let hours = 0;

// let displayTime = document.getElementById("timer");
// let startBtn = document.getElementById("startTimerBtn");
// let pauseBtn = document.getElementById("pauseTimerBtn");
// let endBtn = document.getElementById("endTimerBtn");

// let timer = null;

// function initializeTimer(){
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if(activeTaskId){
//         const timerStartTime = localStorage.getItem(timerStartTime);
//         if(timerStartTime){
//             const startTime = new Date(timerStartTime);
//             const now = new dateToday();
//             const elapsedSeconds = Math.floor(now - startTime / 1000);


//             seconds = elapsedSeconds % 60;
//             minutes = Math.floor(elapsedSeconds / 60) % 60 ;
//             hours = Math.floor(elapsedSeconds / 3600);

//             updateTimerDisplay();

//             timerstart();
//         }
//     }
// }


// function updateTimerDisplay(){

//     let hrs = hours < 10 ? "0" + hours : hours;
//     let min = minutes < 10 ? "0" + minutes : minutes;
//     let sec = seconds < 10 ? "0" + seconds : seconds;

//     displayTime.innerHTML = `${hrs}:${min}:${sec}`;

// }


// function stopWatch(){
//     seconds++;
//     if(seconds === 60){
//         seconds = 0;
//         minutes++;
//         if(minutes === 60){
//             minutes = 0;
//             hours++;
//         }
//     }

//     updateTimerDisplay();
// }

// function timerStart(){
//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if(!activeTaskId){
//         alert("Resume or create a new task");
//         return;
//     }

//     if(timer !== null){
//         clearInterval(timer);
//     }

//     if(!localStorage.getItem("timerStartTime")){
//         localStorage.setItem("timerStartTime", new Date().toISOString());
//     }

//     timer = setInterval(stopWatch, 1000);

//     startBtn.disabled = true;
//     pauseBtn.disabled = false;
//     endBtn.disabled = false;
// }


// function timerPause(){
//     clearInterval(timer);

//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if(activeTaskId){
//         const taks = JSON.parse(localStorage.getItem("tasks")) || [];
//         const activeTask = tasks.find(t => t.id === activeTaskId);

//         if(activeTask && typeof pauseCurrentTask === 'function'){
//             pauseCurrentTask();
//         }
//     }

//     localStorage.removeItem("timerStart");

//     startBtn.disabled = false;
//     pauseBtn.disabled = true;

// }


// function timerEnd(){
//     clearInterval(timer);


//     const activeTaskId = localStorage.getItem("activeTaskId");
//     if(activeTaskId) {
//         const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//         const activeTask = tasks.find(t => t.id === activeTaskId);

//         if(activeTask && typeof completeCurrentTask === 'function'){
//             completeCurrentTask();
//         }
//     }

//     localStorage.removeItem("timerStartTime");
//     seconds = 0;
//     minutes = 0;
//     hours = 0;
//     updateTimerDisplay();

//     startBtn.disabled = false;
//     pauseBtn.disabled = true;
//     endBtn.disabled = true;

// }


// startBtn.addEventListener("click", timerStart);
// pauseBtn.addEventListener("click", timerPause);
// endBtn.addEventListener("click", timerEnd);


// window.addEventListener("DOMContentLoaded", initializeTimer);


let seconds = 0;
let minutes = 0;
let hours = 0;

let displayTime = document.getElementById("timer");
let startBtn = document.getElementById("startTimerBtn");
let pauseBtn = document.getElementById("pauseTimerBtn");
let endBtn = document.getElementById("endTimerBtn");

let timer = null;

// Initialize timer from active task
function initializeTimer() {
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (activeTaskId) {
        const timerStartTime = localStorage.getItem("timerStartTime");
        if (timerStartTime) {
            // Calculate elapsed time if timer was already running
            const startTime = new Date(timerStartTime);
            const now = new Date();
            const elapsedSeconds = Math.floor((now - startTime) / 1000);
            
            // Set timer values
            seconds = elapsedSeconds % 60;
            minutes = Math.floor(elapsedSeconds / 60) % 60;
            hours = Math.floor(elapsedSeconds / 3600);
            
            // Update display
            updateTimerDisplay();
            
            // Start timer automatically
            timerStart();
        }
    }
}

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

function timerStart() {
    // Only start if there's an active task
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (!activeTaskId) {
        alert("Please select or create a task first");
        return;
    }
    
    if (timer !== null) {
        clearInterval(timer);
    }
    
    // If there's no timer start time, set it now
    if (!localStorage.getItem("timerStartTime")) {
        localStorage.setItem("timerStartTime", new Date().toISOString());
    }
    
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
        
        if (activeTask && typeof pauseCurrentTask === 'function') {
            pauseCurrentTask();
        }
    }
    
    // Reset timer state
    localStorage.removeItem("timerStartTime");
    
    // Update button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function timerEnd() {
    clearInterval(timer);
    
    // Save the final timer state for the active task
    const activeTaskId = localStorage.getItem("activeTaskId");
    if (activeTaskId) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const activeTask = tasks.find(t => t.id === activeTaskId);
        
        if (activeTask && typeof completeCurrentTask === 'function') {
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

// Event listeners
startBtn.addEventListener("click", timerStart);
pauseBtn.addEventListener("click", timerPause);
endBtn.addEventListener("click", timerEnd);

// Initialize the timer when the page loads
window.addEventListener("DOMContentLoaded", initializeTimer);

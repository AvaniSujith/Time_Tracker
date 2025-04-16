// let [seconds, minutes, hours] = [0,0,0,];


let seconds = 0;
let minutes = 0;
let hours = 0;

let displayTime = document.getElementById("timer");
let startBtn = document.getElementById("startTimerBtn");
let pauseBtn = document.getElementById("pauseTimerBtn");
let endBtn = document.getElementById("endTimerBtn");

let timer = null;

function stopWatch(){
    seconds++;
    if(seconds === 60){
        seconds = 0;
        minutes++;
        if(minutes === 60){
            minutes = 0;
            hours++;
        }
    }

    let hrs = hours < 10 ? "0" + hours : hours;
    let min = minutes < 10 ? "0" + minutes : minutes;
    let sec = seconds < 10 ? "0" + seconds : seconds;

    // displayTime.innerHTML = hrs + ":" + min + ":" + sec;
    // return `${hours} : ${minutes} : ${seconds}`;
    displayTime.innerHTML = `${hrs}:${min}:${sec}`;
    
}

// function watching(){
//     displayTime.textContent = stopWatch()
// }
// // stopWatch(); 

// setTimeInterval(() => {
//     watching();
// }, 200);

function timerStart(){
    if(timer !== null){
        clearInterval(timer);
    }
    timer = setInterval(stopWatch, 1000);
}

function timerPause(){
    clearInterval(timer);
}

function timerEnd(){

    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;

    displayTime.innerHTML = "00:00:00"
}

startBtn.addEventListener("click", timerStart);
pauseBtn.addEventListener("click", timerPause);
endBtn.addEventListener("click", timerEnd);


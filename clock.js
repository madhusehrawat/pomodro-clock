let increment = document.querySelector("#session-increment");
let decrement = document.querySelector("#session-decrement");
let breakIncrement = document.querySelector("#break-increment");
let breakDecrement = document.querySelector("#break-decrement");
let start = document.querySelector("#start");
let reset = document.querySelector("#reset");
let timer = null;
let isRunning = false;
let isPaused = false;
let issession = true;
let session = 25;
let break_time = 5;
let timerDisplay = document.querySelector('#countdown');
let sess_min = document.querySelector("#session-min");
let break_min = document.querySelector("#break-min");
let timeleft = session * 60;
let heading = document.querySelector("#session");
let timeline = document.querySelector(".timeline");
let sess_count = 1;

function updateTimerDisplay() {
    let minutes = Math.floor(timeleft / 60);
    let seconds = timeleft % 60;
    timerDisplay.textContent = 
        (minutes < 10 ? '0' : '') + minutes + ':' + 
        (seconds < 10 ? '0' : '') + seconds;
}

function toggleSessionBreakButtons(state) {
    increment.disabled = state;
    decrement.disabled = state;
    breakIncrement.disabled = state;
    breakDecrement.disabled = state;
}


toggleSessionBreakButtons(false);
reset.disabled = false;

increment.addEventListener("click", () => {
    if (!isRunning && session < 60) { 
        session++;
        sess_min.textContent = session;
        timeleft = session * 60;
        updateTimerDisplay();
    }
});

decrement.addEventListener("click", () => {
    if (!isRunning && session > 1) {
        session--;
        sess_min.textContent = session;
        timeleft = session * 60;
        updateTimerDisplay();
    }
});

breakIncrement.addEventListener("click", () => {
    if (!isRunning) { 
        break_time++;
        break_min.textContent = break_time;
    }
});

breakDecrement.addEventListener("click", () => {
    if (!isRunning && break_time > 1) { 
        break_time--;
        break_min.textContent = break_time;
    }
});

start.addEventListener("click", () => {
    if (!isRunning) { 
        isPaused = false;
        toggleSessionBreakButtons(true); 
        start.textContent = "PAUSE";

        timer = setInterval(() => {
            if (timeleft > 0) {
                timeleft--;
                updateTimerDisplay();
            } else {
                
                if (issession) {
                    issession = false;
                    timeleft = break_time * 60;
                    heading.textContent = "Break";
                    timeline.style.border = "4px solid red";
                } else {
                    issession = true;
                    timeleft = session * 60;
                    sess_count++;
                    heading.textContent = `Session ${sess_count}`;
                    timeline.style.border = "4px solid green";
                }

                updateTimerDisplay();
            }
        }, 1000);  

    } else if (isRunning && !isPaused) { 
       
        clearInterval(timer);
        isPaused = true;
        start.textContent = "START";
        toggleSessionBreakButtons(true);
    } else { 
        isPaused = false;
        start.textContent = "PAUSE";

        timer = setInterval(() => {
            if (timeleft > 0) {
                timeleft--;
                updateTimerDisplay();
            } else {
                if (issession) {
                    issession = false;
                    timeleft = break_time * 60;
                    heading.textContent = "Break";
                    timeline.style.border = "4px solid red";
                } else {
                    issession = true;
                    timeleft = session * 60;
                    sess_count++;
                    heading.textContent = `Session ${sess_count}`;
                    timeline.style.border = "4px solid green";
                }

               
              
                updateTimerDisplay();
            }
        }, 1000);
    }

    isRunning = !isRunning;
});

reset.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    isRunning = false;
    isPaused = false;
    issession = true;
    session = 25;
    break_time = 5;
    timeleft = session * 60;
    sess_min.textContent = session;
    break_min.textContent = break_time;
    start.textContent = "START";
    updateTimerDisplay();
    timeline.style.border = "4px solid green";  
    sess_count = 1;
    heading.textContent = "Session 1"; 

   
    toggleSessionBreakButtons(false);
});

updateTimerDisplay();

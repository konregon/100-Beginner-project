// Create 4 constant which we want to update 
const hourEL = document.getElementById("Hours");
const minuteEl = document.getElementById("Minutes");
const secondEl = document.getElementById("Seconds");
const ampmEl = document.getElementById("ampm");

// make function to update clock
function updateClock(){
    // create 4 variable because we want them change their value by time
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    let ampm = "AM";

    // if condition for changing AM and PM
    if(h > 12){
        h = h - 12
        ampm = "PM"
    }

    // condition Boolean for displaying 0 before any single digit. ie. 04 instead of 4
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    // code for to display text in browser
    hourEL.innerText = h;
    minuteEl.innerText = m;
    secondEl.innerText = s;
    ampmEl.innerText = ampm;

    // timer condition to update time every second
    setTimeout(() => {
        updateClock();
    }, 1000);
}

// current time when this script first time load
updateClock();
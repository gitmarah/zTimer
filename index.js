const eventTitleInput = document.getElementById('event-title');
const targetDateInput = document.getElementById('target-date');
const startButton = document.getElementById('start-timer');
const timeDisplay = document.getElementById('time-display');
const progressBar = document.getElementById('progress-bar');
const progressBarClass = document.querySelector('.progress-bar');
const popUp = document.getElementById("pop-up");
const closePopUp = document.getElementById("close-pop-up");
const error = document.querySelector(".error");

let timerInterval;
let remainingTime;
let totalDuration;

startButton.addEventListener('click', () => {
    if(eventTitleInput.value === ""){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error").innerText = "Please enter an event title!";
        return;
    } else {
        document.querySelector(".error").style.display = "none";
    }
    if(targetDateInput.value === ""){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error").innerText = "Invalid target date!";
        return;
    } else {
        document.querySelector(".error").style.display = "none";
    }
    popUp.style.display = "none"
    const targetDate = new Date(targetDateInput.value);

    if (isNaN(targetDate.getTime())) {
        alert('Please set a valid date and time.');
        return;
    }

    clearInterval(timerInterval);

    startButton.style.display = 'none';

    remainingTime = targetDate.getTime() - new Date().getTime();
    totalDuration = targetDate.getTime() - new Date().getTime(); // Total time from now to target time
    progressBarClass.style.display = "block";
    timeDisplay.style.display = "block";

    timerInterval = setInterval(() => {
        remainingTime -= 50; // Update every 50 milliseconds for smooth progress

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timeDisplay.textContent = '00:00:00:00';
            progressBar.style.width = '100%';
            startButton.style.display = 'inline-block';
            document.getElementById("event").innerHTML = `<b>Start:</b> ${eventTitleInput.value}`;
            popUp.style.display = "flex";
            
            return;
        }

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        timeDisplay.textContent = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Correctly calculate the elapsed time
        const elapsed = totalDuration - remainingTime;
        progressBar.style.width = `${(elapsed / totalDuration) * 100}%`; // Update progress
    }, 50); // Update interval set to 50ms
});

closePopUp.addEventListener('click', () => {
    eventTitleInput.value = "";
    targetDateInput.value = "";
    popUp.style.display = "none"
    progressBarClass.style.display = "none";
    timeDisplay.style.display = "none";
});
const today = new Date();

document.getElementById("footer").innerHTML = `<p>zTimer &copy; ${today.getFullYear()}</p>`;
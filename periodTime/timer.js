const circle = document.querySelector('circle');
const text = document.getElementById('time');
const subtext = document.getElementById('Remaining');


const radius = 310;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

function setCirclePercent(percent) {
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;

    const offset = circumference * (1 - percent / 100);
    circle.style.strokeDashoffset = offset;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ====== Bell Schedule Times in Seconds ======
const wedTimes = [
    32400, 34920, 35220, 37740, 38040, 40560,
    40860, 43380, 43680, 46140, 46440, 48960,
    49260, 51780, 52080, 54600
];

const monFriTimes = [
    27900, 30900, 31260, 34440, 34800, 37800,
    38160, 41160, 41520, 44520, 44880, 47880,
    48240, 51240, 51600, 54600
];

const tueThursTimes = [
    27900, 30600, 30900, 33600, 33900, 36600,
    36900, 39600, 39900, 42600, 42900, 45600,
    45900, 48600, 48900, 51600, 51900, 54600
];

// ====== Main Function ======
function scheduleCheck(timeInSecs, schedule) {
    for (let i = 1; i < schedule.length; i++) {
        if (timeInSecs <= schedule[i]) {
            const periodStart = schedule[i - 1];
            const periodEnd = schedule[i];
            const length = periodEnd - periodStart;
            const elapsed = timeInSecs - periodStart;
            const percent = (elapsed / length) * 100;
            const remaining = periodEnd - timeInSecs;

            const isClass = i % 2 === 1;
            return {
                status: isClass ? "In Class" : "Passing Period",
                percent,
                remaining
            };
        }
    }

    return { status: "After School", percent: 100, remaining: 0 };
}

// ====== Time Check and UI Update ======
function updateProgressRing() {
    const now = new Date();
    const day = now.getDay();
    const timeInSecs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    let schedule = null;

    if (day === 6 || day === 0) {
        text.innerHTML = "Weekend";
        subtext.innerHTML = "";
        setCirclePercent(0);
        return;
    }

    if (timeInSecs > 54600) {
        text.innerHTML = "School's";
        subtext.innerHTML = "Over";
        setCirclePercent(100);
        return;
    }

    if (day === 3) { // Wednesday
        if (timeInSecs < 32400) {
            text.innerHTML = "Starting";
            subtext.innerHTML = "Soon";
            setCirclePercent(0);
            return;
        }
        schedule = wedTimes;
    } else if (day === 2 || day === 4) { // Tue/Thurs
        if (timeInSecs < 27900) {
            text.innerHTML = "Starting";
            subtext.innerHTML = "Soon";
            setCirclePercent(0);
            return;
        }
        schedule = tueThursTimes;
    } else if (day === 1 || day === 5) { // Mon/Fri
        if (timeInSecs < 27900) {
            text.innerHTML = "Starting";
            subtext.innerHTML = "Soon";
            setCirclePercent(0);
            return;
        }
        schedule = monFriTimes;
    }

    const { percent, remaining } = scheduleCheck(timeInSecs, schedule);
    setCirclePercent(percent);
    text.innerHTML = formatTime(remaining);
}

// Run once on page load
updateProgressRing();

// Optional: refresh every second
setInterval(updateProgressRing, 1000);

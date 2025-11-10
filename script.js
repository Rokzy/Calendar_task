const calendar = document.querySelector('.calendar');
const date = document.querySelector('.date');
const daysContainer = document.querySelector('.days');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const todayBtn = document.querySelector('.today-btn');
const eventsContainer = document.querySelector('.events');
const eventDay = document.querySelector('.event-day');
const eventDate = document.querySelector('.event-date');
const addEventWrapper = document.querySelector('.add-event-wrapper');
const addEventBtn = document.querySelector('.add-event');
const addEventCloseBtn = document.querySelector('.close');

const addEventTitle = document.querySelector('.event-name');
// --- NEW TEAM VARIABLES ---
const addEventTeam1 = document.querySelector('.event-team-1');
const addEventTeam2 = document.querySelector('.event-team-2');
// --------------------------
const addEventTime = document.querySelector('.event-time'); 
const addEventScore1 = document.querySelector('.event-score-1');
const addEventScore2 = document.querySelector('.event-score-2');

const addEventSubmit = document.querySelector('.add-event-btn');

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
let eventsArr = []; 

const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

getEvents(); 

// Function to render the calendar
function renderCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay(); 
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = months[month] + " " + year;

    let days = "";
    
    // 1. previous month days
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    // 2. current month days
    for (let i = 1; i <= lastDate; i++) {
        let dayClass = "day"; 
        
        if (i === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
            dayClass += " today"; 
        }
        
        if (getEventsForDay(i)) {
            dayClass += " event";
        }

        days += `<div class="${dayClass}">${i}</div>`;
    }
    
    // 3. next month days
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }   
    
    daysContainer.innerHTML = days; 
    addListner(); 
}

// Navigation functions
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    renderCalendar();
}

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }   
    renderCalendar();
}

next.addEventListener('click', nextMonth);
prev.addEventListener('click', prevMonth);

function goToToday() {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    renderCalendar();
    getActiveDay(today.getDate());
    updateEvents(today.getDate());
}

document.querySelector('.goto-today').addEventListener('click', goToToday);

function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
      day.addEventListener("click", (e) => {
        const dayNumber = Number(e.target.innerHTML);
        
        getActiveDay(dayNumber);
        updateEvents(dayNumber);
        activeDay = dayNumber;

        days.forEach((d) => {
          d.classList.remove("active");
        });

        if (e.target.classList.contains("prev-date")) {
          prevMonth();
        } else if (e.target.classList.contains("next-date")) {
          nextMonth();
        } 
        
        setTimeout(() => {
            const newDays = document.querySelectorAll(".day");
            newDays.forEach((d) => {
                if (Number(d.innerHTML) === dayNumber && !d.classList.contains("prev-date") && !d.classList.contains("next-date")) {
                    d.classList.add("active");
                }
            });
        }, 100);
      });
    });
}
  
function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}
  
// Function to update events when a day is active (UPDATED FOR TEAMS/SCORE)
function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
      if (
        date === event.day &&
        month + 1 === event.month &&
        year === event.year
      ) {
        event.events.forEach((item) => {
            // NEW: Team name display format
            const teamDisplay = (item.team1 && item.team2) 
                ? `<span class="event-team-display">${item.team1} vs ${item.team2}</span>` 
                : '';

            // NEW: Score display format
            const scoreDisplay = (item.score1 || item.score2) 
                ? `<span class="event-score-display">${item.score1 || '0'} - ${item.score2 || '0'}</span>` 
                : '';

            events += `<div class="event">
              <div class="title">
                <i class="fas fa-circle"></i>
                <h3 class="event-title">${item.title}</h3>
              </div>
              <div class="event-team-time">
                ${teamDisplay} 
              </div>
              <div class="event-time">
                <span class="event-time-text">${item.time}</span>
                ${scoreDisplay} 
              </div>
          </div>`;
        });
      }
    });
    if (events === "") {
      events = `<div class="no-event">
              <h3>No Events</h3>
          </div>`;
    }
    eventsContainer.innerHTML = events;
    saveEvents();
}
  
function getEventsForDay(date) {
    let eventFound = false;
    eventsArr.forEach((event) => {
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            eventFound = true;
        }
    });
    return eventFound;
}

addEventBtn.addEventListener("click", () => {
    addEventWrapper.classList.toggle("active");
});
  
addEventCloseBtn.addEventListener("click", () => {
    addEventWrapper.classList.remove("active");
});
  
document.addEventListener("click", (e) => {
    if (e.target !== addEventBtn && !addEventWrapper.contains(e.target) && e.target.parentElement !== addEventBtn) {
      addEventWrapper.classList.remove("active");
    }
});
  
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60);
});

// --- NEW INPUT HANDLERS ---

// Allow only time in event-time (e.g., 19:30)
addEventTime.addEventListener("input", (e) => {
    addEventTime.value = addEventTime.value.replace(/[^0-9:]/g, "");
    if (addEventTime.value.length === 2 && !addEventTime.value.includes(':')) {
      addEventTime.value += ":";
    }
    if (addEventTime.value.length > 5) {
      addEventTime.value = addEventTime.value.slice(0, 5);
    }
});

// Allow only numbers in score inputs
function filterScoreInput(inputElement) {
    inputElement.value = inputElement.value.replace(/[^0-9]/g, "");
    if (inputElement.value.length > 3) { 
        inputElement.value = inputElement.value.slice(0, 3);
    }
}
addEventScore1.addEventListener("input", () => filterScoreInput(addEventScore1));
addEventScore2.addEventListener("input", () => filterScoreInput(addEventScore2));
// ----------------------------

function defineProperty() { } // Empty function, kept for compatibility

defineProperty();

//function to add event to eventsArr (UPDATED FOR TEAMS)
addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTeam1 = addEventTeam1.value.trim(); // NEW
    const eventTeam2 = addEventTeam2.value.trim(); // NEW
    const eventTime = addEventTime.value; 
    const eventScore1 = addEventScore1.value.trim(); 
    const eventScore2 = addEventScore2.value.trim(); 
    
    // Check mandatory fields (Title, Teams, and Time)
    if (eventTitle === "" || eventTeam1 === "" || eventTeam2 === "" || eventTime === "") {
      alert("Please fill in the Event Name, Team Names, and Event Time.");
      return;
    }
    
    // Validation for scores (only allow numbers or empty)
    if ((eventScore1 !== "" && isNaN(Number(eventScore1))) || 
        (eventScore2 !== "" && isNaN(Number(eventScore2)))) {
        alert("Scores must be valid numbers.");
        return;
    }

    // Time format check
    const timeArr = eventTime.split(":");
    if (
      timeArr.length !== 2 ||
      timeArr[0] > 23 ||
      timeArr[1] > 59
    ) {
      alert("Invalid Time Format. Use HH:MM (24-hour).");
      return;
    }
  
    const formattedTime = convertTime(eventTime);
  
    let eventExist = false;
    // ... (event existence check logic remains the same) ...

    if (eventExist) {
      alert("Event already added");
      return;
    }
    
    // NEW EVENT OBJECT WITH TEAM AND SCORE FIELDS
    const newEvent = {
      title: eventTitle,
      team1: eventTeam1, // NEW
      team2: eventTeam2, // NEW
      time: formattedTime,
      score1: eventScore1,
      score2: eventScore2,
    };
    
    let eventAdded = false;
    // ... (logic to add event to eventsArr remains the same) ...
    if (eventsArr.length > 0) {
      eventsArr.forEach((item) => {
        if (
          item.day === activeDay &&
          item.month === month + 1 &&
          item.year === year
        ) {
          item.events.push(newEvent);
          eventAdded = true;
        }
      });
    }
  
    if (!eventAdded) {
      eventsArr.push({
        day: activeDay,
        month: month + 1,
        year: year,
        events: [newEvent],
      });
    }
  
    addEventWrapper.classList.remove("active");
    // Clear all inputs
    addEventTitle.value = "";
    addEventTeam1.value = ""; // CLEAR
    addEventTeam2.value = ""; // CLEAR
    addEventTime.value = "";
    addEventScore1.value = "";
    addEventScore2.value = "";

    updateEvents(activeDay);
    const activeDayEl = document.querySelector(".day.active");
    if (activeDayEl && !activeDayEl.classList.contains("event")) {
      activeDayEl.classList.add("event");
    }
    renderCalendar(); 
});
  
  //function to delete event when clicked on event (Logic remains the same)

  eventsContainer.addEventListener("click", (e) => {
    if (e.target.closest(".event")) {
      const eventElement = e.target.closest(".event");
      if (confirm("Are you sure you want to delete this event?")) {
        const eventTitle = eventElement.querySelector(".event-title").innerHTML;
        eventsArr.forEach((event, eventArrIndex) => {
          if (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
          ) {
            event.events.forEach((item, itemIndex) => {
              if (item.title === eventTitle) {
                event.events.splice(itemIndex, 1);
              }
            });
            if (event.events.length === 0) {
              eventsArr.splice(eventArrIndex, 1);
              const activeDayEl = document.querySelector(".day.active");
              if (activeDayEl && activeDayEl.classList.contains("event")) {
                activeDayEl.classList.remove("event");
              }
            }
          }
        });
        updateEvents(activeDay);
        renderCalendar(); 
      }
    }
  });
  
  //function to save events in local storage
  function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
  }
  
  //function to get events from local storage
  function getEvents() {
    if (localStorage.getItem("events") === null) {
      return;
    }
    eventsArr = JSON.parse(localStorage.getItem("events"));
  }
  
  // Converts 24h (HH:MM) to 12h (H:MM AM/PM)
  function convertTime(time) {
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
  }
  
  // Initial calendar setup
  renderCalendar(); 
  getActiveDay(today.getDate()); 
  updateEvents(today.getDate());

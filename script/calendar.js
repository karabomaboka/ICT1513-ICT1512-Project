
// calendar.js

// golobal variables 
var start_year = 2021;
var end_year = 2030;
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth();

var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

// determine if year is a leap year, return true if it is
function isLeapYear(year) {
  return ((year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) 
  || (year % 100 === 0 && year % 400 ===0));
}

// get the number of days in February
function getFebDays(year) {
  return isLeapYear(year) ? 29 : 28;
}

// total number of days in each month
days_of_month = [31, getFebDays(currentYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// show calendar
function showCalendar(month, year)
{
  let first_day = new Date(year, month, 1)
  var dayInWeek = first_day.getDay();
  var numOfDays = days_of_month[month];
  var totalDays = numOfDays + dayInWeek;

  addCalendarDays(dayInWeek, totalDays);
}
                      
// function to place days Of Week values in header row cells
function addColumnHeaders() {
  var i = 0;
  while (i < 7) {
    document.getElementById("weekDy-" + i).innerHTML = daysOfWeek[i];
    i++;
  }
}

// add number of days in the month to the calendar
function addCalendarDays(daysBeforeMonth, daysTotal) {
  var i = 1;
  var numColumns = 42;
  do {
    var tableTitle = document.getElementById("month_year");
    tableTitle.innerHTML = monthsOfYear[currentMonth] + " " + currentYear;
    var tableCell = document.getElementById("cell-" + i);
    if(i <= daysBeforeMonth) {
      tableCell.innerHTML = "";
      tableCell.style.border = "inherit";
    } else 
      if(i >= daysBeforeMonth && i <= daysTotal ) {
        tableCell.innerHTML = i - daysBeforeMonth;
        tableCell.style.border = "2px solid red";
        tableCell.style.textAlign = "center";
    } else {
      tableCell.innerHTML = "";
      tableCell.style.border = "inherit";
    }
    i++;
  } while (i <= numColumns);
}

// show previous month
function prevMonth()
{
  if(currentYear >= start_year && currentYear <= end_year){
    if(currentMonth > 0){
      currentMonth -= 1;
    } 
    else 
      if(currentMonth == 0 && currentYear > start_year){
        currentYear -= 1;
        currentMonth = 11;
      }
  }
  showCalendar(currentMonth, currentYear);
}

// show next month
function nextMonth()
{
  if(currentYear >= start_year && currentYear <= end_year){
    if(currentMonth < 11){
      currentMonth += 1;
    } 
    else 
      if(currentMonth == 11 && currentYear < end_year){
        currentYear += 1;
        currentMonth = 0;
      }
  }
  showCalendar(currentMonth, currentYear);
}

// event listeners
function createEventListeners() {
  var prevMon = document.getElementById("prev");
  if (prevMon.addEventListener) {
    prevMon.addEventListener("click", prevMonth, false);
  } else if (prevMon.attachEvent) {
    prevMon.attachEvent("onclick", prevMonth);
  } 
  
  var nextMon = document.getElementById("next");
  if (nextMon.addEventListener) {
    nextMon.addEventListener("click", nextMonth, false);
  } else if (nextMon.attachEvent) {
    nextMon.attachEvent("onclick", nextMonth);
  } 
}
 

// Function to populate calendar
function setUpCalendar() {
  createEventListeners();
  addColumnHeaders();
  showCalendar(currentMonth, currentYear);
}

/* ---------------------------------------
Runs setUpCalendar() function when page loads
--------------------------------------- */
if (window.addEventListener) {
  window.addEventListener("load", setUpCalendar, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", setUpCalendar);
}
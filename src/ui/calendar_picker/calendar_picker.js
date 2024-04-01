const datesRowElement = document.querySelector(".calendar__dates-row");
const monthForward = document.querySelector(".calendar__forward");
const monthBack = document.querySelector(".calendar__back");
const calendarTitle = document.querySelector(".calendar__title");
const selectDateElement = document.querySelector(".calendar__title");

const currentDate = new Date().getDate();
let currentMonth = new Date().getMonth();
let currentYear = new Date().getUTCFullYear();
let selectedMonth = currentMonth;
let selectedYear = currentYear;
let selectedDate1 = null;
let selectedDate2 = null;

console.log(currentYear, currentMonth, currentDate);

const monthes = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const weekDays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

function compareDates(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

function getLastDayOfMonth(year, month) {
  let date = new Date(year, month, 0); // date from next month
  return date.getDate();
}

function getDateObj(year, monthIndex, dateDay) {
  const date = new Date(year, monthIndex, dateDay);
  return {
    date: date.getDate(),
    monthIndex: date.getMonth(),
    year: date.getUTCFullYear(),
  };
}

function getMonthDays(year, monthIndex) {
  const firstWeekDayIndex = new Date(year, monthIndex, 1).getDay();
  const calendarMonthDays = [];
  if (firstWeekDayIndex > 0) {
    const lastPrevMonthDate = getLastDayOfMonth(year, monthIndex);
    const prevMonthIndex = monthIndex - 1;
    for (let i = 0; i < firstWeekDayIndex - 1; i++) {
      calendarMonthDays.push(
        getDateObj(year, prevMonthIndex, lastPrevMonthDate - i)
      );
    }
  }
  // month days
  const lastMonthDay = getLastDayOfMonth(year, monthIndex);
  const nexMonthDaysAmount = 35 - lastMonthDay - calendarMonthDays.length;
  for (let i = 0; i < lastMonthDay + nexMonthDaysAmount; i++) {
    calendarMonthDays.push(getDateObj(year, monthIndex, 1 + i));
  }
  console.log("Month days: ", calendarMonthDays);
  return calendarMonthDays;
}

function insertDates(year, month) {
  function createDateElement(dateObject) {
    const dateContainer = document.createElement("div");
    dateContainer.classList.add("date-container");
    const dateBg = document.createElement("div");
    const dateValue = document.createElement("span");
    dateValue.textContent = dateObject.date;
    dateBg.classList.add("date-container__bg");

    if (dateObject.monthIndex !== selectedMonth) {
      dateBg.classList.add("date-container__extra-days");
    } else {
      dateBg.classList.add("date-container__month-days");
    }
    if (
      dateObject.year == currentYear &&
      dateObject.monthIndex == currentMonth &&
      dateObject.date == currentDate
    ) {
      dateBg.classList.add("date-container__current-date");
    }
    if (
      selectedDate1 != null &&
      dateObject.year == selectedDate1.getUTCFullYear() &&
      dateObject.monthIndex == selectedDate1.getMonth() &&
      dateObject.date == selectedDate1.getDate()
    ) {
      dateBg.classList.add("date-container__selected-date");
    }
    if (
      selectedDate2 != null &&
      dateObject.year == selectedDate2.getUTCFullYear() &&
      dateObject.monthIndex == selectedDate2.getMonth() &&
      dateObject.date == selectedDate2.getDate()
    ) {
      dateBg.classList.add("date-container__selected-date");
    }
    dateBg.appendChild(dateValue);
    dateContainer.appendChild(dateBg);
    return dateContainer;
  }

  datesRowElement.textContent = "";
  getMonthDays(year, month).forEach((date) => {
    datesRowElement.appendChild(createDateElement(date));
  });
  calendarTitle.textContent = `${monthes[month]} ${year}`;
}

//helpers
function defineStartAndEnd(targetDate) {
  if(selectedDate1 && compareDates(selectedDate1, targetDate)) {
    selectedDate1 = null;
    return;
  } else if(selectedDate2 && compareDates(selectedDate2, targetDate)) {
    selectedDate2 = null;
    return;
  }
  else if(!selectedDate1 && !selectedDate2 || !selectedDate1 && selectedDate2 && !compareDates(selectedDate2, targetDate)) {
    selectedDate1 = targetDate
    return;
  } else  {
    selectedDate2 = targetDate;
    return;
  } 
}

// Handlers

function onForwardMonth() {
  selectedMonth++;
  insertDates(selectedYear, selectedMonth);
}
function onBackMonth() {
  if (selectedMonth == currentMonth) return;
  selectedMonth--;
  insertDates(selectedYear, selectedMonth);
}
function onDate(e) {
  const targetDate = new Date(
    selectedYear,
    selectedMonth,
    e.target.textContent
  );
  defineStartAndEnd(targetDate);
  const bgElement = e.target.classList.toggle(".date-container__bg");
  insertDates(selectedYear, selectedMonth);
}

monthForward.addEventListener("click", onForwardMonth);
monthBack.addEventListener("click", onBackMonth);
datesRowElement.addEventListener("click", onDate);

insertDates(selectedYear, selectedMonth);

const monthForward = document.querySelector(".calendar__forward");
const monthBack = document.querySelector(".calendar__back");
const calendarTitle = document.querySelector(".calendar__title");

const currentDate = new Date().getDate();
let currentMonth = new Date().getMonth();
let currentYear = new Date().getUTCFullYear();
let selectedMonth = currentMonth;
let selectedYear = currentYear;

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
    weekDayIndex: date.getDay(),
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
  const datesRowElement = document.querySelector(".calendar__dates-row");

  function createDateElement(dateObject) {
    const dateContainer = document.createElement("div");
    dateContainer.classList.add("date-container");
    const dateBg = document.createElement("div");
    const dateValue = document.createElement("span");
    dateValue.textContent = dateObject.date;
    dateBg.classList.add("date-container__bg");
    if(dateObject.monthIndex !== selectedMonth) {
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

// monthForward.addEventListener("click", onForwardMonth);
// monthBack.addEventListener("click", onBackMonth);

insertDates(selectedYear, selectedMonth);

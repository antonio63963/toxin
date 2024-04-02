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
let startAndFinishDates = [];

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
  const [start, end] = startAndFinishDates;
  // console.log(start, end)
  return {
    date: dateDay,
    monthIndex: monthIndex,
    year: year,
    isCurrentDay:
      year == currentYear &&
      monthIndex === currentMonth &&
      dateDay === currentDate,
    isLivingDay: isLivingDate(year, monthIndex, dateDay),
    isStartDay:
      startAndFinishDates.length &&
      startAndFinishDates[0] &&
      year === start.getUTCFullYear() &&
      monthIndex === start.getMonth() &&
      dateDay === start.getDate(),
    isFinishDay:
      startAndFinishDates.length &&
      startAndFinishDates[1] &&
      !this.isStartDay &&
      year === end.getUTCFullYear() &&
      monthIndex === end.getMonth() &&
      dateDay === end.getDate(),
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
  for (let i = 0; i < lastMonthDay; i++) {
    calendarMonthDays.push(getDateObj(year, monthIndex, 1 + i));
  }
  for (let i = 0; i < nexMonthDaysAmount; i++) {
    calendarMonthDays.push(getDateObj(year, monthIndex + 1, i + 1));
  }
  console.log("Month days: ", calendarMonthDays);
  return calendarMonthDays;
}

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
  if (dateObject.isCurrentDay) {
    dateBg.classList.add("date-container__current-date");
  }
  if (dateObject.isStartDay || dateObject.isFinishDay) {
    dateBg.classList.add("date-container__selected-date");
  }
  dateBg.appendChild(dateValue);
  dateContainer.appendChild(dateBg);
  return dateContainer;
}

function insertDates(year, month) {
  datesRowElement.textContent = "";
  getMonthDays(year, month).forEach((date) => {
    datesRowElement.appendChild(createDateElement(date));
  });
  calendarTitle.textContent = `${monthes[month]} ${year}`;
}

//helpers
function defineSelectedDates(targetDate) {
  if (selectedDate1 && compareDates(selectedDate1, targetDate)) {
    selectedDate1 = null;
    return;
  } else if (selectedDate2 && compareDates(selectedDate2, targetDate)) {
    selectedDate2 = null;
    return;
  } else if (
    (!selectedDate1 && !selectedDate2) ||
    (!selectedDate1 &&
      selectedDate2 &&
      !compareDates(selectedDate2, targetDate))
  ) {
    selectedDate1 = targetDate;
    return;
  } else {
    selectedDate2 = targetDate;
    return;
  }
}

function getStartAndFinishDates() {
  if (!selectedDate1 && !selectedDate2) return [];
  if (!selectedDate1 && selectedDate2) return [selectedDate2];
  if (selectedDate1 && !selectedDate2) return [selectedDate1];
  const year1 = selectedDate1.getUTCFullYear();
  const year2 = selectedDate2.getUTCFullYear();
  const month1 = selectedDate1.getMonth();
  const month2 = selectedDate2.getMonth();
  const date1 = selectedDate1.getDate();
  const date2 = selectedDate2.getDate();

  if (year1 < year2) return [selectedDate1, selectedDate2];
  if (year2 < year1) return [selectedDate2, selectedDate1];
  if (year1 == year2 && month1 < month2) return [selectedDate1, selectedDate2];
  if (year1 == year2 && month2 < month1) return [selectedDate2, selectedDate1];
  if (year1 == year2 && month2 == month1 && date1 < date2)
    return [selectedDate1, selectedDate2];
  if (year1 == year2 && month2 == month1 && date2 < date1)
    return [selectedDate2, selectedDate1];
}

function isLivingDate(year, monthIndex, dateDay) {
  if (startAndFinishDates.length < 2) return false;
  console.log(startAndFinishDates.length);
  const [start, end] = startAndFinishDates;
  if (
    year >= start.getUTCFullYear() &&
    year <= end.getUTCFullYear() &&
    monthIndex >= start.getMonth() &&
    monthIndex <= end.getMonth() &&
    dateDay >= start.getDate() &&
    dateDay <= end.getDate()
  )
    return true;
  return false;
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
  defineSelectedDates(targetDate);
  startAndFinishDates = getStartAndFinishDates();
  console.log(startAndFinishDates);
  const bgElement = e.target.classList.toggle(".date-container__bg");
  insertDates(selectedYear, selectedMonth);
}

monthForward.addEventListener("click", onForwardMonth);
monthBack.addEventListener("click", onBackMonth);
datesRowElement.addEventListener("click", onDate);

insertDates(selectedYear, selectedMonth);

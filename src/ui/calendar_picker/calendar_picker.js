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
  console.log(date1, date2);
  return (
    date1.getDate() === date2.getDate() &&
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0); // date from next month
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
  //prefix days
  if (firstWeekDayIndex > 0) {
    const lastPrevMonthDate = getLastDayOfMonth(year, monthIndex -1);
    const prevMonthIndex = monthIndex - 1;
    for (let i = 0; i < firstWeekDayIndex - 1; i++) {
      calendarMonthDays.unshift(
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
  //suffix days
  for (let i = 0; i < nexMonthDaysAmount; i++) {
    calendarMonthDays.push(getDateObj(year, monthIndex + 1, i + 1));
  }
  console.log("Month days: ", calendarMonthDays);
  return calendarMonthDays;
}

function createDateElement(dateObject, idx) {
  const dateContainer = document.createElement("div");
  dateContainer.classList.add("date-container");
  dateContainer.dataset.date = `${dateObject.date}-${dateObject.monthIndex}-${dateObject.year}`;
  if (idx == 0 || idx % 7 == 0) {
    dateContainer.classList.add("date-container__round-start-row");
  }
  if (idx == 6 || (idx + 1) % 7 == 0) {
    dateContainer.classList.add("date-container__round-finish-row");
  }
  if (idx == 0 || idx % 7 == 0) {
    dateContainer.classList.add("date-container__round-start-row");
  }
  if (idx == 6 || (idx + 1) % 7 == 0) {
    dateContainer.classList.add("date-container__round-finish-row");
  }
  if (idx == 0 || idx % 7 == 0) {
    dateContainer.classList.add("date-container__round-start-row");
  }
  if (idx == 6 || (idx + 1) % 7 == 0) {
    dateContainer.classList.add("date-container__round-finish-row");
  }
  if (dateObject.isLivingDay) {
    dateContainer.classList.add("date_container__living-day");
  }
  if (dateObject.isStartDay && dateObject.isLivingDay) {
    dateContainer.classList.add("date-container__start");
  }
  if (dateObject.isFinishDay && dateObject.isLivingDay) {
    dateContainer.classList.add("date-container__finish");
  }

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
  getMonthDays(year, month).forEach((date, idx) => {
    datesRowElement.appendChild(createDateElement(date, idx));
  });
  calendarTitle.textContent = `${monthes[month]} ${year}`;
}

//helpers
function defineSelectedDates(targetDate) {
  console.log("targetDate: ", targetDate);
  if (selectedDate1 && compareDates(selectedDate1, targetDate)) {
    console.log("defineSelectdedDates: comapare");
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
  const [elementDate, elementMonth, elementYear] = e.target
    .closest(".date-container")
    .dataset.date.split("-");
  console.log(elementDate, elementMonth, elementYear);
  const targetDate = new Date(elementYear, elementMonth, elementDate);
  console.log('TargetDate: ', targetDate)
  defineSelectedDates(targetDate);
  startAndFinishDates = getStartAndFinishDates();
  console.log(startAndFinishDates);
  insertDates(selectedYear, selectedMonth);
}

monthForward.addEventListener("click", onForwardMonth);
monthBack.addEventListener("click", onBackMonth);
datesRowElement.addEventListener("click", onDate);

insertDates(selectedYear, selectedMonth);

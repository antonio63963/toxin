const comfortInput = document.querySelector(".sidebar-rooms__comfort-input");
const comfortList = document.querySelector(".sidebar-rooms__comfort-list");

function toggleComfortList(e) {
  if (e.target.closest(".dropdown__list")) return;
  console.log(e.target);

  comfortList.classList.toggle("dropdown__list-hide");
  comfortInput.classList.toggle("dropdown-open");
}

comfortInput.addEventListener("click", toggleComfortList);

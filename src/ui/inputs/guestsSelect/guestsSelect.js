const dropdown = document.querySelector('.sidebar-rooms__guests-input');
const dropdownList= document.querySelector('.dropdown__list');

dropdown.addEventListener('click', (e) => {
  console.log(e.target)
  if(e.target.closest('.dropdown__list')) return;
  dropdown.classList.toggle('dropdown-open');
  dropdownList.classList.toggle('dropdown__list-hide');
})

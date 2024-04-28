const dropdown = document.querySelector('.sidebar-rooms__guests');
const dropdownList= document.querySelector('.dropdown__list');

dropdown.addEventListener('click', (e) => {
  if(e.target.closest('.dropdown__list')) return;
  dropdown.classList.toggle('dropdown-open');
  dropdownList.classList.toggle('dropdown__list-hide');
})

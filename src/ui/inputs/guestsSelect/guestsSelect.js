const dropdown = document.querySelector('.dropdown');
const dropdownList= document.querySelector('.dropdown__list');

console.log(dropdown)

dropdown.addEventListener('click', () => {
console.log('drpdwn')
  dropdown.classList.toggle('dropdown-open');
  dropdownList.classList.toggle('dropdown__list-hide');
})

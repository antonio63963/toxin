const accordionTop = document.querySelector('.accordion__top');
const accordionList = document.querySelector('.accordion__list');

function toggleAccordion(e) {
  console.log(e.target)
  if(e.target.closest('.accordion__list')) return;
  accordionTop.classList.toggle('open');
  // accordionList.classList.toggle('hide');
}

accordionTop.addEventListener('click', toggleAccordion);

const textDiv = document.querySelector('.idx_div');
const idxBtn = document.querySelector('.idx_btn');

function onIdxBtn() {
  textDiv.innerHTML = "Hello Index Page!"
}

idxBtn.addEventListener('click', onIdxBtn)
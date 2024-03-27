const textDiv = document.querySelector('.login_div');
const loginBtn = document.querySelector('.login_btn');

function onPlayBtn() {
  textDiv.innerHTML = "Hello Index Page!"
}

loginBtn.addEventListener('click', onPlayBtn)
import "../../ui/index.scss";
import "../../ui/utils.scss";
import './auth.scss';

const loginForm = document.querySelector('.auth-loginForm');
const signUpForm = document.querySelector('.auth-signUpForm');
const toSignUpButton = document.querySelector('.loginForm__toSignUp');
const toLoginButton = document.querySelector('.signUpForm__toLogin');

function onToSignUp(e) {
  e.preventDefault();
  loginForm.classList.add('hide');
  signUpForm.classList.remove('hide')
}
function onToLogin(e) {
  e.preventDefault();
  loginForm.classList.remove('hide');
  signUpForm.classList.add('hide')
}

toSignUpButton.addEventListener('click', onToSignUp);
toLoginButton.addEventListener('click', onToLogin);

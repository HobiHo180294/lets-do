import './index.html';
import './style.scss';
import Router from '../../js/modules/login/Router.mjs';
import validateFields from '../../js/modules/login/_validation.mjs';
import {
  registerUser,
  authUser,
  getUserInfo,
} from '../../js/modules/login/_requests.mjs';
import { requestEndpoints } from '../../js/modules/login/services/endpoints.mjs';

const enterForm = document.querySelector('.login__form');

const loginSwitcher = document.querySelector('.login__account-join');
const formSubmitMessage = enterForm.querySelector('._empty-error');

function admitNewUser(message, form = enterForm) {
  formSubmitMessage.textContent = message;

  setTimeout(() => {
    form.submit();
    form.reset();
    formSubmitMessage.textContent = '';
    window.location.href = requestEndpoints.login;
  }, 1500);
}

function admitLoggedUser(form = enterForm) {
  formSubmitMessage.textContent = 'You are already logged in!';

  setTimeout(() => {
    form.reset();
    window.location.href = requestEndpoints.mainPage;
  }, 1000);
}

function admitRegisteredUser(token, message, form = enterForm) {
  window.sessionStorage.setItem('token', token);
  formSubmitMessage.textContent = message;

  setTimeout(() => {
    form.submit();
    form.reset();
    formSubmitMessage.textContent = '';
    window.location.href = requestEndpoints.mainPage;
  }, 1500);
}

function rejectUser(message) {
  formSubmitMessage.textContent = message;
}

async function submitRegistrationForm(formData) {
  const { success, message } = await registerUser({
    username: formData.username,
    email: formData.userEmail,
    password: formData.userPassword,
  });

  if (success) {
    const tokenExists = Boolean(window.sessionStorage.getItem('token'));
    if (tokenExists) window.sessionStorage.removeItem('token');

    admitNewUser(message);
  } else rejectUser(message);
}

async function submitLoginForm(formData) {
  const { success, message, token } = await authUser({
    username: formData.username,
    password: formData.userPassword,
  });

  if (success) {
    const tokenExists = Boolean(window.sessionStorage.getItem('token'));

    if (tokenExists) {
      const currentToken = window.sessionStorage.getItem('token');
      const currentUserData = await getUserInfo(currentToken);

      if (formData.username === currentUserData.user.username)
        admitLoggedUser();
      else admitRegisteredUser(token, message);
    } else admitRegisteredUser(token, message);
  } else rejectUser(message);
}

window.addEventListener('load', () => {
  Router.triggerOnPageLoad();
});

loginSwitcher.addEventListener('click', (e) => {
  Router.handlePageState(e);
});

enterForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const validationResult = validateFields();

  if (validationResult.isValid) {
    const formData = new FormData(enterForm);

    const username = formData.get('username');
    const userEmail = formData.get('email');
    const userPassword = formData.get('password');

    if (userEmail)
      await submitRegistrationForm({ username, userEmail, userPassword });
    else await submitLoginForm({ username, userPassword });
  }
});

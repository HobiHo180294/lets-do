import './index.html';
import './style.scss';
import Router from '../../js/modules/login/Router.mjs';
import validateFields from '../../js/modules/login/_validation.mjs';
import { registerUser, authUser } from '../../js/modules/login/_requests.mjs';
import { requestEndpoints } from '../../js/modules/login/services/endpoints.mjs';

const enterForm = document.querySelector('.login__form');

const loginSwitcher = document.querySelector('.login__account-join');
const formSubmitMessage = enterForm.querySelector('._empty-error');

async function submitRegistrationForm(formData, form = enterForm) {
  const { success, message } = await registerUser({
    username: formData.username,
    email: formData.userEmail,
    password: formData.userPassword,
  });

  if (success) {
    formSubmitMessage.textContent = message;

    setTimeout(() => {
      form.submit();
      form.reset();
      formSubmitMessage.textContent = '';
      window.location.href = requestEndpoints.login;
    }, 1500);
  } else formSubmitMessage.textContent = message;
}

async function submitLoginForm(formData, form = enterForm) {
  const { success, message } = await authUser({
    username: formData.username,
    password: formData.userPassword,
  });

  if (success) {
    formSubmitMessage.textContent = message;

    setTimeout(() => {
      form.submit();
      form.reset();
      formSubmitMessage.textContent = '';
      window.location.href = requestEndpoints.mainPage;
    }, 1500);
  } else formSubmitMessage.textContent = message;
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

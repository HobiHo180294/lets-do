import './index.html';
import './style.scss';
import Router from '../../js/modules/login/Router.mjs';
import validateFields from '../../js/modules/login/_validation.mjs';

const enterForm = document.querySelector('.login__form');

const loginSwitcher = document.querySelector('.login__account-join');
const emptyFieldsErrorElement = document.querySelector('._empty-error');

window.addEventListener('load', () => {
  Router.triggerOnPageLoad();
});

loginSwitcher.addEventListener('click', (e) => {
  Router.handlePageState(e);
});

enterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const validationResult = validateFields();

  if (validationResult.isValid) {
    emptyFieldsErrorElement.textContent = validationResult.message;

    setTimeout(() => {
      enterForm.submit();
      enterForm.reset();
      emptyFieldsErrorElement.textContent = '';
    }, 1500);
  }
});

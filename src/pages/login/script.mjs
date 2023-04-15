import './index.html';
import './style.scss';
import Router from '../../js/modules/login/Router.mjs';

const loginSwitcher = document.querySelector('.login__account-join');

window.addEventListener('load', () => {
  Router.triggerOnPageLoad();
});

loginSwitcher.addEventListener('click', (e) => {
  Router.handlePageState(e);
});

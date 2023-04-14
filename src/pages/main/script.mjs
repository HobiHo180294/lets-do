import './index.html';
import './style.scss';
import Popup from '../../js/modules/main/Popup.mjs';

const popupLinks = document.querySelectorAll('.popup-link');
const popupCloseIcon = document.querySelectorAll('.popup__close');

document.addEventListener('keydown', (e) => {
  Popup.closeOnEscape(e);
});

if (popupLinks.length > 0)
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i];

    popupLink.addEventListener('click', (e) => {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);
      Popup.open(currentPopup);
      e.preventDefault();
    });
  }

if (popupCloseIcon.length > 0)
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i];

    el.addEventListener('click', (e) => {
      Popup.close(el.closest('.popup'));
      e.preventDefault();
    });
  }

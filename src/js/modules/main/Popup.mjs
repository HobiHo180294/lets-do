const TIMEOUT = 800;
let unlock = true;

const lockPaddingElements = document.querySelectorAll('.lock-padding');

function bodyLock() {
  const lockPaddingValue = `${
    window.innerWidth - document.querySelector('.wrapper').offsetWidth
  }px`;

  if (lockPaddingValue.length > 0)
    for (let i = 0; i < lockPaddingElements.length; i++) {
      const el = lockPaddingElements[i];
      el.style.paddingRight = lockPaddingValue;
    }

  document.body.style.paddingRight = lockPaddingValue;
  document.body.classList.add('lock');

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, TIMEOUT);
}

function bodyUnlock() {
  setTimeout(() => {
    for (let i = 0; i < lockPaddingElements.length; i++) {
      const el = lockPaddingElements[i];
      el.style.paddingRight = '0px';
    }

    document.body.style.paddingRight = '0px';
    document.body.classList.remove('lock');
  }, TIMEOUT);

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, TIMEOUT);
}

export default class Popup {
  static close(popupActive, doUnlock = true) {
    console.log('I shouldnt work');

    if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) bodyUnlock();
    }
  }

  static closeOnEscape(event) {
    if (event.key === 'Escape') {
      const popupsActive = document.querySelectorAll('.popup.open');

      if (popupsActive.length > 0) this.close(popupsActive[popupsActive.length - 1]);
    }
  }

  static open(currentPopup) {
    if (currentPopup && unlock) {
      bodyLock();

      currentPopup.classList.add('open');
      currentPopup.addEventListener('click', (e) => {
        if (!e.target.closest('.popup__content')) this.close(e.target.closest('.popup'));
      });
    }
  }
}

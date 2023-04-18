import './index.html';
import './style.scss';
import Popup from '../../js/modules/main/Popup.mjs';
import deleteIcon from '../../assets/images/main/icons/delete.svg';
import doneIcon from '../../assets/images/main/icons/done.svg';

const popupLinks = document.querySelectorAll('.popup-link');
const popupCloseIcon = document.querySelectorAll('.popup__close');
const todoPopupLink = document.querySelector('.todo-popup__link');

document.addEventListener('keydown', (e) => {
  Popup.closeOnEscape(e);
});

todoPopupLink.previousElementSibling.addEventListener('click', (e) => {
  e.preventDefault();
  todoPopupLink.click();
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

// *PAGINATION

function createElement(tag, classes, newTitle) {
  const newElement = document.createElement(tag);
  newElement.className = classes;
  newElement.setAttribute('title', newTitle);
  return newElement;
}

function insertElement(place, element) {
  place.appendChild(element);
}

const okButton = document.querySelector('.task-popup__buttons_ok');
const todoList = document.querySelector('.todo-popup__list');

const addTaskElement = document.querySelector('.todo-popup__item-first');

okButton.addEventListener('click', () => {
  const taskText = document.querySelector('.task-popup__field'); // textarea
  addTaskElement.style.display = 'none';

  const newTask = createElement('li', 'todo-popup__item');

  // eslint-disable-next-line prettier/prettier
  const picTaskDone = createElement('img', 'todo-popup__pic todo-popup__pic-done', 'Mark as done');
  // eslint-disable-next-line prettier/prettier
  const picTaskDelete = createElement('img', 'todo-popup__pic todo-popup__pic-delete', 'Delete');

  picTaskDone.src = doneIcon;
  picTaskDelete.src = deleteIcon;

  newTask.innerText = taskText.value;

  insertElement(todoList, newTask);
  insertElement(newTask, picTaskDone);
  insertElement(newTask, picTaskDelete);

  picTaskDone.addEventListener('click', (e) => {
    e.stopPropagation();
    newTask.style.opacity = 0.5;
    newTask.style.textDecoration = 'line-through';
  });

  picTaskDelete.addEventListener('click', (e) => {
    e.stopPropagation();
    newTask.remove();

    if (!document.querySelector('.todo-popup__item')) {
      addTaskElement.style.display = 'block';
    }
  });

  taskText.value = '';
});

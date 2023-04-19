import './index.html';
import './style.scss';
import Popup from '../../js/modules/main/Popup.mjs';
import deleteIcon from '../../assets/images/main/icons/delete.svg';
import doneIcon from '../../assets/images/main/icons/done.svg';
import findUser from '../../js/modules/_global-utils.mjs';
import {
  getMyTodos,
  createTodo,
  performTodo,
  removeTodo,
  getCompleted,
} from '../../js/modules/main/_requests.mjs';
import { requestEndpoints } from '../../js/modules/login/services/endpoints.mjs';

async function renderUserProfile(userData) {
  const profileItems = document.querySelectorAll('.profile-list__item_value');
  const profilePopupGreetingsElem = document.querySelector(
    '.profile-popup__greetings'
  );

  profilePopupGreetingsElem.textContent = `Hello, ${userData.user.username}!`;

  profileItems.forEach(async (item) => {
    const itemCopy = item;

    if (item.closest('.profile-list__username')) {
      itemCopy.textContent = userData.user.username;
    }

    if (item.closest('.profile-list__mail')) {
      itemCopy.firstElementChild.textContent = userData.user.email;
      itemCopy.firstElementChild.href = `mailto:${userData.user.email}`;
    }

    if (item.closest('.profile-list__completed')) {
      const { finishedTodos } = await getCompleted(userData.token);
      itemCopy.textContent = finishedTodos.length;
    }
  });
}

// * GET USER DATA
const userData = await findUser();
if (userData) await renderUserProfile(userData);
// * GET USER DATA

// * FUNCTIONS
function insertElement(place, element) {
  place.appendChild(element);
}

function createElement(tag, classes, newTitle) {
  const newElement = document.createElement(tag);
  newElement.className = classes;

  if (newTitle) newElement.setAttribute('title', newTitle);
  return newElement;
}

function createNewTask(
  taskText,
  taskID,
  todoListElem = document.querySelector('.todo-popup__list')
) {
  const newTask = createElement('li', 'todo-popup__item');
  newTask.id = taskID;

  const picTaskDone = createElement(
    'img',
    'todo-popup__pic todo-popup__pic-done',
    'Mark as done'
  );

  const picTaskDelete = createElement(
    'img',
    'todo-popup__pic todo-popup__pic-delete',
    'Delete'
  );

  picTaskDone.src = doneIcon;
  picTaskDelete.src = deleteIcon;

  newTask.textContent = taskText;

  insertElement(todoListElem, newTask);
  insertElement(newTask, picTaskDone);
  insertElement(newTask, picTaskDelete);

  return { newTask, picTaskDone, picTaskDelete };
}

function renderNewTask(
  todoTask,
  todoID,
  todoStatus = 'OPEN',
  addTaskElement = document.querySelector('.todo-popup__item-first')
) {
  addTaskElement.classList.add('_none');

  const { newTask, picTaskDone, picTaskDelete } = createNewTask(
    todoTask,
    todoID
  );

  if (todoStatus === 'DONE') newTask.classList.add('_done');

  picTaskDone.addEventListener('click', async (e) => {
    e.stopPropagation();
    await performTodo(newTask.id, userData.token);
    const { finishedTodos } = await getCompleted(userData.token);
    document
      .querySelector('.profile-list__completed')
      .querySelector('.profile-list__item_value').textContent =
      finishedTodos.length;
    newTask.classList.add('_done');
  });

  picTaskDelete.addEventListener('click', async (e) => {
    e.stopPropagation();
    await removeTodo(newTask.id, userData.token);
    newTask.remove();

    if (!document.querySelector('.todo-popup__item')) {
      addTaskElement.classList.remove('_none');
    }
  });
}

function userLogout() {
  window.sessionStorage.removeItem('token');
  window.location.href = requestEndpoints.login;
}

// * ELEMENTS
const popupLinks = document.querySelectorAll('.popup-link');
const popupCloseIcon = document.querySelectorAll('.popup__close');
const todoPopupLink = document.querySelector('.todo-popup__link');

const addTaskElement = document.querySelector('.todo-popup__item-first');

const targetForm = document.querySelector('.task-popup__body');
const okButton = document.querySelector('.task-popup__buttons_ok');
const noButton = document.querySelector('.task-popup__buttons_no');

const logoutElement = document.querySelector('.logout');

// * TEST TOKEN

if (userData.user.todos.length > 0) {
  const { list } = await getMyTodos(userData.token);

  addTaskElement.classList.add('_none');

  list.forEach((todo) => {
    if (todo) {
      // eslint-disable-next-line no-underscore-dangle
      renderNewTask(todo.task, todo._id, todo.status);
    }
  });
}

// * POPUP
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

// * PAGINATION (SIA IMPLEMENTATION)

okButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const formData = new FormData(targetForm);

  const taskText = formData.get('task-text');

  if (taskText) {
    const { newTodo } = await createTodo(taskText, userData.token);
    // eslint-disable-next-line no-underscore-dangle
    renderNewTask(taskText, newTodo._id, newTodo.status);
  }

  setTimeout(() => {
    targetForm.reset();
  }, 1000);
});

noButton.addEventListener('click', (e) => {
  e.preventDefault();

  setTimeout(() => {
    targetForm.reset();
  }, 1000);
});

logoutElement.addEventListener('click', userLogout);

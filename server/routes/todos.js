/* eslint-disable import/extensions */
import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import {
  createTodo,
  getAll,
  getAndUpdateStatusByID,
  getMyTodos,
  removeByID,
} from '../controllers/todos.js';

const router = new Router();

// * CREATE TODO
router.post('/', checkAuth, createTodo);

// * GET ALL TODOS
router.get('/', getAll);

// * GET AND UPDATE TODO STATUS BY ID
router.get('/:id', getAndUpdateStatusByID);

// * GET MY TODOS
router.get('/user/me', checkAuth, getMyTodos);

// * REMOVE TODO
router.delete('/:id', removeByID);

export default router;

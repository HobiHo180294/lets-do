/* eslint-disable import/extensions */
import Todo from '../models/Todo.js';
import User from '../models/User.js';
import serverResponse from '../services/response.js';

export async function createTodo(req, res) {
  try {
    const { task } = req.body;
    const user = await User.findById(req.userId);

    const newTodo = new Todo({
      username: user.username,
      author: req.userId,
      task,
      status: 'OPEN',
    });

    await newTodo.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { todos: newTodo },
    });

    return res.status(serverResponse.status.httpSuccess).json({
      newTodo,
      success: true,
      message: serverResponse.message.todos.isCreated,
    });
  } catch (error) {
    return res.status(serverResponse.status.httpBadRequest).json({
      success: false,
      error: error.message,
      message: serverResponse.message.todos.fail,
    });
  }
}

export async function getAll(req, res) {
  try {
    const todos = await Todo.find().sort('-createdAt');

    if (!todos) {
      return res.status(serverResponse.status.httpNoContent).json({
        success: false,
        message: serverResponse.message.todos.noContent,
      });
    }

    return res.status(serverResponse.status.httpSuccess).json({
      todos,
      success: true,
      message: serverResponse.message.todos.returned,
    });
  } catch (error) {
    return res.status(serverResponse.status.httpBadRequest).json({
      success: false,
      error: error.message,
      message: serverResponse.message.todos.getFail,
    });
  }
}

export async function getMyTodos(req, res) {
  try {
    const user = await User.findById(req.userId);
    const page = req.query.page || 1;
    const limit = req.query.limit || 7;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const list = await Promise.all(
      /* eslint-disable no-underscore-dangle */
      user.todos
        .slice(startIndex, endIndex)
        .map((todo) => Todo.findById(todo._id))
      /* eslint-disable no-underscore-dangle */
    );

    return res.status(serverResponse.status.httpSuccess).json({
      list,
      success: true,
      message: serverResponse.message.todos.returned,
    });
  } catch (error) {
    return res.status(serverResponse.status.httpBadRequest).json({
      success: false,
      error: error.message,
      message: serverResponse.message.todos.getFail,
    });
  }
}

export async function getAndUpdateStatusByID(req, res) {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { status: 'DONE' },
      },
      { new: true }
    );

    if (!todo) {
      return res.status(serverResponse.status.httpNotFound).json({
        success: false,
        message: serverResponse.message.todos.getFail,
      });
    }

    return res.status(serverResponse.status.httpSuccess).json({
      todo,
      success: true,
      message: serverResponse.message.todos.returned,
    });
  } catch (error) {
    return res.status(serverResponse.status.httpNotFound).json({
      success: false,
      error: error.message,
      message: serverResponse.message.todos.getFail,
    });
  }
}

export async function removeByID(req, res) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(serverResponse.status.httpNotFound).json({
        success: false,
        message: serverResponse.message.todos.getFail,
      });
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { todos: req.params.id },
    });

    return res.status(serverResponse.status.httpSuccess).json({
      success: true,
      message: serverResponse.message.todos.deleted,
    });
  } catch (error) {
    return res.status(serverResponse.status.httpBadRequest).json({
      success: false,
      error: error.message,
      message: serverResponse.message.todos.getFail,
    });
  }
}

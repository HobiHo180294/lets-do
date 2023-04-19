const ROOT = 'http://localhost:3000/api/todos/';

export async function getMyTodos(token, limit = 7, page = 1) {
  try {
    const response = await fetch(
      `${ROOT}/user/me?limit=${limit}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function createTodo(todoText, token) {
  try {
    const response = await fetch(`${ROOT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ task: todoText }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function performTodo(todoID, token) {
  try {
    const response = await fetch(`${ROOT}/${todoID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function removeTodo(todoID, token) {
  try {
    const response = await fetch(`${ROOT}/${todoID}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getCompleted(token) {
  try {
    const response = await fetch(`${ROOT}/user/me/finished`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

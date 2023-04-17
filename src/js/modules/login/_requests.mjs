const ROOT = 'http://localhost:3000/api/auth';

export async function registerUser(userData) {
  try {
    const response = await fetch(`${ROOT}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function authUser(userData) {
  try {
    const response = await fetch(`${ROOT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

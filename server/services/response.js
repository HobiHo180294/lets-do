const responseStatus = {
  httpSuccess: 200,
  httpBadRequest: 400,
  httpUnauthorized: 401,
  httpNoAccess: 403,
  httpNotFound: 404,
  httpConflict: 409,
};

const responseMessage = {
  username: {
    exists: 'Entered username already exists',
  },

  email: {
    exists: 'Entered email already exists',
  },

  password: {
    wrong: 'Password is wrong',
  },

  registration: {
    success: 'Your data is successfully accepted! Please wait...',
    fail: 'Failed to create user!',
  },

  login: {
    success: 'Your data is successfully accepted! Please wait...',
    fail: 'Failed to authorize user!',
    noAccess: 'No access!',
  },

  user: {
    notFound: 'Failed to find such user',
    isFound: 'User is successfully found',
  },
};

const serverResponse = {
  status: responseStatus,
  message: responseMessage,
};

export default serverResponse;

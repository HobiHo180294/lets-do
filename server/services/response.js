const responseStatus = {
  httpSuccess: 200,
  httpNoContent: 204,
  httpBadRequest: 400,
  httpUnauthorized: 401,
  httpNoAccess: 403,
  httpNotFound: 404,
  httpConflict: 409,
  httpServerError: 500,
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

  todos: {
    isCreated: 'Todo is created',
    fail: 'Failed to create Todo',
    noContent: 'Currently there are no Todos in database',
    returned: 'All Todos are successfully returned',
    getFail: 'Failed to find appropriate Todos',
    deleted: 'Todo is successfully removed',
  },

  server: {
    internalError:
      'Sorry, we encountered an unexpected error. Please try again later.',
  },
};

const serverResponse = {
  status: responseStatus,
  message: responseMessage,
};

export default serverResponse;

export const ERRORS = {
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: {
      error: 'Internal Server Error',
      error_description: 'Something went wrong',
    },
  },
  MISDIRECTED_REQUEST: {
    statusCode: 421,
    message: {
      error: 'Misdirected Request',
      error_description: 'You have given a wrong request',
    },
  },
  USER_ALREADY_EXISTS: {
    statusCode: 409,
    message: {
      error: 'User Already Exists',
      error_description: 'User has already registered',
    },
  },
  ACCESS_FORBIDDEN: {
    statusCode: 403,
    message: {
      error: 'Access Forbidden',
      error_description: 'You do not have access to this resource',
    },
  },
};

export const MESSAGES = {
  REGISTRATION_SUCCESS: 'Registered Successfully for the Recruitments',
  FETCHED_USERS_SUCCESS: 'Fetched all the users successfully',
};

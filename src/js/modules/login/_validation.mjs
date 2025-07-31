import {
  beginsFromCapital,
  checkSecondPosition,
  checkThirdPosition,
  hasOnlyOneSpecialCharacter,
} from './_validation-utils.mjs';

const SUCCESS_VALIDATION_MESSAGE =
  'Your data is successfully accepted! Please wait...';
const FAIL_VALIDATION_MESSAGE = 'Something is wrong...';

const validationErrors = {
  emptyFields: {
    default: 'Fill in all empty fields!',
  },

  username: {
    uppercase: 'The first letter must be capitalized!',
    minLength: 'Minimal length is 4 symbols!',
    default: 'Must contain only letters and digits!',
  },

  userEmail: {
    default: 'Please enter a valid e-mail!',
  },

  userPassword: {
    uppercase: 'The first letter must be capitalized!',
    secondPosition: 'The second position must contain a letter or digit',
    thirdPosition: 'The third position must contain special symbol!',
    singleSpecialCharacter: 'Must contain only one special symbol!',
    minLength: 'Minimal length is 4 symbols!',
    default: 'Password is invalid!',
  },
};

// ? Username must have at least one capital letter (it must be a first letter),
// ? minimum 4 symbols, maximum 10 symbols, only letters and digits
function meetRequirementsUsername(username) {
  const regExpUsername = /^[A-Z][A-Za-z0-9]{3,9}$/;
  return regExpUsername.test(String(username));
}

function meetRequirementsEmail(email) {
  const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regExpEmail.test(String(email));
}

// ? Checks that password has capital letter at the first position, after the first capital letter
// ? at least 1 any letter or digit should follow, then the special must follow and then
// ? at least one letter or digit. Minimum length is 4 symbols, max length is 8 symbols
function meetRequirementsPassword(password) {
  const regExpPassword =
    /^[A-Z][a-zA-Z0-9]{1,}[!@#$%^&*()_+|~=`{}[\]:";'<>?,./]{1}[a-zA-Z0-9]{1,}$/;
  return regExpPassword.test(String(password));
}

function throwEmptyFieldsError(emptyFieldsErrorElement, requiredFields) {
  const emptyFieldsErrorElementCopy = emptyFieldsErrorElement;

  emptyFieldsErrorElementCopy.textContent =
    validationErrors.emptyFields.default;

  [...requiredFields].forEach((field) => {
    if (field.value === '') {
      const fieldCopy = field;
      fieldCopy.placeholder = '!';
    }
  });

  return validationErrors.emptyFields.default;
}

function acceptNonEmptyFields(emptyFieldsErrorElement) {
  const emptyFieldsErrorElementCopy = emptyFieldsErrorElement;

  emptyFieldsErrorElementCopy.textContent = '';
}

function throwUsernameError(userNameElement, userNameValue) {
  const userNameElementCopy = userNameElement;

  if (!beginsFromCapital(userNameValue)) {
    userNameElementCopy.nextElementSibling.textContent =
      validationErrors.username.uppercase;
    return validationErrors.username.uppercase;
  }

  if (userNameValue.length < 4) {
    userNameElementCopy.nextElementSibling.textContent =
      validationErrors.username.minLength;
    return validationErrors.username.minLength;
  }

  userNameElementCopy.nextElementSibling.textContent =
    validationErrors.username.default;

  return validationErrors.username.default;
}

function throwEmailError(userEmailElement) {
  const userEmailElementCopy = userEmailElement;

  userEmailElementCopy.nextElementSibling.textContent =
    validationErrors.userEmail.default;

  return validationErrors.userEmail.default;
}

function throwPasswordError(userPasswordElement, userPasswordValue) {
  const userPasswordElementCopy = userPasswordElement;

  if (!beginsFromCapital(userPasswordValue)) {
    userPasswordElementCopy.nextElementSibling.textContent =
      validationErrors.userPassword.uppercase;
    return validationErrors.userPassword.uppercase;
  }

  if (!checkSecondPosition(userPasswordValue)) {
    userPasswordElementCopy.nextElementSibling.textContent =
      validationErrors.userPassword.secondPosition;
    return validationErrors.userPassword.secondPosition;
  }

  if (!checkThirdPosition(userPasswordValue)) {
    userPasswordElementCopy.nextElementSibling.textContent =
      validationErrors.userPassword.thirdPosition;
    return validationErrors.userPassword.thirdPosition;
  }

  if (!hasOnlyOneSpecialCharacter(userPasswordValue)) {
    userPasswordElementCopy.nextElementSibling.textContent =
      validationErrors.userPassword.singleSpecialCharacter;
    return validationErrors.userPassword.singleSpecialCharacter;
  }

  if (userPasswordValue.length < 4) {
    userPasswordElementCopy.nextElementSibling.textContent =
      validationErrors.userPassword.minLength;
    return validationErrors.userPassword.minLength;
  }

  userPasswordElementCopy.nextElementSibling.textContent =
    'Password is invalid!';
  return validationErrors.userPassword.default;
}

function acceptUsername(userNameElement) {
  const userNameElementCopy = userNameElement;

  if (userNameElementCopy.nextElementSibling.textContent !== '')
    userNameElementCopy.nextElementSibling.textContent = '';
}

function acceptEmail(userEmailElement) {
  const userEmailElementCopy = userEmailElement;

  if (userEmailElementCopy.nextElementSibling.textContent !== '')
    userEmailElementCopy.nextElementSibling.textContent = '';
}

function acceptPassword(userPasswordElement) {
  const userPasswordElementCopy = userPasswordElement;

  if (userPasswordElementCopy.nextElementSibling.textContent !== '')
    userPasswordElementCopy.nextElementSibling.textContent = '';
}

function validateUsername(userNameElement, userNameValue) {
  if (!meetRequirementsUsername(userNameValue))
    throwUsernameError(userNameElement, userNameValue);
  else acceptUsername(userNameElement);
}

function validateUserEmail(userEmailElement, userEmailValue) {
  if (!meetRequirementsEmail(userEmailValue)) throwEmailError(userEmailElement);
  else acceptEmail(userEmailElement);
}

function validateUserPassword(userPasswordElement, userPasswordValue) {
  if (!meetRequirementsPassword(userPasswordValue))
    throwPasswordError(userPasswordElement, userPasswordValue);
  else acceptPassword(userPasswordElement);
}

export default function validateFields(
  userNameElement = document.querySelector('.username-input'),
  userEmailElement = document.querySelector('.email-input'),
  userPasswordElement = document.querySelector('.password-input'),
  required = document.querySelectorAll('[required]')
) {
  const emptyFieldsErrorElement = document.querySelector('._empty-error');

  const userNameValue = userNameElement.value;
  let userEmailValue = null;
  const userPasswordValue = userPasswordElement.value;

  const isEmptyField = [...required].some((field) => field.value === '');

  if (isEmptyField) throwEmptyFieldsError(emptyFieldsErrorElement, required);
  else acceptNonEmptyFields(emptyFieldsErrorElement);

  validateUsername(userNameElement, userNameValue);
  validateUserPassword(userPasswordElement, userPasswordValue);

  if (userEmailElement) {
    userEmailValue = userEmailElement.value;
    validateUserEmail(userEmailElement, userEmailValue);

    if (
      !isEmptyField &&
      meetRequirementsUsername(userNameValue) &&
      meetRequirementsEmail(userEmailValue) &&
      meetRequirementsPassword(userPasswordValue)
    ) {
      return {
        isValid: true,
        message: SUCCESS_VALIDATION_MESSAGE,
      };
    }
  } else if (
    !isEmptyField &&
    meetRequirementsUsername(userNameValue) &&
    meetRequirementsPassword(userPasswordValue)
  ) {
    return {
      isValid: true,
      message: SUCCESS_VALIDATION_MESSAGE,
    };
  }

  return {
    isValid: false,
    message: FAIL_VALIDATION_MESSAGE,
  };
}

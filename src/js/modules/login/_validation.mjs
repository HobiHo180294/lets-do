// ? Username must have at least one capital letter (it must be a first letter),
// ? minimum 4 symbols, maximum 10 symbols, only letters and digits
function validateUsername(username) {
  const regExpUsername = /^[A-Z][A-Za-z0-9]{3,9}$/;
  return regExpUsername.test(String(username));
}

function validateEmail(email) {
  const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regExpEmail.test(String(email));
}

// ? Checks that password has capital letter at the first position, after the first capital letter
// ? at least 1 any letter or digit should follow, then the special must follow and then
// ? at least one letter or digit. Minimum length is 4 symbols, max length is 8 symbols
function validatePassword(password) {
  const regExpPassword =
    /^[A-Z][a-zA-Z0-9]{1,}[!@#$%^&*()_+|~=`{}[\]:";'<>?,./]{1}[a-zA-Z0-9]{1,}$/;
  return regExpPassword.test(String(password));
}

export default function validateFields(
  userNameElement = document.querySelector('.username-input'),
  userEmailElement = document.querySelector('.email-input'),
  userPasswordElement = document.querySelector('.password-input'),
  required = document.querySelectorAll('[required]')
) {
  const userNameValue = userNameElement.value;
  let userEmailValue = null;
  const userPasswordValue = userPasswordElement.value;

  const isEmptyField = [...required].some((field) => field.value === '');

  if (isEmptyField) {
    console.log('Fill in all empty fields! Validation Error!');
    return;
  }

  if (!userNameElement.classList.contains('_error-validate')) {
    if (!validateUsername(userNameValue)) {
      console.log('Please enter a valid username!');
      return;
    }
  }

  if (userEmailElement) {
    userEmailValue = userEmailElement.value;

    if (!userNameElement.classList.contains('_error-validate')) {
      if (!validateEmail(userEmailValue)) {
        console.log('Please enter a valid e-mail!');
        return;
      }
    }
  }

  if (!userPasswordElement.classList.contains('_error-validate')) {
    if (!validatePassword(userPasswordValue)) {
      console.log('Please enter a valid password!');
      return;
    }
  }

  if (
    !isEmptyField &&
    validateUsername(userNameValue) &&
    validateEmail(userEmailValue) &&
    validatePassword(userPasswordValue)
  ) {
    console.log('Everything is fine! Form will be submitted!');
  }
}

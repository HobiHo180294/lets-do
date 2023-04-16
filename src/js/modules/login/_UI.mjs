const REGISTER_TEXT_CONTENT = 'Register';

const renderMailFormItem = () => `
  <div class="form__item">
    <label for="#" class="form__label"> E-Mail: </label>
    <input type="email" class="form__input email-input" required />
    <div class="error"></div>
  </div>
`;

const renderLoginAccountField = () => `
  Already have an account?
  <a href="/login" class="login__account-join"> Login </a>
`;

const renderRegistrationForm = () => {
  const formTitle = document.querySelector('.form__title');
  const firstFormItem = document.querySelector('.form__item');
  const formButton = document.querySelector('.form__btn');
  const loginAccountField = document.querySelector('.login__account');

  formTitle.textContent = REGISTER_TEXT_CONTENT;
  firstFormItem.insertAdjacentHTML('afterend', renderMailFormItem());

  formButton.textContent = REGISTER_TEXT_CONTENT;
  formButton.classList.add('_register-mb');

  loginAccountField.innerHTML = renderLoginAccountField();
};

export default renderRegistrationForm;

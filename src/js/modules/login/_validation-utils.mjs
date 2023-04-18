export function beginsFromCapital(string) {
  return /^[A-Z]/.test(string);
}

export function checkSecondPosition(string) {
  return /^[A-Z][a-zA-Z\d]{1}/.test(string);
}

export function checkThirdPosition(string) {
  const thirdCharacter = string.charAt(2);
  return /^[!@#$%^&*()_+|~=`{}[\]:";'<>?,./]$/.test(thirdCharacter);
}

export function hasOnlyOneSpecialCharacter(string) {
  const specialCharCount =
    string.match(/[!@#$%^&*()_+|~=`{}[\]:";'<>?,./]/g)?.length ?? 0;
  return specialCharCount === 1;
}

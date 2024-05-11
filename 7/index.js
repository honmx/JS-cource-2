import { validateCardNumber, validateExpireDate, correctExpireDate, validateCVC } from "./validations";

let isCardNumberValid = false;
let isExpireDateValid = false;
let isCvcValid = false;

const cardNumberElem = document.querySelector('.card-number');
cardNumberElem.addEventListener('input', (e) => {
  const payingSystemImg = document.querySelector('.paying-system');
  const validationResult = validateCardNumber(e.target.value)
  e.target.value = validationResult.value;
  isCardNumberValid = validationResult.isValid;
  checkButtonAccess();

  const payingSystemNumber = validationResult.value[0];

  switch (payingSystemNumber?.toString().trim()) {
    case '5':
      payingSystemImg.src = './assets/mastercard.png'
      break;
    case '4':
      payingSystemImg.src = './assets/visa.png'
      break;
    case '3':
      payingSystemImg.src = './assets/american_express.png'
      break;
    case '2':
      payingSystemImg.src = './assets/mir.png'
      break;
    default:
      payingSystemImg.src = './assets/question.svg';
      break;

  }
});

const expireDateElem = document.querySelector('.expire-date');
expireDateElem.addEventListener('input', (e) => {
  const validationResult = validateExpireDate(e.target.value);
  e.target.value = validationResult.value;
  checkButtonAccess();
});

expireDateElem.addEventListener('blur', (e) => {
  const validationResult = correctExpireDate(e.target.value);
  e.target.value = validationResult.value;
  isExpireDateValid = validationResult.isValid;
  checkButtonAccess();
});

const cvcElem = document.querySelector('.cvc');
cvcElem.addEventListener('input', (e) => {
  const validationResult = validateCVC(e.target.value);
  e.target.value = validationResult.value;
  isCvcValid = validationResult.isValid;
  checkButtonAccess();
});

function checkButtonAccess() {
  const btn = document.querySelector('.submit');

  if (isCardNumberValid && isExpireDateValid && isCvcValid) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}
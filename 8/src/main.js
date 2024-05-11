import 'babel-polyfill';
import { validateCardNumber, validateExpireDate, correctExpireDate, validateCVC } from "./validations";
import { el, setChildren } from 'redom';

import visaLogo from './img/Visa.png';
import mirLogo from './img/mir.png';
import mastercardLogo from './img/mastercard.png';
import americanExpressLogo from './img/American_Express.png';

import './style.css';

const main = el('main');
const form = el('form', { class: 'card-form' });

const createInputElement = (type, className, placeholder, required) => {
  return el('input', { type, class: className, placeholder, required });
};

const cardNumberElem = createInputElement('text', 'card-input', 'XXXX XXXX XXXX XXXX', true);
const paymentSystemImg = el('img', { class: 'paying-system', src: './src/img/question.svg' });
const expireDateElem = createInputElement('text', 'card-input', 'ММ/ГГ', true);
const cvcElem = createInputElement('text', 'card-input', 'CVC', true);
const emailElem = createInputElement('email', 'card-input', 'example@mail.ru', true);
const submitBtn = el('button', 'Оплатить', { disabled: true });

setChildren(form, [cardNumberElem, paymentSystemImg, expireDateElem, cvcElem, emailElem, submitBtn]);
setChildren(main, form);
setChildren(document.body, main);

let isCardValid = false;
let isExpireDateValid = false;
let isCVCValid = false;

const handleInputValidation = (e, validationFunction, validityFlag) => {
  const validationResult = validationFunction(e.target.value);
  e.target.value = validationResult.value;
  if (validityFlag !== undefined) {
    validityFlag = validationResult.isValid;
  }
  checkButtonAccess();
};

const updatePaymentSystemImage = (payingSystemNumber) => {
  switch (payingSystemNumber) {
    case '5':
      paymentSystemImg.src = mastercardLogo;
      break;
    case '4':
      paymentSystemImg.src = visaLogo;
      break;
    case '3':
      paymentSystemImg.src = americanExpressLogo;
      break;
    case '2':
      paymentSystemImg.src = mirLogo;
      break;
    default:
      paymentSystemImg.src = '#';
      break;
  }
};

cardNumberElem.addEventListener('input', (e) => {
  handleInputValidation(e, validateCardNumber, isCardValid);
  updatePaymentSystemImage(e.target.value[0]);
});

expireDateElem.addEventListener('input', (e) => {
  handleInputValidation(e, validateExpireDate);
});

expireDateElem.addEventListener('blur', (e) => {
  handleInputValidation(e, correctExpireDate, isExpireDateValid);
});

cvcElem.addEventListener('input', (e) => {
  handleInputValidation(e, validateCVC, isCVCValid);
});

function checkButtonAccess() {
  submitBtn.disabled = !(isCardValid && isExpireDateValid && isCVCValid);
}

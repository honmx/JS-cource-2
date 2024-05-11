export function validateCardNumber(cardNum) {
  let cardValue = cardNum.replace(/\D/g, '');
  let isCardValid = cardValue.length >= 16;

  cardValue = cardValue.substring(0, 16);
  cardValue = cardValue.replace(/(\d{4})/g, '$1 ').trim();

  return {
    value: cardValue,
    isValid: isCardValid
  };
}

export function validateExpireDate(expDate) {
  let dateValue = expDate.replace(/\D/g, '');
  let isDateValid = dateValue.length >= 4;

  dateValue = dateValue.replace(/(\d{2})/g, '$1/')
  dateValue = dateValue.substring(0, 5);

  return {
    value: dateValue,
    isValid: isDateValid
  };
}

export function correctExpireDate(expDate) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  let [month, year] = expDate.split('/');
  let isDateValid = true;

  if (parseInt(month) > 12 || parseInt(month) < 1) {
    alert('Invalid month');
    isDateValid = false;
  }

  if (
    parseInt(year) < currentYear ||
    parseInt(year) === currentYear && parseInt(month) <= currentMonth
  ) {
    alert('Card expiration date has passed');
    isDateValid = false;
  }

  return {
    value: month || year ? `${month}/${year || ''}` : '',
    isValid: isDateValid
  };
}

export function validateCVC(cvc) {
  const cvcValue = cvc.replace(/\D/g, '').substring(0, 3);
  const isCVCValid = cvcValue.length >= 3;
  return {
    value: cvcValue,
    isValid: isCVCValid
  };
}

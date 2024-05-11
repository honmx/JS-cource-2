import {
  validateCardNumber,
  validateExpireDate,
  correctExpireDate,
  validateCVC,
} from '../src/validations';

test('Card number validation tests', () => {
  expect(validateCardNumber('1111 1111 1111 1111')).toStrictEqual({
    value: '1111 1111 1111 1111',
    isValid: true,
  });
  expect(validateCardNumber('1111 1111 1111 1111')).toStrictEqual({
    value: '1111 1111 1111 1111',
    isValid: true,
  });
  expect(validateCardNumber('1111 1111 11111111')).toStrictEqual({
    value: '1111 1111 1111 1111',
    isValid: true,
  });
  expect(validateCardNumber('')).toStrictEqual({
    value: '',
    isValid: false,
  });
  expect(validateCardNumber('1111 1111 1111')).toStrictEqual({
    value: '1111 1111 1111',
    isValid: false,
  });
  expect(validateCardNumber('1111 1111 1111 1111 1111 1111')).toStrictEqual({
    value: '1111 1111 1111 1111',
    isValid: true,
  });
  expect(validateCardNumber('asdasd')).toStrictEqual({
    value: '',
    isValid: false,
  });
  expect(validateCardNumber('asdasd1111 1111 1111 1111')).toStrictEqual({
    value: '1111 1111 1111 1111',
    isValid: true,
  });
  expect(validateCardNumber('asdasd1111 1111 1111@@')).toStrictEqual({
    value: '1111 1111 1111',
    isValid: false
  });
  expect(validateCardNumber('asdasd1111 1111 @@111@1 asdasd1111')).toStrictEqual({
    value: '1111 1111 1111 1111',
    isValid: true
  });
});
test('Expire date validation tests', () => {
  expect(validateExpireDate('05/24')).toStrictEqual({
    value: '05/24',
    isValid: true,
  });
  expect(validateExpireDate('0524')).toStrictEqual({
    value: '05/24',
    isValid: true,
  });
  expect(validateExpireDate('05')).toStrictEqual({
    value: '05/',
    isValid: false,
  });
  expect(validateExpireDate('05/2')).toStrictEqual({
    value: '05/2',
    isValid: false,
  });
  expect(validateExpireDate('0')).toStrictEqual({
    value: '0',
    isValid: false
  });
  expect(validateExpireDate('@@0524@@')).toStrictEqual({
    value: '05/24',
    isValid: true,
  });
  expect(validateExpireDate('@@052@@')).toStrictEqual({
    value: '05/2',
    isValid: false,
  });
  expect(validateExpireDate('asdasd')).toStrictEqual({
    value: '',
    isValid: false,
  });
  expect(validateExpireDate('asdasd0asdasd5asdasd2asdasd4')).toStrictEqual({
    value: '05/24',
    isValid: true
  });
});

test('Expire date correction tests', () => {
  expect(correctExpireDate(validateExpireDate('06/24').value)).toStrictEqual({
    value: '06/24',
    isValid: true,
    errorMsg: '',
  });
  expect(correctExpireDate(validateExpireDate('06/23').value)).toStrictEqual({
    value: '06/23',
    isValid: false,
    errorMsg: 'Card expiration date has passed',
  });
  expect(correctExpireDate(validateExpireDate('-1/25').value)).toStrictEqual({
    value: '12/5',
    isValid: false,
    errorMsg: 'Card expiration date has passed',
  });
  expect(correctExpireDate(validateExpireDate('24/24').value)).toStrictEqual({
    value: '24/24',
    isValid: false,
    errorMsg: 'Invalid month',
  });
  expect(correctExpireDate(validateExpireDate('06/2024').value)).toStrictEqual({
    value: '06/20',
    isValid: false,
    errorMsg: 'Card expiration date has passed',
  });
});

test('CVC/CVV number validatation tests', () => {
  expect(validateCVC('123')).toStrictEqual({
    value: '123',
    isValid: true
  });
  expect(validateCVC('12')).toStrictEqual({
    value: '12',
    isValid: false
  });
  expect(validateCVC('123123')).toStrictEqual({
    value: '123',
    isValid: true
  });
  expect(validateCVC('asd')).toStrictEqual({
    value: '',
    isValid: false
  });
});

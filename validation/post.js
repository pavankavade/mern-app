const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 3000 })) {
    errors.text = 'Post must be between 10 and 300 Characters'
  }
  if (Validator.isEmail(data.text)) {
    errors.text = 'Text is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}
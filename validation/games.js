const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateGameInput(data) {
  let errors = {};
  

  data.location = validText(data.location) ? data.location : '';

//   if (!Validator.isLength(data.text, { min: 5, max: 140 })) {
//     errors.text = 'Tweet must be between 5 and 140 characters';
//   }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'Text field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
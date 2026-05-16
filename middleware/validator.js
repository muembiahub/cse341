const { body, validationResult } = require('express-validator');


const contactValidationRules = () => {
  return [
    body('firstName').trim().notEmpty().withMessage('firstName is required.'),
    body('lastName').trim().notEmpty().withMessage('lastName is required.'),
    body('email').isEmail().withMessage('Valide Emaill is required.').normalizeEmail(),
    body('favoriteColor').trim().notEmpty().withMessage('favoriteColor is required'),
    body('birthday').isISO8601().withMessage(' birthday is required format (YYYY-MM-DD)')
  ];
};

const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); 
  }
  
  return res.status(422).json({
    success: false,
    errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
  });
};

module.exports = {
  contactValidationRules,
  checkValidationResult
};

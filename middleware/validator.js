const { body, validationResult } = require('express-validator');

const contactValidationRules = () => [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required."),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required."),

  body("email")
    .isEmail()
    .withMessage("Valid email is required.")
    .normalizeEmail(),

  body("favoriteColor")
    .trim()
    .notEmpty()
    .withMessage("Favorite color is required."),

  body("birthday")
    .isISO8601({ strict: true })
    .withMessage("Birthday must be in format YYYY-MM-DD")
];


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

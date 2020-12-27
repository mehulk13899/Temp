const {check, validationResult}=require('express-validator');

exports.validatorAuth=[
    check('firstName')
    .notEmpty()
    .withMessage('firstname is require'),
    check('lastname')
    .notEmpty()
    .withMessage('Lastname is required'),
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .notEmpty()
    .isLength({min:6})
    .withMessage('Password must be greated then six digit')
];

exports.validatorAuthSign=[
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .notEmpty()
    .isLength({min:6})
    .withMessage('Password must be greated then six digit')
];




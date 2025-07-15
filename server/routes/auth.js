const express=require("express");
const router =express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const userControllers=require('../controllers/user')
router.post(
  '/createUser',
  [
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  userControllers.signupHandler
);
router.post('/loginUser',  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],userControllers.loginHandler
);
module.exports=router;
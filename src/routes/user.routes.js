const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require('../controllers/user.controller.js');

router.post(
  "/register",
  [
    // Validate email
    body("email")
      .isEmail()
      .withMessage("Invalid email"),

    // Validate first name inside fullname
    body("fullname.firstname")
      .isLength({ min: 2 })
      .withMessage("First name is required and must be at least 2 characters"),

    // Validate last name inside fullname
    body("fullname.lastname")
      .isLength({ min: 2 })
      .withMessage("Last name is required and must be at least 2 characters"),

    // Validate password
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password is required and must be at least 5 characters"),
  ],
  userController.register
);

module.exports = router;

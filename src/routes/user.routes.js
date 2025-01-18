const exprees = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("firstName")
      .isLength({ min: 2 })
      .withMessage("First name is required"),
    body("password").isLength({ min: 5 }).withMessage("Password is required"),
  ],
  userController.register
);

module.exports = router;

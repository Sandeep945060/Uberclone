const userModel = require("../models/user.model");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");

module.exports = {
  /**
   * Register a new user
   */
  register: async (req, res) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { fullname, email, password } = req.body;

      // Ensure fullname contains firstname and lastname
      if (!fullname || !fullname.firstname || !fullname.lastname) {
        return res.status(400).json({ error: "Fullname must include firstname and lastname." });
      }

      // Create the user using the user service
      const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password, // Password will be hashed by the model's pre-save middleware
      });

      // Generate an authentication token
      const token = user.generateAuthToken();

      // Return the user and token
      res.status(201).json({ token, user });
    } catch (error) {
      console.error("Error registering user:", error.message);

      // Check for duplicate email or other known errors
      if (error.message.includes("Email is already in use")) {
        return res.status(400).json({ error: error.message });
      }

      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  /**
   * Log in an existing user
   */
  loginUser: async (req, res) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find the user by email, including the password field
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Generate a token for the authenticated user
      const token = user.generateAuthToken();

      // Respond with the token and user data
      res.status(200).json({ token, user });
    } catch (error) {
      console.error("Error during user login:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

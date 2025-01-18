const userService = require("../services/user.services");
const { validationResult } = require("express-validator");

module.exports.register = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

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

    if (error.message.includes("Email is already in use")) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

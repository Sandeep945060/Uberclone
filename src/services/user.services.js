const userModel = require("../models/user.model");

const createUser = async ({ firstname, lastname, email, password }) => {
  // Check if the email already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email is already in use");
  }

  // Create and save the new user
  const user = new userModel({
    fullname: { firstname, lastname },
    email,
    password, // Password will be hashed by the pre-save middleware
  });

  await user.save();
  return user;
};

module.exports = {
  createUser,
};

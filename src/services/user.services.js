const userModel = require("../models/user.model");

module.exports.register = async ({ email, password, firstname, lastname }) => {
  if (!email || !password || !firstname || !lastname) {
    throw new Error("All fields are required");
  }
  const user = userModel.create({
    email,
    password,
    firstname,
    lastname,
  });
  return user;
};

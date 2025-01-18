const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      // required: true
      minlength: [3, " last name must be at least 3 characters"],
    },
  },
  lastname: {
    type: String,
    required: true,
    minlength: [3, " last name must be at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, " email must be at least 3 characters"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketid: {
    type: String,
    // required: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

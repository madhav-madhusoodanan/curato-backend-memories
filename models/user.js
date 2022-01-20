const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  isAuthenticated: {
      type: Boolean,
      default: false
  },
  authKey: {
      type: String,
      default: ""
  },
  avatar: String,
});

module.exports = mongoose.model("User", User);

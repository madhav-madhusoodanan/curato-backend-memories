const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    authKey: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: ""
    },
});

module.exports = mongoose.model("User", User);

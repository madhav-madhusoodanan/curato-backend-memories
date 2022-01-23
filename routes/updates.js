const Guard = require("../functions/guard");
const UpdateUser = require("../functions/UpdateUser");
const Find = require("../functions/Find");
const User = require("../models/user");

const updater = require("express").Router();

updater.post("/", Guard, UpdateUser);
updater.post("/check", Find);


module.exports = updater;

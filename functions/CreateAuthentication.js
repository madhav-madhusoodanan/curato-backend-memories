const bcrypt = require("bcrypt");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const CreateAuthentication = async (req, res, next) => {
    try {
        if(!req.body.email || req.body.email.trim().length == 0) throw new Error("No email body!")
        let OTP = Math.round(Math.random() * 100000);
        if (OTP < 100000) OTP += 100000;

        console.log("OTP is: " + OTP);
        res.locals.otp = OTP;
        res.locals.email = req.body.email.trim();

        const hash = await bcrypt.hash(OTP.toString(), 12);
        console.log("email received. making collection");
        if (res.locals.email == "") throw new Error("empty credentials");
        const user = await User.findOne({
            email: req.body.email.trim(),
        }).exec();

        if (!user) {
            console.log("User not found...");
            await User.create({
                username: uuidv4(),
                password: hash,
                email: req.body.email.trim(),
                authKey: uuidv4()
            });
        } else {
            console.log("user found!");
            user.password = hash;
            await user.save()
        }
        // send email
        next();
    } catch (error) {
        console.error(error)
        return res.status(400).end()
    }
};

module.exports = CreateAuthentication;

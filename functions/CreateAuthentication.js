const bcrypt = require("bcrypt");
const User = require("../models/user");

const CreateAuthentication = async (req, res) => {
    let OTP = Math.round(Math.random() * 100000);
    if (OTP < 100000) OTP += 100000;

	console.log(OTP)
	
    const hash = await bcrypt.hash(OTP.toString(), 12);

    await User.create({
        username: req.body.password,
        password: hash,
    });

    // send email
};

module.exports = CreateAuthentication;

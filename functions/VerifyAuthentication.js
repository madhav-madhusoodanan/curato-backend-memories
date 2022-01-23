const bcrypt = require("bcrypt");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { isError } = require("util");

const VerifyAuthentication = async (req, res) => {
    try {
        const record = await User.findOne({ email: req.body.email });
        const OTP_HASH = record.password;
        console.log(
            JSON.stringify({
                hash: record.password,
                otp: req.body.password,
            })
        );
        const result = bcrypt.compareSync(req.body.password, OTP_HASH);
        if (result) {
            record.isAuthenticated = true;
            record.password = "";
            record.authKey = uuidv4();

            await record.save();
            res.status(201).send({ auth: record.authKey });
        } else {
            res.status(201).end({});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).end();
    }
};

module.exports = VerifyAuthentication;

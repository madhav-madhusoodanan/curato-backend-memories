const bcrypt = require("bcrypt");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const VerifyAuthentication = async (req, res) => {
    const record = await User.find({ username: req.body.username });
    const OTP_HASH = record.password;

    if (await bcrypt.compare(req.body.password, OTP_HASH)) {
        record.isAuthenticated = true;
        record.password = ""
        record.authKey = uuidv4();

        await record.save();
        res.status(201).send({ auth: record.authKey });
    } else {
        res.status(201).end({});
    }
};

module.exports = VerifyAuthentication;

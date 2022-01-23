const User = require("../models/user");

const Find = async (req, res) => {
    try {
        if (req.body.email) {
            const count = await User.countDocuments({
                email: req.body.email,
            });
            if (count) throw new Error("Already exists");
        }
        if (req.body.username) {
            const count = await User.countDocuments({
                username: req.body.username,
            });
            if (count) throw new Error("Already exists");
        }
        res.status(200).end();
    } catch (_) {
        res.status(400).end();
    }
};

module.exports = Find;

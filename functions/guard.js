const User = require("../models/user");

const Guard = async (req, res, next) => {
    try {
        const authKey = req.get("authentication");
        console.log(authKey)
        const record = await User.findOne({ authKey });
        if (!record) throw new Error("No User Found");

        console.log("id: " + record._id)
        res.locals.user = record;
        next();
    } catch (error) {
        return res.status(401).send(error);
    }
};

module.exports = Guard;

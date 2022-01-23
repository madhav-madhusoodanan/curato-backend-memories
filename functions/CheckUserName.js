const User = require("../models/user");

const CheckUserName = async( req, res ) => {
    try {
        const count = await User.countDocuments({ username: req.body.username })
        if(count != 0) throw new Error("Invalid count of users")

        res.status(200).send(true)
    } catch (error) {
        res.status(200).send(false)
    }
    
}

module.exports = CheckUserName;
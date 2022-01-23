const { v4: uuidv4 } = require("uuid");

const UpdateUser = async (req, res) => {
    try {
        if (req.body.email) {
            res.locals.user.email = req.body.email;
        }
        if (req.body.username) {
            res.locals.user.username = req.body.username;
        }
        if (req.body.avatar) {
            res.locals.user.avatar = req.body.avatar;
        }
        res.locals.user.authKey = uuidv4();

        await res.locals.user.save();
        res.send({ auth: res.locals.user.authKey });
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};

module.exports = UpdateUser;

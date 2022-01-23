const RemoveAuthentication = async (req, res) => {
    try {
        const user = res.locals.user;
        user.password = "";
        user.authKey = "";
        await user.save();
        return res.status(201).send(true);
    } catch (error) {
        return res.status(201).send(false);
    }
};

module.exports = RemoveAuthentication;

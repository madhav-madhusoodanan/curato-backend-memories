const CreateAuthentication = require("../functions/CreateAuthentication");
const VerifyAuthentication = require("../functions/VerifyAuthentication");
const googlePassport = require("../functions/google");
const twitterPassport = require("../functions/twitter");
const Email = require("../functions/email");

const router = require("express").Router();

router.get("/failed", async (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});
router.get("/success", async (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "success",
            user: req.user,
            cookies: req.cookies,
        });
    }
});
router.post("/verify", VerifyAuthentication);

router.get(
    "/google",
    googlePassport.authenticate("google", {
        scope: ["profile"],
    })
);
router.get(
    "/google/callback",
    googlePassport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/failed",
    })
);

router.get("/twitter", twitterPassport.authenticate("twitter"));
router.get(
    "/twitter/callback",
    twitterPassport.authenticate("twitter", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/failed",
    })
);
router.post("/email", CreateAuthentication, Email);

module.exports = router;

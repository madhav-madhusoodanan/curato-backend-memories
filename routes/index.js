const passport = require("passport");
const CreateAuthentication = require("../functions/CreateAuthentication");
const VerifyAuthentication = require("../functions/VerifyAuthentication");
const { VerifyGoogle } = require("../functions/passport");

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
            cookies: req.cookies
        });
    }
});
router.post("/create", CreateAuthentication);
router.post("/verify", VerifyAuthentication);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile"],
    })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/failed",
    })
);

module.exports = router;

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");

const PORT = process.env.PORT || 6969;
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json({limit: '5mb'}));
app.use(
    cookieSession({
        name: "session",
        keys: ["curato"],
        maxAge: 24 * 60 * 60 * 1000,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("hello!");
});
app.use("/auth", require("../routes/index"));
app.use("/verify", require("../routes/updates"));
setInterval(() => {}, 1000);

mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((_) =>
        app.listen(PORT, () => {
            console.log(`Listening to port ${PORT}...`);
        })
    );

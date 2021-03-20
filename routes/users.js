const express = require("express");
const User = require("../models/user");
const passport = require("passport");

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", (req, res, next) => {
  User.register({ username: req.body.username }, req.body.password)
    .then(() => res.json({ success: true, status: "Registration Successful!" }))
    .catch((err) => next(err));
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/jason");
  res.json({ success: true, status: "You are successfully logged in" });
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    const err = new Error("You are not logged in!");
    err.status = 401;
    return next(err);
  }
});

module.exports = router;

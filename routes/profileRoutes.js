import express from "express";

let router = express.Router();

const auth = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    next();
  }
};

router.get("/", auth, (req, res) => {
  res.render("profile", { user: req.user });
});

export default router;

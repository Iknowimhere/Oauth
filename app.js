import "./config/passport.js";
import dotenv from "dotenv";
import express from "express";
import profileRouter from "./routes/profileRoutes.js";
import router from "./routes/authRoutes.js";
import { db } from "./config/db.js";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";

dotenv.config();

db();

let app = express();

app.set("view engine", "ejs");
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/auth", router);
app.use("/profile", profileRouter);

export default app;

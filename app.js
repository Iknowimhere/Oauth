import "./config/passport.js";
import dotenv from "dotenv";
import express from "express";
import profileRouter from "./routes/profileRoutes.js";
import router from "./routes/authRoutes.js";
import { db } from "./config/db.js";

dotenv.config()

db()

let app=express();

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index");
})

app.use("/auth",router);
app.use("/profile",profileRouter);



export default app;
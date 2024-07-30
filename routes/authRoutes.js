import  passport from "passport";
import express from "express";

let router=express.Router();

router.get("/google",passport.authenticate('google',{
    scope:['profile','email']
}))

router.get("/google/redirect",passport.authenticate('google',{failureRedirect:"/"}),(req,res)=>{
    res.redirect("/profile")
})


export default router;
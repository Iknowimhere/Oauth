import GoogleStrategy from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";
import passport from "passport";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async function (accessToken, refreshToken, profile, cb) {
      //find user in db
      let existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        cb(null, existingUser);
      } else {
        let user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
        });
        cb(null, user);
      }
    }
  )
);

//serialize  the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserialize the user
passport.deserializeUser(async (id, done) => {
  let user = await User.findById(id);
  done(null, user);
});

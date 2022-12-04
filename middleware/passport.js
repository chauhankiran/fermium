const crypto = require("crypto");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

passport.use(new LocalStrategy({ usernameField: "email"}, async (email, password, done) => {
  // Create SHA256 hash hex for the password.
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

  try {
    const user = await User.findOne({ where: { email, password: passwordHash }});
    if (user) {
      done(null, user, { alert: "User logged in successfully."});
    } else {
      done(null, false, { alert: "Email or password is incorrect."});
    }
  } catch (err) {
    done(null, false, { alert: "Email or password is incorrect."});
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  try {
    const user = await User.findOne({ where: { id }});
    done(null, user);
  } catch (err) {
    done(err)
    return;
  }
});
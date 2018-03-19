const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
let verbose = true; // used to show explanations for learning

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Person.findById(id).then((result) => {
    // Handle Errors
    const user = result;

    if (!user) {
      // user not found
      done(null, false, { message: 'Incorrect credentials.' });
    } else {
      // user found
      done(null, user);
    }
  }).catch((err) => {
    console.log('query err ', err);
    done(err);
  });
});

// Does actual work of logging in
passport.use('local', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'username',
}, ((req, username, password, done) => {
    if( verbose ) console.log( 'trying to log in:', username, password );
    Person.find({ username })
      .then((result) => {
        const user = result && result[0];
        if( verbose ) console.log( 'using comparePassword:', password, user.password );
        if (user && encryptLib.comparePassword(password, user.password)) {
          // all good! Passwords match!
          if( verbose ) console.log( 'user found and passwords match' );
          done(null, user);
        } else if (user) {
          // not good! Passwords don't match!
          if( verbose ) console.log( 'bad creds' );
          done(null, false, { message: 'Incorrect credentials.' });
        } else {
          // not good! No user with that name
          if( verbose ) console.log( 'cannot find user' );
          done(null, false);
        }
      }).catch((err) => {
        console.log('error', err);
        done(null, {});
      });
  })));

module.exports = passport;

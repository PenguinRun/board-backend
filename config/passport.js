var passport = require('passport');

var config = require('../config/config');
var Strategy = require('passport-facebook').Strategy;


passport.use(new Strategy({
    clientID: config.development.fb.number,
    clientSecret: config.development.fb.key,
    // callbackURL: 'https://devche.com/todolist/login/facebook/return',
    callbackURL: 'http://localhost:8007/api/speechmember/login/facebook/return',
    profileFields: ['id', 'displayName', 'email', 'photos', 'gender']
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.

    // console.log("access: " + accessToken);
    // console.log("refresh: " + refreshToken);
    // console.log("profile: " + JSON.stringify(profile));
    // console.log("email: " + profile._json.email);
    var obj = {
      accessToken: accessToken,
      id: profile._json.id,
      email: profile._json.email,
      name: profile._json.name,
      photos: profile._json.picture.data.url,
      gender: profile._json.gender,
      profile: profile
    }
    // console.log(obj);
    return cb(null, obj);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  // console.log(user);
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


module.exports = passport;

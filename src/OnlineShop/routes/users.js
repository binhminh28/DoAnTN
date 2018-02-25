var express = require('express');
var passport = require('passport');
var passportfb = require('passport-facebook').Strategy;
var localStrategy = require('passport-local').Strategy;
var DB = require('../common/workwDB');

var router = express.Router();

DB.newConnection();
/* Local Strategy */
passport.use(new localStrategy(
  (username, password, done) => {
    DB.login(username,password, function(err){
      if(err){
        return done(null,false,{message: 'Username or Password incorrect'})
      }else {
        return done(null,username)
      }
    })
  }
))

/* Login with Facebook */
passport.use(new passportfb({
  clientID: '192933601439975',
  clientSecret: '55013cacf02f63171efb0c9c35e76c05',
  callbackURL: 'http://localhost:8081/auth/facebook/callback',
  profileFields: ['email', 'gender', 'locale', 'displayName']
},
  (accessToken, refreshToken, profile, done) => {
    console.log(profile._json.email)
    /**
     * Tim 1 user bang profile id
     * neu co: dang nhap
     * neu ko co: tao 1 user moi va dang nhap
     */
    DB.FindOne(profile._json.id,function(user){
      if(user) {
        return done(null, profile._json.email)/**account fb Admin <-> KhachHang */
      }else{
        email = profile._json.email;
        if(profile._json.email===undefined){
          email = profile._json.id
        }
        DB.Register(profile._json.id, email, profile._json.name, profile._json.gender, function(err){
          if(err){
            return done(null, false)
          }else{
            console.log('Luu moi')
            return done(null, profile._json.name)
          }
        })
      }
    })
  }
))
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

/* GET users listing. */
router.get('/login', function (req, res) {
  res.render('./user/login',{message:req.flash('error')})
})
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})
module.exports = router;

var express = require('express');
var session = require('express-session')
var passport = require('passport');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var index = require('./routes/index')
var user = require('./routes/users')
var admin = require('./routes/admin/product')

var app = express();
var validatorOption ={};

app.use(expressValidator(validatorOption));
app.use(session({secret: 'mysecret',resave: true,saveUninitialized: true}))
app.use(flash());
app.use(bodyParser.urlencoded({extended:true}))
app.use(passport.initialize());
app.use(passport.session());


app.engine('ejs', require('ejs-locals'));
app.set('views', './views');
app.set('view engine', 'ejs');


app.use(express.static('public'))
app.use('/', index)
app.use('/',user);
app.use('/',admin);

/* Local Strategy */
app.post('/loginlc',passport.authenticate('local',{
    failureRedirect:'/login',successRedirect:'/admin',failureFlash:true
}))

/* Login with Facebook */
app.get('/auth/fb', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/ngulol', successRedirect: '/'
}))


app.listen(8081, function () {
    console.log("Server is listening on port 8081\nWaiting for database connection...");
});
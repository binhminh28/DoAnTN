var express = require('express');
var session = require('express-session')
var passport = require('passport');
var index = require('./routes/index')
var user = require('./routes/users')
var adminvao = require('./routes/adminvao')
var members = require('./routes/members')
var product = require('./routes/product')
var loginad = require('./routes/loginad')
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var app = express();

app.use(session({
    secret: 'mysecret'
}))
app.use(flash());
app.use(bodyParser.urlencoded({extended:true}))
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use('/', index)
app.use('/user',user);
app.use('/adminvao',adminvao);
app.use('/members',members);
app.use('/loginad',loginad);
app.use('/product',product);

/* Local Strategy */
app.post('/loginlc',passport.authenticate('local',{
    failureRedirect:'/login',successRedirect:'/',failureFlash:true
}))

/* Login with Facebook */
app.get('/auth/fb', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/ngulol', successRedirect: '/'
}))


app.listen(8081, function () {
    console.log("Server listening on port 8081");
});
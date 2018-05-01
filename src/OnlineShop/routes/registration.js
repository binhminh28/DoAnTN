var express = require('express');
var router = express.Router();
var DB = require('../common/workwDB');

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express', hello: req.user });
// });


router.get('/', function (req, res) {
    res.render("registration", { })
})
router.post('/registration/save', function (req, res) {

    var product = {
        username: req.body.username,
        pass: req.body.password,
        sodt:req.body.sodt,
        mail:req.body.mail,
        diachi:req.body.diachi,
    };
    console.log(product)
    DB.CreateUser(product, function (cb) {
        if (cb) {
            res.status(400).json("Can't create product")
        } else {
            req.flash("message", "You just added 1 product to your list product")
            res.redirect("/category");
        }
    })
})
module.exports = router;

var express = require('express');
var router = express.Router();
var DB = require('../common/workwDB');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', hello: req.user });
});


router.get('/admin', isAuthenticated, function (req, res) {
  res.status(200).json({
    status: 'Login successful!' + req.user
  });
})

function isAuthenticated(req, res, next) {
  if (req.user) {
    DB.checkRole(req.user, function (err) {
      if (err) {
        return res.status(401).json({
          error: 'Khong phai admin ' + req.user
        })
      } else {
        return next();
      }
    })
  } else {
    return res.status(401).json({
      error: 'Chua Dang Nhap'
    })
  }
}
// function check(username) {
//   temp = false;
//   DB.checkRole(username, function (err, callback) {
//     if (err) {
//       console.log('ko phai')
//       temp = false;
//     } else {
//       console.log('Admin day ne')
//       temp = true;
//     }
//   })
//   return temp;
// }
/*
router.get('/private', function (req, res) {
  if (req.isAuthenticated() ) {
    res.send('This is private page' + req.session.user)
  } else {
    res.send('Chua Dang Nhap');
  }
})*/
module.exports = router;

var express = require('express');
var router = express.Router();
var DB = require('../common/workwDB');

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express', hello: req.user });
// });


router.get('/', function (req, res) {
    DB.GetAllProduct(function (cb, listproduct) {
        if (cb) {
            res.status(400).json("Can't get Product")
        } else {
            res.render("index", { products: listproduct, hello: req.user })
        }
    })

})
router.get('/detail/:id', function (req, res) {
    var id = req.params.id;
    DB.GetOneProduct(id, function (cb, data) {
        if (cb) {
            res.status(400).json('product not found');
        } else {
            DB.GetAllProduct(function (cb, listCate) {
                if (cb) {
                    res.status(400).json("Can't get Category")
                } else {
                    res.render("detail", { products: data, listCate: listCate, hello: req.user })
                }
            })
        }
    })
})

router.get('/cart', function(req, res){
    res.render('checkout');
})
module.exports = router;

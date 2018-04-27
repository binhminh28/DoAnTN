var express = require('express');
var router = express.Router();
var DB = require('../../common/workwDB');


/* GET home page. */
router.get('/list/thoitrangnu/aothunnu', function (req, res) {

    var currentPage = 1,
        pageSize = 4
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    DB.GetProductperPageNu0(pageSize, currentPage, function (err, data, total) {
        if (err) {
            res.status(400).json("produc not found")
        } else {
            res.render("./list/list", { products: data, hello: req.user,
                pageSize: pageSize,
                pageCount: Math.ceil(total / pageSize),
                currentPage: currentPage,
                message: req.flash('message')
            });
        }
    })
});
router.get('/list/thoitrangnu/damnu', function (req, res) {

    var currentPage = 1,
        pageSize = 4
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    DB.GetProductperPageNu1(pageSize, currentPage, function (err, data, total) {
        if (err) {
            res.status(400).json("produc not found")
        } else {
            res.render("list", { products: data, hello: req.user,
                pageSize: pageSize,
                pageCount: Math.ceil(total / pageSize),
                currentPage: currentPage,
                message: req.flash('message')
            });
        }
    })
});
router.get('/list/thoitrangnu/chanvaynu', function (req, res) {

    var currentPage = 1,
        pageSize = 4
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    DB.GetProductperPageNu2(pageSize, currentPage, function (err, data, total) {
        if (err) {
            res.status(400).json("produc not found")
        } else {
            res.render("list", { products: data, hello: req.user,
                pageSize: pageSize,
                pageCount: Math.ceil(total / pageSize),
                currentPage: currentPage,
                message: req.flash('message')
            });
        }
    })
});
router.get('/list/thoitrangnam/aothunnam', function (req, res) {

    var currentPage = 1,
        pageSize = 4
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    DB.GetProductperPageNam0(pageSize, currentPage, function (err, data, total) {
        if (err) {
            res.status(400).json("produc not found")
        } else {
            res.render("list", { products: data, hello: req.user,
                pageSize: pageSize,
                pageCount: Math.ceil(total / pageSize),
                currentPage: currentPage,
                message: req.flash('message')
            });
        }
    })
});
router.get('/list/thoitrangnam/aosominam', function (req, res) {

    var currentPage = 1,
        pageSize = 4
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    DB.GetProductperPageNam1(pageSize, currentPage, function (err, data, total) {
        if (err) {
            res.status(400).json("produc not found")
        } else {
            res.render("list", { products: data, hello: req.user,
                pageSize: pageSize,
                pageCount: Math.ceil(total / pageSize),
                currentPage: currentPage,
                message: req.flash('message')
            });
        }
    })
});


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
module.exports = router;

router.get('/cart', function(req, res){
    res.render('checkout');
})
module.exports = router;
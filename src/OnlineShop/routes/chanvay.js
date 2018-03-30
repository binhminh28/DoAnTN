var express = require('express');
var router = express.Router();
var DB = require('../common/workwDB');


/* GET home page. */
router.get('/', function (req, res) {

    var currentPage = 1,
        pageSize = 4
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    DB.GetProductperPageChanVay(pageSize, currentPage, function (err, data, total) {
        if (err) {
            res.status(400).json("produc not found")
        } else {
            res.render("chanvay", { products: data, hello: req.user,
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


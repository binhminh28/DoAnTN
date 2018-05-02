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


router.get('/cart', function(req, res){
    res.render('checkout');
})

router.post('/checkout1', (req,res)=>{
    var product ={
        id : req.body.productID,
        sl: req.body.soluong,
        size: req.body.size
    }
    OrderDetail(req.body.productID, req.body.size, req.body.soluong, function(data){
        console.log(data)
    });
    console.log(req.user);
    
    res.render('checkout');    
})

function OrderDetail(productID, size, soluong, data) {
    var product =[];
    for (let index = 0; index < productID.length; index++) {
        product.push({'id': productID[index], 'quantity': soluong[index], 'size': size[index]});
    }
    data(product)
}
module.exports = router;

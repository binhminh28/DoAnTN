var express = require('express');
var router = express.Router();
var DB = require('../../common/workwDB');

/* GET home page. */
router.get('/admin/order',function (req, res) {
    var currentPage = 1,
        pageSize = 4
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }

    DB.GetOrderPerPage(pageSize, currentPage, function (err, data, total) {
        if (err) {
            res.status(400).json("Order not found")
        } else {
            res.render("./admin/order/listorder", { orders: data,
                pageSize: pageSize,
                pageCount: Math.ceil(total / pageSize),
                currentPage: currentPage,
                message: req.flash('message')
            });
        }
    })
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

router.get('/admin/order/:id', (req, res)=>{
    var id = req.params.id;
    DB.GetOneOrder(id,async function (cb, data) {
        if (cb) {
            res.status(400).json('Order not found');
        } else {
            var lstproduct =[];
            for (let index = 0; index < data.length; index++) {
                data[index].OrderDetails.forEach(element => {
                    DB.GetProductInOrder(element.id, (err, detail) =>{
                        lstproduct.push(detail)
                    })
                });
            }
            await sleep(7000);
            
            res.render("./admin/Order/detailorder",{orders:data, products: lstproduct})
            
            
        }
    })
})

router.get('/order/approve/:id', (req, res) =>{
    var id = req.params.id;
    DB.ApproveOrder(id, (cb)=>{
        if(cb){
            res.status(400).json('Error')
        }else{
            res.redirect("/admin/order")
        }
    })
})

router.get('/order/finish/:id', (req, res) =>{
    var id = req.params.id;
    DB.FinishOrder(id, (cb)=>{
        if(cb){
            res.status(400).json('Error')
        }else{
            res.redirect("/admin/order")
        }
    })
})

router.get('/order/reject/:id', (req, res) =>{
    var id = req.params.id;
    DB.RejectOrder(id, (cb)=>{
        if(cb){
            res.status(400).json('Error')
        }else{
            res.redirect("/admin/order")
        }
    })
})
module.exports = router;
var express = require('express');
var router = express.Router();
var DB = require('../common/workwDB');
const paypal = require('paypal-rest-sdk');
var app = express();

/* GET home page. */
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 1,
    'client_secret': 2
});
// 1: AWZVInM4D-55Fa8GUBPyKxe9OIbIgc6_BOBh6Gi8aQFemflUMcP9K0J2mFg3wIVyeCq26OAwhdKL24zX
// 2: EPo-oV7NhihPXBq2L0y20d9aVfQSVh6IY0lTFyNw5ktQmQvRz1laD9AU8Wi8YN85ecAWJZ-ryRW3RtYU
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

router.get('/cart', function (req, res) {
    res.render('checkout');
})

function CheckQuantity(data, callback) {
    data.forEach(element => {
        if (element.soluong <= 0) {
            res.status(400).json("quantity must be greater than zero")
            callback(true)
        } else {
            callback(false)
        }
    });
}
var temp = new Array();
router.post('/checkout1', (req, res) => {
    OrderDetail(req.body.productID, req.body.size, req.body.soluong, function (data) {
        temp = data
        res.render('checkout2');
    })
})

function OrderDetail(productID, size, soluong, data) {
    var product = [];
    for (let index = 0; index < productID.length; index++) {
        product.push({ 'id': productID[index], 'quantity': soluong[index], 'size': size[index] });
    }
    data(product)
}

router.post('/paycod', (req, res) => {
    if (temp === "undefined") { res.redirect('/checkout1') }
    var order = {
        fullname: req.body.firstname + " " + req.body.lastname,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        username: req.user,
        orderDetail: temp,
        status:"Waiting"
    }

    CheckQuantity(temp, (cb) => {
        if (cb) {
            res.status(400).json("quantity must be greater than zero")
        }
    })
    DB.CreateOrder(order, (cb) => {
        if (cb) {
            res.status(400).json("We can't process your payment right now, so please try again later");
        } else {
            res.redirect('/');
        }
    })
})

router.post('/pay', async (req, res) => {
    DB.GetTotal(temp, (cb) => {
        console.log(temp)
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:8081/success",
                "cancel_url": "http://localhost:8081/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": cb,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": cb
                },
                "description": "the best team ever"
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                console.error("Error JSON:", JSON.stringify(error, null, 2));
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });

    })
});

router.get('/success', (req, res) => {

    if (temp === "undefined") { res.redirect('/checkout1') }
    

    CheckQuantity(temp, (cb) => {
        if (cb) {
            res.status(400).json("Quantity must be greater than zero")
        }
    })
    

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    DB.GetTotal(temp, (cb) => {
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": cb
                }
            }]
        }
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(payment);
                var order = {
                    fullname: payment.payer.payer_info.first_name + " " + payment.payer.payer_info.last_name,
                    address: req.body.address,
                    email: payment.payer.payer_info.email,
                    phone: req.body.phone,
                    username: req.user,
                    orderDetail: temp,
                    status:payment.state
                }
                DB.CreateOrder(order, (cb) => {
                    if (cb) {
                        res.status(400).json("We can't process your payment right now, so please try again later");
                    } else {
                        res.redirect('/')
                    }
                })
            }
        });
    });

    
});

router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;

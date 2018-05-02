var express = require('express');
var router = express.Router();
var DB = require('../common/workwDB');
const paypal = require('paypal-rest-sdk');
var app = express();

/* GET home page. */
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AWZVInM4D-55Fa8GUBPyKxe9OIbIgc6_BOBh6Gi8aQFemflUMcP9K0J2mFg3wIVyeCq26OAwhdKL24zX',
    'client_secret': 'ENnFza6H5z7b2H2tbPF3rqANg_kse9C7lTXtycYJUAYVIaVb5VP1pqeC_AbJAZbIL6K6rFshzLdj1eu0'
});

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
    res.render('checkout2');    
})

function OrderDetail(productID, size, soluong, data) {
    var product =[];
    for (let index = 0; index < productID.length; index++) {
        product.push({'id': productID[index], 'quantity': soluong[index], 'size': size[index]});
    }
    data(product)
}

app.post('/pay', (req, res) => {
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
                  "name": "Red Sox Hat",
                  "sku": "001",
                  "price": "25.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "25.00"
          },
          "description": "Hat for the best team ever"
      }]
  };
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
  });
  
  });
  
  app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "25.00"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
  });
  });
  
  app.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;

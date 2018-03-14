var express = require('express');
var router = express.Router();
var DB = require('../../common/workwDB');

//DB.newConnection();

/* GET home page. */
router.get('/admin', function (req, res) {

  var currentPage = 1,
      pageSize = 4
  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }
  DB.GetProductperPage(pageSize, currentPage, function (err, data, total) {
    if (err) {
      res.status(400).json("produc not found")
    } else {
      res.render("./admin/product/listproduct", { products: data,
          pageSize: pageSize,
          pageCount: total / pageSize,
          currentPage: currentPage });
    }
  })
});

router.get('/admin/createproduct', function (req, res) {
  DB.GetAllCategory(function (cb, data) {
    if (cb) {
      res.status(400).json("Can't get Category");
    } else {
      res.render("./admin/product/createproduct", { listCate: data });
    }
  })
})

router.post('/admin/createproduct/save', function (req, res) {
  var product = {
    tensanpham: req.body.tensanpham,
    gia: req.body.gia,
    gioithieu: req.body.gioithieu,
    loai: req.body.loai
  };
  DB.CreateProductItem(product, function (cb) {
    if (cb) {
      res.status(400).json("Can't create product")
    } else {
      res.redirect("/admin");
    }
  })
})

router.get('/admin/product/edit/:id', function (req, res) {
  var id = req.params.id;
  DB.GetOneProduct(id, function (cb, data) {
    if (cb) {
      res.status(400).json('product not found');
    } else {
      DB.GetAllCategory(function (cb, listCate) {
        if (cb) {
          res.status(400).json("Can't get Category")
        } else {
          res.render("./admin/product/editproduct", { products: data, listCate: listCate })
        }
      })
    }
  })
})

router.post('/admin/editproduct/save', function (req, res) {
  var product = {
    masanpham: req.body.masanpham,
    tensanpham: req.body.tensanpham,
    gia: req.body.gia,
    gioithieu: req.body.gioithieu,
    loai: req.body.loai
  };
  DB.UpdateProductItem(product, function (cb) {
    if (cb) {
      res.status(400).json("Can't update this product")
    } else {
      res.redirect("/admin");
    }
  })
})

router.get('/admin/product/delete/:id', function (req, res) {
  var id = req.params.id;

  DB.GetOneProduct(id, function (cb, data) {
    if (cb) {
      res.status(400).json('product not found');
    } else {
      var product = [];
      data.forEach(element => {
        DB.DeleteProduct(element._id, function (cb) {
          if (cb) {
            res.status(400).json("Can't delete an Item" + element._id);
          } else {
            res.redirect("/admin");
          }
        })
      });
    }
  })
})

function isAuthenticated(req, res, next) {
  if (req.user) {
    DB.checkRole(req.user, function (cb) {
      if (cb) {
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

// AWS.config.update({
//     "accessKeyId":"AKIAJUCBISQQLJMS2CMQ",
//     "secretAccessKey":"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",
//     "region":"us-east-2",
//     endpoint: "http://dynamodb.us-east-2.amazonaws.com"
// });
// var docClient = new AWS.DynamoDB.DocumentClient();
// var params = {
//     TableName : "SanPham"
// };
// docClient.scan(params, function(err, data) {
//     if (err) {
//         console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Query succeeded.");
//         data.Items.forEach(function(item) {
//             sa.push(item);
//         });
//     }
// });



module.exports = router;
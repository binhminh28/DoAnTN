var express = require('express');
var router = express.Router();
var DB = require('../../common/workwDB');
var multer = require('multer')
var upload = multer({ dest: '/tmp/' });


/* GET home page. */
router.get('/admin',isAuthenticated, function (req, res) {

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
          pageCount: Math.ceil(total / pageSize),
          currentPage: currentPage,
          message: req.flash('message')
         });
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

router.post('/admin/createproduct/save',upload.any(), function (req, res) {
  var product = {
    tensanpham: req.body.tensanpham,
    gia: req.body.gia,
    gioithieu: req.body.gioithieu,
    category: req.body.loai,
    hinh:req.files,
    subcategory:req.body.loai2.substr(7),
    sizeS:req.body.S,
    sizeM:req.body.M,
    sizeL:req.body.L,
    sizeXL:req.body.XL
  };
  //console.log(product)
  DB.CreateProductItem(product, function (cb) {
    if (cb) {
      res.status(400).json("Can't create product")
    } else {
      req.flash("message", "You just added 1 product to your list product")
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
    category: req.body.loai,
    subcategory:req.body.loai2.substr(7),
    sizeS:req.body.S,
    sizeM:req.body.M,
    sizeL:req.body.L,
    sizeXL:req.body.XL
  };
  console.log(product)

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

router.get('/detail/:id', function (req, res) {
  var id = req.params.id;
  DB.GetOneProduct(id, function (cb, data) {
      if (cb) {
          res.status(400).json('product not found');
      } else {
          DB.GetProductperPage(3,1,function (err, listCate) {
              if (err) {
                  res.status(400).json("Can't get Category")
              } else {
                  res.render("./user/detail", { products: data, listCate: listCate, hello: req.user })
              }
          })
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


module.exports = router;

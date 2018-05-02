var express = require('express');
var router = express.Router();
var DB = require('../../common/workwDB');


/* GET home page. */
router.get('/category',function (req, res) {
    var currentPage = 1,
        pageSize = 4
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }

    DB.GetProductperPageCategory(pageSize, currentPage, function (err, data, total) {
        if (err) {
            res.status(400).json("produc not found")
        } else {
            res.render("./admin/category/listcategory", { products: data,
                pageSize: pageSize,
                pageCount: Math.ceil(total / pageSize),
                currentPage: currentPage,
                message: req.flash('message')
            });
        }
    })
});

router.get('/admin/createcategory', function (req, res) {

    // DB.GetAllCategory(function (cb, data) {
    //     if (cb) {
    //         res.status(400).json("Can't get category");
    //     } else {
            res.render("./admin/category/createcategory");
    //     }
    // })
})
//nó chạy vô hafmg đ nào z cố vô hàm dưới đâu
router.post('/admin/createcategory/save', function (req, res) {

    var product = {
        maid: req.body.maid,
        ten: req.body.ten,
        subcategory:req.body.subCategory
    };
    DB.CreateCategoryItem(product, function (cb) {
        if (cb) {
            res.status(400).json("Can't create product")
        } else {
            req.flash("message", "You just added 1 product to your list product")
            res.redirect("/category");
        }
    })
})

//chờ tí ok
router.get('/admin/category/edit/:id', function (req, res) {
    var id = req.params.id;
    DB.GetOneCatetory(id, function (cb, data) {
        if (cb) {
            res.status(400).json('product not found');
        } else {
            DB.GetAllCategory(function (cb, listCate) {
                if (cb) {
                    res.status(400).json("Can't get Category")
                } else {
                    res.render("./admin/category/editcategory", { products: data,listCate: listCate })
                }
            })
        }
    })
})


router.post('/admin/editcategory/save', function (req, res) {
    var product = {
        masanpham: req.body.masanpham,
        idloai: req.body.idloai,
        tenloai: req.body.tenloai,
        subCategory:req.body.subCategory,


    };
    console.log(product)

    DB.UpdateCategoryItem(product, function (cb) {
        if (cb) {
            res.status(400).json("Can't update this product")
        } else {
            res.redirect("/category");
        }
    })

})

router.get('/admin/category/delete/:id', function (req, res) {
    var id = req.params.id;

    DB.GetOneCatetory(id, function (cb, data) {
        if (cb) {
            res.status(400).json('product not found');
        } else {
            var product = [];
            data.forEach(element => {
                DB.DeleteCategory(element._id, function (cb) {
                if (cb) {
                    res.status(400).json("Can't delete an Item" + element._id);
                } else {
                    res.redirect("/category");
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

module.exports = router;

var AWS = require("aws-sdk");
AWS.config.loadFromPath('./AWSConfig.json');
var uuid = require('uuid');
var randomstring = require("randomstring");
var docClient;
var dynamodb;

exports.newConnection = function () {
    docClient = new AWS.DynamoDB.DocumentClient();
    dynamodb = new AWS.DynamoDB();
}

exports.login = function (username, pass, callback) {
    var params = {
        TableName: "Users",
        ProjectionExpression: "tenDangNhap, password",
        FilterExpression: "tenDangNhap =:username and password =:pass",
        ExpressionAttributeValues: {
            ":username": username,
            ":pass": pass
        }
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            callback(true)
        } else {
            if (data.Count > 0) callback(false)
            else {
                console.log('Username or Password incorrect');
                callback(true)
            }
        }
    });
}

exports.checkRole = function (username, callback) {
    var params = {
        TableName: "Users",
        ProjectionExpression: "tenDangNhap, loai",
        FilterExpression: "tenDangNhap =:username and loai =:role",
        ExpressionAttributeValues: {
            ":username": username,
            ":role": "Admin"
        }
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            callback(true)
        } else {
            if (data.Count > 0) callback(false)
            else callback(true)
        }
    });
}

function CheckCategoryExist(id, callback){
    var params={
        TableName:"LoaiSanPham",
        ProjectionExpression:"MaLoai, TenLoai",
        FilterExpression:"MaLoai = :ma",
        ExpressionAttributeValues:{
            ":ma":id
        }
    }
    docClient.scan(params, function (err, data) {
        if (err) {
            callback(true)
        } else {
            if (data.Count > 0) callback(false)
            else callback(true)
        }
    });
}

exports.Register = function (id, email, name, gender, callback) {
    // var id = uuid.v4() + randomstring.generate({
    //     length: 128,
    //     charset: 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM_.-'
    // })
    var params = {
        TableName: 'Users',
        Item: {
            "maKhachHang": id,
            "tenKhachHang": name,
            "tenDangNhap": email,
            "email": email,
            "loai": "KhachHang",
            "info": {
                "gioiTinh": gender
            }
        }
    };
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Error JSON:", JSON.stringify(err, null, 2));
        } else {
            callback(false);
        }
    });
}

exports.FindOne = function (username, callback) {
    var params = {
        TableName: "Users",
        ProjectionExpression: "maKhachHang",
        FilterExpression: "maKhachHang =:username",
        ExpressionAttributeValues: {
            ":username": username,
        }
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            if (data.Count > 0) {
                data.Items.forEach(function (item) {
                    callback(item.maKhachHang)
                })
            }
            else callback(false)
        }
    });
}

exports.GetAllProduct = function (callback) {
    var params = {
        TableName: "SanPham",
        ProjectionExpression: "maSanPham, tenSanPham, info",
    }
    docClient.scan(params, function (err, data) {
        if (err) {
            console.log("Error Json: ", JSON.stringify(err, null, 2));
        } else {
            if (data.Count > 0)
                callback(false, data)
            else
                callback(true)
        }
    })
}

exports.GetAllCategory = function(callback){
    var params={
        TableName:"LoaiSanPham",
        ProjectionExpression:"MaLoai, TenLoai"
    };
    docClient.scan(params, function(err, data){
        if(err){
            console.log("Error Json", JSON.stringify(err,null,2));
        }else{
            if(data.Count>0)
                callback(false, data)
            else
                callback(true)
        }
    })
}

exports.GetOneProduct = function (masp, callback) {
    var params = {
        TableName: "SanPham",
        ProjectionExpression: "maSanPham, tenSanPham, info",
        FilterExpression: "maSanPham = :ma",
        ExpressionAttributeValues: {
            ":ma": masp
        }
    }
    docClient.scan(params, function (err, data) {
        if (err) {
            console.log("Error Json: ", JSON.stringify(err, null, 2));
        } else {
            if (data.Count > 0)
                callback(false, data)
            else
                callback(true)
        }
    })
}

exports.UpdateProductItem = function (product, callback) {
    var params = {
        TableName: "SanPham",
        Key: {
            "maSanPham": product.masanpham
        },
        UpdateExpression: `set
                            tenSanPham= :ten,
                            info.gia = :gia, 
                            info.gioithieu = :gioithieu,
                            info.loai = :loai`,
        ExpressionAttributeValues: {
            ":ten":product.tensanpham,
            ":gia": product.gia,
            ":gioithieu": product.gioithieu,
            ":loai":product.loai
        },
        ReturnValues: "UPDATED_NEW"
    };

    console.log("Updating the item...");
    docClient.update(params, function (err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            console.log(product.masanpham)
            callback(true)
        } else {
            callback(false);
        }
    });
}

exports.CreateProductItem = function (product, callback) {
    var id = uuid.v4() + randomstring.generate({
        length: 128,
        charset: 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM_.-'
    })
    CheckCategoryExist(product.loai, function(cb){
        if(cb){
            console.error("Doesn't exist this category")
            callback(false)
        }else{
            var params = {
                TableName: 'SanPham',
                Item: {
                    "maSanPham": id,
                    "tenSanPham": product.tensanpham,
                    "info": {
                        "gia": Number.parseFloat(product.gia),
                        "gioithieu": product.gioithieu,
                        "loai": product.loai
                    }
        
                }
            };
            docClient.put(params, function (err, data) {
                if (err) {
                    console.error("Error JSON:", JSON.stringify(err, null, 2));
                    callback(true)
                } else {
                    callback(false);
                }
            });
        }
    })
}

exports.DeleteProduct = function (ma, callback) {
    var params = {
        TableName: "SanPham",
        Key: {
            "maSanPham": ma
        }
    }
    docClient.delete(params, function (err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            callback(true)
        } else {
            callback(false);
        }
    })
}

 
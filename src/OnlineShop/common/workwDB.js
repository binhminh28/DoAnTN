var uuid = require('uuid');
var randomstring = require("randomstring");
var ObjectId = require('mongodb').ObjectID
var cloudinary = require('cloudinary')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://cluster0-shard-00-00-z89mh.mongodb.net:27017/?ssl=true";
var db

cloudinary.config({ 
    cloud_name: 'droito493', 
    api_key: '567396442693771', 
    api_secret: 'uc4-GwpeMXreP1_dH1CUQKUIKcs' 
  });

MongoClient.connect(url, {
    auth: {
        user: 'binhm63',
        password: 'BlackBerry8310+',
    }
}, (err, client) => {
    if (err) return console.log(err)
    db = client.db('onlineshop')
})

exports.GetProductperPage = function (pagesize, pagenumber, callback) {
    var cursor = db.collection('Product').find().limit(pagesize).skip(pagesize * (pagenumber - 1)).toArray(function (err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            callback(true)
        } else {
            if (data.length > 0) {
                db.collection('Product').count(function(err,total){
                    if(!err){
                        callback(false,data, total)
                    }
                })               
            } else {
                callback(true)
            }
        }
    })
}

exports.login = function (username, pass, callback) {
    var query = {
        usename: username,
        password: pass
    }
    var cursor = db.collection('User').find(query).toArray(function (err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            callback(true)
        } else {
            if (data.length > 0) callback(false)
            else {
                console.log('Username or Password incorrect');
                callback(true)
            }
        }
    })
}

exports.checkRole = function (username, callback) {
    var query = {
        usename: username,
        type: 'admin'
    }
    var cursor = db.collection('User').find(query).toArray(function (err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            callback(true)
        } else {
            if (data.length > 0) callback(false)
            else {
                callback(true)
            }
        }
    })
}

exports.FindOne = function (username, callback) {
    var query = {
        usename: username
    }
    var cursor = db.collection('User').find(query).toArray(function (err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            callback(true)
        } else {
            if (data.length > 0) {
                console.log(data)
                data.forEach(element => {
                    callback(element.usename)
                });
            }
            else {
                console.log("sai")
                callback(false)
            }
        }
    })
}

exports.Register = function (id, email, name, gender, callback) {
    var newUser = {
        usename: id,
        type: "customer",
        gender: gender,
        email: email,
        name: name
    };

    var cursor = db.collection('User').insertOne(newUser, function (err, res) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            callback(true)
        } else {
            callback(false)
        }
    })
}

exports.GetAllCategory = function (callback) {
    var cursor = db.collection('Category').find().toArray(function (err, data) {
        if (err) {
            console.log("Error Json", JSON.stringify(err, null, 2));
        } else {
            if (data.length > 0)
                callback(false, data)
            else
                callback(true)
        }
    })
}


exports.GetAllProduct = function (callback) {
    var cursor = db.collection('Product').find().toArray(function (err, data) {
        if (err) {
            console.log("Error Json", JSON.stringify(err, null, 2));
        } else {
            if (data.length > 0)
                callback(false, data)
            else
                callback(true)
        }
    })
}

exports.CheckProductExist = function(ma, callback){
    db.collection('Product').findOne({_id:ma}, function(err){
        if(err) {
            callback(true)
        }
        else {
            
            callback(false)
        }
    })
}


exports.GetOneProduct = function (masp, callback) {
    //console.log(masp)
    var cursor = db.collection('Product').find(ObjectId(masp)).toArray(function (err, data) {
        if (err) {
            console.log("Error Json: ", JSON.stringify(err, null, 2));
        } else {
            //console.log(data)
            if (data.length > 0) {
                callback(false, data)
            }
            else {
                //console.log("sai")
                callback(true)
            }
        }
    })
}

function CheckVaildObjectId(ma, callback){
    if(ObjectId.isValid(ma)){
        callback(false)
    }else{
        callback(true)
    }
}

exports.UpdateProductItem = function (product, callback) {
    if(product===undefined){
        callback(true)
    }else{
        CheckVaildObjectId(product.masanpham, function(cb){
            if(cb){
                callback(true)
            }else{ 
                var query = {_id : ObjectId(product.masanpham)}
                var newProduct = {
                    $set:{
                        productName: product.tensanpham,
                        price: Number.parseFloat(product.gia),
                        description: product.gioithieu,
                        category: [product.category, product.subcategory],
                        sizeQty:{
                            "S":Number.parseInt(product.sizeS),
                            "M":Number.parseInt(product.sizeM),
                            "L":Number.parseInt(product.sizeL),
                            "XL":Number.parseInt(product.sizeXL),
                        }
                    }
                }
                console.log("Updating the item...");
                db.collection('Product').updateOne(query,newProduct, function(err){
                    if(err){
                        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                        callback(true)
                    }else{
                        callback(false)
                    }
                })
            }
        })
        
    }
   
}

function CheckCategoryExist(id, callback) {
    var query = {
        CateId: id
    }
    var cursor = db.collection('Category').find(query).toArray(function (err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            callback(true)
        } else {
            if (data.length > 0) callback(false)
            else callback(true)
        }
    })
}

exports.CreateProductItem = function (product, callback) {
    // var id = uuid.v4() + randomstring.generate({
    //     length: 128,
    //     charset: 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM_.-'
    // })
    CheckCategoryExist(product.category, async function (cb) {
        if (cb) {
            console.error("Doesn't exist this category")
            callback(true)
        } else {
            var image = [];
            var multiUpload = new Promise(async (resolve, reject)=>{
                for (let index = 0; index < product.hinh.length; index++) {
                    await cloudinary.v2.uploader.upload(product.hinh[index].path, (err, result)=> { 
                        //Save Product and url image to DB
                        if(image.length === product.length){
                            resolve(image) 
                        }else if(result){
                            image.push(result.url)
                            console.log("link Uploaded " + result.url)
                        }else if(err){
                            console.log("Error: "+ err)
                            reject(err)
                        }
                    });
                }
                console.log("done" + image.length);
                var params = {
                    productName: product.tensanpham,
                    price: Number.parseFloat(product.gia),
                    description: product.gioithieu,
                    imgUrl:image,
                    category: [product.category, Number.parseInt(product.subcategory)],
                    sizeQty:{
                        "S":Number.parseInt(product.sizeS),
                        "M":Number.parseInt(product.sizeM),
                        "L":Number.parseInt(product.sizeL),
                        "XL":Number.parseInt(product.sizeXL),
                    }
                };
                //console.log(params)
                var cursor = db.collection('Product').insertOne(params, function (err, data) {
                    if (err) {
                        console.error("Error JSON:", JSON.stringify(err, null, 2));
                        callback(true)
                    } else {
                        console.log("Success")
                        callback(false);
                    }
                })
            })
        }
    })
}

exports.DeleteProduct = function (ma, callback) {
    var query = {
        _id: ma
    }
    var cursor = db.collection('Product').deleteOne(query, function (err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            callback(true)
        } else {
            callback(false);
        }
    })

}


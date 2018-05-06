
// var uuid = require('uuid');
// var randomstring = require("randomstring");
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://cluster0-shard-00-00-z89mh.mongodb.net:27017/?ssl=true";
// var db

// MongoClient.connect(url, {
//     auth: {
//         user: 'binhm63',
//         password: 'BlackBerry8310+',
//     }
// }, (err, client) => {
//     if (err) return console.log(err)
//     db = client.db('onlineshop')

//     var cursor = db.collection('Product').find().toArray(function (err, data) {
//         if (err) {
//             console.log("Error Json", JSON.stringify(err, null, 2));
//         } else {
//             if (data.length > 0)
//                 //callback(false, data)
//                 console.log(data)
//         }
//     })
// })
var data = [{ "qty": 1, "price": 1000 },
            { "qty": 2, "price": 2000 }];

var total = 0;
data.forEach(element => {
    total += element.price * element.qty;
});
console.log("Total: " + total);






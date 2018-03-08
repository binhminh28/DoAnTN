var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");

var sa = [];

AWS.config.update({
    "accessKeyId":"AKIAJUCBISQQLJMS2CMQ",
    "secretAccessKey":"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",
    "region":"us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName : "SanPham"




};
docClient.scan(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            sa.push(item);
            //sc.push(item.Casi);
        });
    }
});




/* GET home page. */

router.get('/', function(req, res, next) {

    //res.header(200, {'Content-Type': 'text/Plain; charset=utf-8'});
    //res._renderHeaders("html");

    res.render("product2",{ s: sa  });
});


module.exports = router;
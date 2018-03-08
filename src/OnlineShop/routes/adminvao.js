var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk")
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/', function (req, res, next) {
    res.render('adminvao');
});
// router.get('/search', function (req,res,next) {
// var sa = [];
// AWS.config.update({
//     "accessKeyId":"AKIAJUCBISQQLJMS2CMQ",
//     "secretAccessKey":"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",
//     "region":"us-east-2",
//     endpoint: "http://dynamodb.us-east-2.amazonaws.com"
// });
//
// var docClient = new AWS.DynamoDB.DocumentClient();
// var params = {
//     TableName : "SanPham",
//     FilterExpression: "(contains(#Name, :yearz))",
//     ExpressionAttributeNames:
//         {
//             "#Name":"name"
//         },
//     ExpressionAttributeValues:{
//         ":yearz":req.query.q
//     }
//
//
//
// };
// docClient.scan(params, function(err, data) {
//     if (err) {
//         console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Query succeeded.");
//         data.Items.forEach(function(item) {
//             sa.push(item);
//             //sc.push(item.Casi);
//         });
//         res.render("adminvaoo2",{ s: sa  });
//     }
// });
//
//
// });


module.exports = router;

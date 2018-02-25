var AWS = require("aws-sdk");
AWS.config.loadFromPath('./AWSConfig.json');
var uuid = require('uuid');
var randomstring = require("randomstring");

var docClient = new AWS.DynamoDB.DocumentClient();
var id = uuid.v4() + randomstring.generate({
    length: 128,
    charset: 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM_.-'
})
var params = {
    TableName: "Users",
    ProjectionExpression: "maKhachHang",
    FilterExpression: "maKhachHang =:username",
    ExpressionAttributeValues: {
        ":username": "996209410536391",
    }
};
docClient.scan(params, function (err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        if (data.Count > 0) console.log(data)
        else console.log(false)
    }
});

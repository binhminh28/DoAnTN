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

exports.Register = function(id, email, name, gender, callback){
    // var id = uuid.v4() + randomstring.generate({
    //     length: 128,
    //     charset: 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM_.-'
    // })
    var params = {
        TableName: 'Users',
        Item: {
            "maKhachHang": id,
            "tenKhachHang": name,
            "tenDangNhap":email,
            "email": email,
            "loai":"KhachHang",
            "info":{
                "gioiTinh":gender
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
                data.Items.forEach(function(item){
                    callback(item.maKhachHang) 
                })
            }
            else callback(false)
        }
    });
}
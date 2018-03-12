var AWS = require("aws-sdk");
AWS.config.loadFromPath('./AWSConfig.json');
var uuid = require('uuid');
var randomstring = require("randomstring");

var docClient = new AWS.DynamoDB.DocumentClient();

countAll(function(count){
    console.log("co tong cong: "+count+" item");
})

getItemPerPage("CongAnh2","5",2,function(data){
    console.log(data);
    // console.log("LastEvaluatedKey: "+data);
    // console.log("last itemid: "+ data.Items[data.Count-1].id)
})


function getItemPerPage(TableName, lastItem ,pageSize, callback){
    var params = {
        TableName: TableName,
        Limit: pageSize,
    }
    if(lastItem != null){
        params.ExclusiveStartKey= {
            "id":lastItem
        }
    }
    console.log(params)
        docClient.scan(params, function (err, data) {
        if (err) {
            console.log("Error Json: ", JSON.stringify(err, null, 2));
        } else {
            callback(data)
        }
    })
}
 function countAll(callback){
    var params = {
        TableName: "CongAnh2"
    }
    docClient.scan(params, function (err, data) {
        if (err) {
            console.log("Error Json: ", JSON.stringify(err, null, 2));
        } else {
            callback(data.Count);
        }
    })
}
var Dynamodb = require('../../models/db_connect.js');
var docClient = Dynamodb.docClient;

module.exports = class GetSpeechMember {
    getAllMember(){
        return new Promise((resolve, reject) => {
            //資料庫取得資料的動作
            const params = {
                TableName: "speech_member",
            };
            docClient.scan(params, (err, data) => {
                // console.log("data: " + data);
                if (!err) {
                    resolve(data.Items);
                } else {
                    // console.log(err);
                    reject("get data error.");
                }
            });
        })
    }
    getOneMember(id){
        return new Promise((resolve, reject) => {
            //資料庫取得資料的動作
            const params = {
                TableName: "speech_member",
                Key: {'id': id}
            };
            docClient.get(params, (err, data) => {
                if(!err) {
                    // console.log("items: " + JSON.stringify(data));
                    resolve(data.Item);
                } else {
                    // console.log("err: " + err);
                    reject("get data error.");
                }
            });
        }) 
    }
}


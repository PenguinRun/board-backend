// var Dynamodb = require('../../models/db_connect.js');
// var docClient = Dynamodb.docClient;
const db = require('../db_connect');

module.exports = class GetSpeechMember {
    getAllMember(){
        return new Promise((resolve, reject) => {
            //資料庫取得資料的動作

            let result = {}
            db.query('SELECT * FROM speech_member', (err, rows) => {
                if (err) {
                    console.log(err)
                    result.status = '取得會員結果失敗'
                    result.err = '伺服器錯誤，請稍後再試'
                    reject(result)
                }
                resolve(rows[0])
            })

            // DynamoDB
            // const params = {
            //     TableName: "speech_member",
            // };
            // docClient.scan(params, (err, data) => {
            //     // console.log("data: " + data);
            //     if (!err) {
            //         resolve(data.Items);
            //     } else {
            //         // console.log(err);
            //         reject("get data error.");
            //     }
            // });
        })
    }
    getOneMember(id){
        return new Promise((resolve, reject) => {
            //資料庫取得資料的動作

            let result = {}
            db.query('SELECT * FROM speech_member where facebook_id = ?', id, (err, rows) => {
                if (err) {
                    console.log(err)
                    result.status = '取得單一會員結果失敗'
                    result.err = '伺服器錯誤，請稍後再試'
                    reject(result)
                }
                resolve(rows[0])
            })

            // const params = {
            //     TableName: "speech_member",
            //     Key: {'id': id}
            // };
            // docClient.get(params, (err, data) => {
            //     if(!err) {
            //         // console.log("items: " + JSON.stringify(data));
            //         resolve(data.Item);
            //     } else {
            //         // console.log("err: " + err);
            //         reject("get data error.");
            //     }
            // });
        }) 
    }
}


// var Dynamodb = require('../../models/db_connect.js');
// var docClient = Dynamodb.docClient;
const db = require('../db_connect');

module.exports = getToken = (id) => {
    return new Promise((resolve, reject) => {
        //資料庫取得資料的動作
        let result = {}
        db.query('SELECT token FROM speech_member where id = ?', id, (err, rows) => {
            if (err) {
                console.log(err)
                result.status = '取得token失敗'
                result.err = '伺服器錯誤，請稍後再試'
                reject(result)
            }
            resolve(rows)
        })
        //DynamoDB
        // const params = {
        //     TableName: "speech_member",
        //     Key: {'id': id}
        // };
        // docClient.get(params, (err, data) => {
        //     if(!err) {
        //         // console.log("items: " + JSON.stringify(data));
        //         resolve(data.Item.token);
        //     } else {
        //         // console.log("err: " + err);
        //         reject("get data error.");
        //     }
        // });
    }) 
}
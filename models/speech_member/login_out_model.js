// var Dynamodb = require('../../models/db_connect.js');
// var docClient = Dynamodb.docClient;
const db = require('../db_connect');

module.exports = loginOutToken = (id) =>{
    return new Promise((resolve, reject) => {
        //資料庫取得資料的動作

        const updateData = {
          token: null
        }

        let result = {}
        db.query('UPDATE speech_member SET ? WHERE facebook_id = ?', [updateData, id], (err, rows) => {
            if (err) {
                console.log(err)
                result.status = '登出失敗'
                result.err = '伺服器錯誤，請稍後再試'
                reject(result)
            }
            result.status = '登出成功'
            resolve(result)
        })

        // DynamoDB
        // const params = {
        //     TableName: "speech_member",
        //     Key: { 'id': id },
        //     ExpressionAttributeNames:{
        //         '#t': 'token'
        //     },
        //     UpdateExpression: "SET #t = :token",
        //     ExpressionAttributeValues: {
        //         ":token": "null"
        //     }
        // };
        // docClient.update(params, (err, data) => {
        //     if (!err) {
        //         // console.log("items: " + JSON.stringify(data));
        //         resolve("delete token successful.");
        //     } else {
        //         // console.log("err: " + err);
        //         reject("get data error.");
        //     }
        // });
    })
}
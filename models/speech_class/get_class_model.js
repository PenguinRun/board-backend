// var Dynamodb = require('../../models/db_connect.js');
// var docClient = Dynamodb.docClient;
const db = require('../db_connect');

module.exports = getSpeechClass = () => {
    return new Promise((resolve, reject) => {
        //資料庫取得資料的動作

        let result = {}
        db.query('SELECT * FROM speech_class', (err, rows) => {
            if (err) {
                console.log(err)
                result.status = '取得活動分類結果失敗'
                result.err = '伺服器錯誤，請稍後再試'
                reject(result)
            }
            resolve(rows)
        })
        
        // DynamoDB
        // const params = {
        //     TableName: "speech_class",
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


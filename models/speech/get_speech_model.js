// var Dynamodb = require('../../models/db_connect.js');
// var docClient = Dynamodb.docClient;
const db = require('../db_connect');

module.exports = getSpeech = () => {
    return new Promise((resolve, reject) => {
        let result = {}
        db.query('SELECT * FROM speech', (err, rows) => {
            if (err) {
                console.log(err)
                result.status = '取得活動結果失敗'
                result.err = '伺服器錯誤，請稍後再試'
                reject(result)
                return
            }
            resolve(rows)
        })

        // DynamoDB
        // //資料庫取得資料的動作
        // const params = {
        //     TableName: "speech",
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


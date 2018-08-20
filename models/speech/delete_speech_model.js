// var Dynamodb = require('../../models/db_connect.js');
// var docClient = Dynamodb.docClient;
const db = require('../db_connect');

module.exports = deleteSpeech = (deleteData) => {
    return new Promise((resolve, reject) => {
        //資料庫刪除資料的動作
        console.log('deleteData id: ', deleteData.facebook_id)
        console.log('deleteData created: ', deleteData.create_date)
        let result = {}
        db.query('DELETE FROM speech WHERE facebook_id = ? and create_date = ?', [deleteData.facebook_id, deleteData.create_date], (err, rows) => {
            if (err) {
                console.log(err)
                result.status = '刪除活動結果失敗'
                result.err = '伺服器錯誤，請稍後再試'
                reject(result)
                return
            }
            result.status = '刪除活動結果成功'
            resolve(result)
        })

        // DynamoDB
        // const deleteParams = {
        //     TableName: "speech",
        //     Key: {
        //         "create_date": deleteData.create_date,
        //     }
        // };
        // docClient.delete(deleteParams, (err, data) => {
        //     if (!err) {
        //         resolve("delete sucessful");
        //     } else {
        //         // console.log(err);
        //         reject("delete error");
        //     }
        // });
    })
}


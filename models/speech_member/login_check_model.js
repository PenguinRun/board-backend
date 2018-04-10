var Dynamodb = require('../../models/db_connect.js');
var docClient = Dynamodb.docClient;
const getAllSpeechDataAction = require('../../models/speech/get_speech_model')

module.exports = loginCheck = (loginData) => {
  return new Promise(async (resolve, reject) => {
    // console.log("loginData: " + JSON.stringify(loginData));

    //搜尋會員id
    // const searchParams = {
    //     TableName: "speech_member",
    //     Key: {
    //         "id": loginData.id
    //     }
    //   }

    // 取得全部的資料，且依照FB ID來撈出相對應的create_date
    const getAllData = await getAllSpeechDataAction()

    let createDates = []

    getAllData.map((element) => {
      if (element.id === loginData.id) {
        createDates.push(element.create_date)
      }
    })

    // createDates.map((element) => console.log(element))

    createDates.map( async (element) => {
      const updateParams = {
        TableName: "speech",
        Key: {
          "create_date": element
        },
        ExpressionAttributeNames: {
          "#s": "speaker_img",
        },
        UpdateExpression: "SET #s = :newImg",
        ExpressionAttributeValues: {
          ":newImg": loginData.photos,
        }
      }

      await docClient.update(updateParams, function (err, data) {
        if (err) {
          console.log(err)
        }
        // console.log(data)
      })
    })

    const inputParams = {
      TableName: "speech_member",
      Item: {
        "id": loginData.id,
        "email": loginData.email,
        "displayName": loginData.displayName,
        "photos": loginData.photos,
        "gender": loginData.gender,
        "token": loginData.token
      }
    };

    await docClient.put(inputParams, async function (err, data) {
      if (err) {
        //   console.log(err);
        reject("set member error.");
        return;
      } else {
        resolve("set member successful.");
      }
    })

    // //查詢是否有這位會員
    // docClient.get(searchParams, async function(err, result) {
    //   if (err) {
    //   //   console.log(err);
    //     reject("search member error.");
    //   } else {
    //     // console.log("result.Item" + result.Item);
    //   // 如果資料庫沒有該會員資料則進行新增動作
    //     if (result.Item === 'undefined' || result.Item === undefined || result.Item === "null") {
    //       docClient.put(inputParams, async function(err, data) {
    //           if (err) {
    //           //   console.log(err);
    //             reject("create member error.");
    //             return;
    //           } else {
    //             resolve("create member successful.");
    //           }
    //         })
    //     } else {
    //       // console.log("success: " + result.Item);
    //       resolve(result.Item);
    //     }
    //   }
    // });
  })
};
// var Dynamodb = require('../../models/db_connect.js');
// var docClient = Dynamodb.docClient;
// const getAllSpeechDataAction = require('../../models/speech/get_speech_model')
const db = require('../db_connect');

module.exports = loginCheck = (loginData) => {
  console.log('=====login data: ', loginData)
  return new Promise(async (resolve, reject) => {
    // console.log("loginData: " + JSON.stringify(loginData));

    // 取得全部的資料，且依照FB ID來撈出相對應的create_date

    const checkRegisterResult = await checkRegister(loginData.facebook_id)
    console.log('checkRegisterResult: ', checkRegisterResult)

    if (checkRegisterResult !== false) {
      const updateSpeechData = {
        speaker_img: loginData.photos || checkRegisterResult,
        speaker: loginData.displayName
      }
      console.log('==updateSpeechData: ', updateSpeechData)
      // 更新speech table中，所有登入講者的大頭貼
      // await updateSpeechTable(updateSpeechData, loginData.facebook_id)

      let updateSpeechMemberData = {
        photos: loginData.photos || checkRegisterResult,
        displayName: loginData.displayName,
        token: loginData.token,
        email: loginData.email
      }

      console.log('run older member')
      console.log('==updateSpeechMemberData: ', updateSpeechMemberData)
      // 更改speech_member table中的資料
      // await updateSpeechMemberTable(updateSpeechMemberData, loginData.facebook_id)
      resolve('舊會員登入成功')
    } else if (checkRegisterResult === false) {

      console.log('run new member')

      await registerNewMember(loginData)
      resolve('新會員登入成功')
    }

    // DynamoDB
    // const inputParams = {
    //   TableName: "speech_member",
    //   Item: {
    //     "id": loginData.id,
    //     "email": loginData.email,
    //     "displayName": loginData.displayName,
    //     "photos": loginData.photos,
    //     "gender": loginData.gender,
    //     "token": loginData.token
    //   }
    // };

    // await docClient.put(inputParams, async function (err, data) {
    //   if (err) {
    //     //   console.log(err);
    //     reject("set member error.");
    //     return;
    //   } else {
    //     resolve("set member successful.");
    //   }
    // })


    // const getAllData = await getAllSpeechDataAction()

    // let createDates = []

    // getAllData.map((element) => {
    //   if (element.id === loginData.id) {
    //     createDates.push(element.create_date)
    //   }
    // })

    // // createDates.map((element) => console.log(element))

    // createDates.map(async (element) => {
    //   const updateParams = {
    //     TableName: "speech",
    //     Key: {
    //       "create_date": element
    //     },
    //     ExpressionAttributeNames: {
    //       "#s": "speaker_img",
    //     },
    //     UpdateExpression: "SET #s = :newImg",
    //     ExpressionAttributeValues: {
    //       ":newImg": loginData.photos,
    //     }
    //   }

    //   await docClient.update(updateParams, function (err, data) {
    //     if (err) {
    //       console.log(err)
    //     }
    //     // console.log(data)
    //   })
    // })

    // const inputParams = {
    //   TableName: "speech_member",
    //   Item: {
    //     "id": loginData.id,
    //     "email": loginData.email,
    //     "displayName": loginData.displayName,
    //     "photos": loginData.photos,
    //     "gender": loginData.gender,
    //     "token": loginData.token
    //   }
    // };

    // await docClient.put(inputParams, async function (err, data) {
    //   if (err) {
    //     //   console.log(err);
    //     reject("set member error.");
    //     return;
    //   } else {
    //     resolve("set member successful.");
    //   }
    // })
  })
};

function checkRegister(id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT facebook_id, photos FROM speech_member WHERE facebook_id = ?', id, function (err, rows) {
      // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
      if (err) {
        console.log(err)
        reject('伺服器錯誤，請稍後再試！')
        return
      }
      if (rows.length >= 1) {
        resolve(rows[0].photos)
      } else {
        resolve(false)
      }
    })
  })
}

function updateSpeechTable (updateSpeechData, id) {
  return new Promise((resolve, reject)=> {
    db.query('UPDATE speech SET ? WHERE facebook_id = ?', [updateSpeechData, id], (err, rows) => {
      if (err) {
        console.log(err)
        reject('伺服器錯誤，請稍後再試！')
        return
      }
      resolve('更改speechTable成功')
    })
  })
}

function updateSpeechMemberTable(updateSpeechMemberData, id) {
  return new Promise((resolve, reject) => {
    db.query('UPDATE speech_member SET ? WHERE facebook_id =?', [updateSpeechMemberData, id], (err, rows) => {
      if (err) {
        console.log(err)
        reject('伺服器錯誤，請稍後再試！')
        return
      }
      resolve('更改speechMemberTable成功')
    })
  })
}

function registerNewMember(loginData) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO speech_member SET ?', loginData, (err, rows) => {
      if (err) {
        console.log(err)
        reject('伺服器錯誤，請稍後再試！')
        return
      }
      resolve('新增新會員成功')
    })
  })
}
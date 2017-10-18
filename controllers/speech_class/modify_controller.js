const config = require('../../config/config');

const createSpeechClass = require('../../models/speech_class/create_class_model');
const updateSpeechClass = require('../../models/speech_class/update_class_model');
const deleteSpeechClass = require('../../models/speech_class/delete_class_model');

//another Method.(just like POST, PUT and DELETE)
module.exports = class SpeechClassModifyMethod {
    //建立speech class table資料
    createSpeechClassData(req, res) {
        const insertData = {
            "name": req.body.name,
            "img_url": req.body.img_url,
            "create_date": onTime(),
            "update_date": null
        }
        createSpeechClass(insertData).then((result) => {
            res.json({
                result: result
            })
        }, (err) => {
            res.json({
                err: err
            })
        } )
    }
    //修改speech class table資料
    updateSpeechClassData(req, res) {
        const updateData = {
            "name": req.body.name,
            "img_url": req.body.img_url,
            "create_date": req.body.create_date,
            "update_date": onTime()
        }
        updateSpeechClass(updateData).then((result) => {
            res.json({
                result: result
            })
        }, (err) => {
            err: err
        })
    }
    //刪除speech class table資料
    deleteSpeechClassData(req, res) {
        const deleteData = {
            "create_date": req.body.create_date,
        }
        deleteSpeechClass(deleteData).then((result) => {
            res.json({
                result: result
            })
        }, (err) => {
            res.json({
                err: err
            })
        })
    }
}
//取得現在時間，並將格式轉成YYYY-MM-DD HH:MM:SS
const onTime = () => {
    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();

    return [date.getFullYear(), "-" +
        (mm > 9 ? '' : '0') + mm, "-" +
        (dd > 9 ? '' : '0') + dd, " " +
        (hh > 9 ? '' : '0') + hh, ":" +
        (mi > 9 ? '' : '0') + mi, ":" +
        (ss > 9 ? '' : '0') + ss
    ].join('');
}
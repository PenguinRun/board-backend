const config = require('../../config/config');
const moment = require('moment-timezone')

const createSpeech = require('../../models/speech/create_speech_model');
const updateSpeech = require('../../models/speech/update_speech_model');
const deleteSpeech = require('../../models/speech/delete_speech_model');

const checkToken = require('../../service/verify');
const CheckSomething = require('../../service/check');

//another Method.(just like POST, PUT and DELETE)
module.exports = class SpeechModifyMethod {
    //建立speech table資料
    createSpeechData(req, res) {
        const token = req.headers["x-access-token"];

        const checkSomething = new CheckSomething();

        if (checkSomething.checkNull(token) === false) {
            res.json({
                err: "please enter the token."
            })
        }
        //認證token
        checkToken(token).then((tokenResult) => {
            //若失敗
            if (tokenResult === false) {
                res.redirect(config.production.URL + '/goodideabillboard/backstage/#/');
                // res.redirect(config.development.testURL + '/#/');
            } else {
                //若成功
                var checkLink = req.body.link;
                if (checkLink === "") {
                    checkLink = null
                }
                const insertData = {
                    facebook_id: req.query.id,
                    speaker: req.body.speaker,
                    speaker_img: req.body.speaker_img,
                    title: req.body.title,
                    message: req.body.message,
                    speech_date: req.body.speech_date,
                    link: req.body.link,
                    class: req.body.class,
                    class_img: req.body.class_img,
                    create_date: onTime(),
                    // "update_date": null,
                }
                console.log('ontime: ', onTime())
                createSpeech(insertData).then((result) => {
                    res.json({
                        result: result
                    })
                }, (err) => {
                    console.log(err);
                    res.json({
                        err: err
                    })
                })
            }
        }, (err) => {
            res.json({
                err: err
            })
        })
    }
    //修改speech table資料
    updateSpeechData(req, res) {

        const token = req.headers['x-access-token'];

        const checkSomething = new CheckSomething();

        if (checkSomething.checkNull(token) === false) {
            res.redirect(config.production.URL + '/goodideabillboard/backstage/#/');
            // res.redirect(config.development.testURL + '/#/');
        }
        //認證token
        checkToken(token).then((tokenResult) => {
            //若失敗
            if (tokenResult === false) {
                res.redirect(config.production.URL + '/goodideabillboard/backstage/#/');
                // res.redirect(config.development.testURL + '/#/');
            } else {
                //若成功
                var checkLink = req.body.link;
                if (checkLink === "") {
                    checkLink = null
                }

                let create_date = moment.tz(req.body.create_date, 'Asia/Taipei').format()
                create_date = create_date.replace(/T/g, " ");
                create_date = create_date.substring(0, create_date.indexOf("+"))
                // 2018-05-07 05:03:04
                const updateData = {
                    facebook_id: req.query.id,
                    speaker: req.body.speaker,
                    speaker_img: req.body.speaker_img,
                    title: req.body.title,
                    message: req.body.message,
                    speech_date: req.body.speech_date,
                    link: checkLink,
                    class: req.body.class,
                    class_img: req.body.class_img,
                    create_date
                    // update_date: onTime()
                }

                updateSpeech(updateData).then((result) => {
                    res.json({
                        result: result
                    })
                }, (err) => {
                    console.log(err)
                    res.json({
                        err: err
                    })
                })
            }
        }, (err) => {
            res.json({
                err: err
            })
        })
    }


    //刪除speech table資料
    deleteSpeechData(req, res) {
        const token = req.headers["x-access-token"];

        const checkSomething = new CheckSomething();

        if (checkSomething.checkNull(token) === false) {
            res.redirect(config.production.URL + '/goodideabillbo/ard/backstage/#/');
            // res.redirect(config.development.testURL + '/#/');
        }
        // 認證token
        checkToken(token).then((tokenResult) => {
            //若失敗
            if (tokenResult === false) {
                res.redirect(config.production.URL + '/goodideabillboard/backstage/#/');
                // res.redirect(config.development.testURL + '/#/');
            } else {

                let create_date = moment.tz(req.body.create_date, 'Asia/Taipei').format()
                create_date = create_date.replace(/T/g, " ");
                create_date = create_date.substring(0, create_date.indexOf("+"))

                //若成功
                const deleteData = {
                    facebook_id: req.query.id,
                    create_date
                }
                deleteSpeech(deleteData).then((result) => {
                    res.json({
                        result: result
                    })
                }, (err) => {
                    console.log(err)
                    res.json({
                        err: err
                    })
                })
            }
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
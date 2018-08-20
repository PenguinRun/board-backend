const config = require('../../config/config');

const getSpeech = require('../../models/speech/get_speech_model');
const checkToken = require('../../service/verify');

const CheckSomething = require('../../service/check');

//GET Method
module.exports = class SpeechGetMethod {
    //讀取speech table資料
    getSpeechData(req, res, next) {
        //登入判斷
        const token = req.headers['x-access-token'];
        conosle.log('=====getSpeechData token : ', token)
        //確定token是否輸入
        const checkSomething = new CheckSomething();
        if (checkSomething.checkNull(token) === false) {
            res.redirect(config.production.URL + '/goodideabillboard/backstage/#/');
            // res.redirect(config.development.testURL + '/#/');
            return;
        }

        //認證token
        checkToken(token).then((tokenResult) => {
            if (tokenResult === false) {
                res.redirect(config.production.URL + '/goodideabillboard/backstage/#/');
                // res.redirect(config.development.testURL + '/#/');
                return;
            } else {
                getSpeech().then((result) => {
                    console.log('mutiple result = : ', result)
                    result.map(element => {
                        delete element.id
                        element.id = element.facebook_id
                    })
                    res.json({
                        result: result
                    })
                }, (err) => {
                    res.json({
                        err: err
                    })
                })
            }
        })
    }
    async getSpeechDataForFrontEnd(req, res, next) {
        const result = await getSpeech()
        // 將create_date, update_date及使用者的FB id隱蔽
        result.map(element => {
            delete element.create_date
            delete element.update_date
            delete element.id
        })
        res.json({
            result
        })
    }
}
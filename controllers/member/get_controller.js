const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const MemberData = require('../../models/speech_member/get_member_model');
const checkToken = require('../../service/verify');

const CheckSomething = require('../../service/check.js');

module.exports = class GetMember {
    //取得全部會員資料
    getAllMemberData(req, res, next) {
        //登入判斷
        const token = req.headers['x-access-token'];
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
                let memberData = new MemberData();
                memberData.getAllMember().then((result) => {
                    res.json({
                        result: result
                    })
                })
            }
        }, (err) => {
            res.json({
                err: err
            })
        })
    }
    //取得單一會員資料
    getOneMemberData(req, res, next) {
        //登入判斷
        const token = req.headers['x-access-token'];
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
                let decode = jwt.decode(token, { complete: true });
                let id = decode.payload.data;
                let memberData = new MemberData();
                // console.log("id: " + id);
                memberData.getOneMember(id).then((result) => {
                    res.json({
                        result: result
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

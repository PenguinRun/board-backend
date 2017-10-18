const loginCheck = require('../../models/speech_member/login_check_model');
const getToken = require('../../models/speech_member/get_token_model');
const loginOut = require('../../models/speech_member/login_out_model');

const jwt = require('jsonwebtoken');

const config = require('../../config/config');

module.exports = class ModifyMember {
    //登入
    redirectMemberLogin(req, res, next) {
        //若無oatuh session，則只取token。
        if (req.session.passport === undefined) {
            const id = req.query.id;
            
            getToken(id).then((token) => {
                // console.log("token: " + token);
                res.header('x-access-token', token);
                res.end();    
            })

        } else {
            //若有oauth session，則進行自動註冊確認。
            const id = req.session.passport.user.id;
            const email = req.session.passport.user.email;
            const displayName = req.session.passport.user.name;
            const photos = req.session.passport.user.photos;
            const gender = req.session.passport.user.gender;
            const accessToken = req.session.passport.user.accessToken;

            //生成token
            const token = jwt.sign({
                algorithm: 'HS256',
                exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 hour 過期 
                data: id
            }, config.development.secret);

            const loginData = {
                id: id,
                email: email,
                displayName: displayName,
                photos: photos,
                gender: gender,
                token: token,
            }

            loginCheck(loginData).then((result) => {
                // res.header('x-access-token', token);
                res.redirect(config.production.URL + '/#/home/?id=' + id);
                // res.redirect(config.development.testURL + '/#/home/?id=' + id);
            });
        }
    }
        //登出動作
        loginOutAction(req, res, next) {
            const id = req.query.id;;
            loginOut(id).then((result) => {
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
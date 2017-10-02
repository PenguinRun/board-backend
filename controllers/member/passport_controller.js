var passport = require('../../config/passport');

module.exports = class Passport {
    //speech_member部份
    //進行facebook使用權限確認
    authenticate(req, res, next) {
        return passport.authenticate('facebook', {
            authType: 'rerequest',
            scope: ['email']
        })
    }
    //進行認證確認
    checkLogin(req, res, next) {
        return passport.authenticate('facebook', {
            //   successRedirect: '/#/speech/home', //認證成功的導入
            // successRedirect: 'http://localhost:8000/#/home',
            successRedirect: 'http://localhost:8007/api/speechmember/login/redirect',
            failureRedirect: '/', //認證失敗的導入
        })
    }
}

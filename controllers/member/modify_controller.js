const loginCheck = require('../../models/speech_member/login_check_model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = class ModifyMember {
    //登入
    redirectMemberLogin(req, res, next) {
        if (req.session.passport === undefined) {
            const id = req.query.id;
            // tokenSetting
            // console.log("id: " + id);
            const token = jwt.sign({
                algorithm: 'HS256',
                exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 hour 過期 
                data: id
            }, config.development.secret);

            // const decode = jwt.decode(token, {complete: true});

            // console.log("decode: " + JSON.stringify(decode));
            res.header('x-access-token', token);
            res.end();
        } else {

            const id = req.session.passport.user.id;
            const email = req.session.passport.user.email;
            const displayName = req.session.passport.user.name;
            const photos = req.session.passport.user.photos;
            const gender = req.session.passport.user.gender;
            // const accessToken = req.session.passport.user.accessToke;

            const loginData = {
                id: id,
                email: email,
                displayName: displayName,
                photos: photos,
                gender: gender
            }

            // tokenSetting
            // console.log("id: " + id);
            const token = jwt.sign({
                algorithm: 'HS256',
                exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 hour 過期 
                data: id
            }, config.development.secret);

            // const decode = jwt.decode(token, {complete: true});

            // console.log("decode: " + JSON.stringify(decode));

            loginCheck(loginData).then((result) => {
                res.header('x-access-token', token);                
                res.redirect('http://localhost:8000/#/home/?id=' + id);
            });
        }
    }
}
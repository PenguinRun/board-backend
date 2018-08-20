const loginCheck = require('../../models/speech_member/login_check_model');
const getToken = require('../../models/speech_member/get_token_model');
const loginOut = require('../../models/speech_member/login_out_model');

const request = require('request');

const jwt = require('jsonwebtoken');

const config = require('../../config/config');
module.exports = class ModifyMember {
    //登入
    async redirectMemberLogin(req, res, next) {
        const userId = req.query.id;
        //若無oatuh session，則只取token。
        if (userId !== undefined) {
            console.log('===run get token')
            getToken(userId).then((token) => {
                res.header('x-access-token', token);
                res.end();
            })
        } else {
            //若有oauth session，則進行自動註冊確認。
            const id = req.session.passport.user.id;
            const email = req.session.passport.user.email;
            const displayName = req.session.passport.user.name;
            const photos = req.session.passport.user.photos;
            // const gender = req.session.passport.user.gender;
            const accessToken = req.session.passport.user.accessToken;

            // console.log("accessToken: " + accessToken);
            
            // 提取解析度更大的使用者大頭照
            const getFBPictureURL = (userID) => {
                return new Promise((resolve, reject) => {
                    request.get({
                        url: 'https://graph.facebook.com/' + userID + '/?fields=picture.width(886).height(886)&access_token=' + accessToken,
                    }, function (err, res, body) {
                        const responseObject = JSON.parse(body);
                        // console.log(responseObject.picture.data.url);
                        resolve(responseObject.picture.data.url);
                    })
                })
            }
            const fbPictureURL = await getFBPictureURL(id)
            const getImgurURL = (fbPictureURL) => {
                return new Promise((resolve, reject) => {
                    request.post({
                        url: 'https://api.imgur.com/3/image',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Client-ID ' + config.development.imgur_client_id
                        },
                        form: {
                            'image': fbPictureURL
                        }
                    }, function (err, res, body) {
                        // console.log(body)
                        const imgurObject = JSON.parse(body)
                        resolve(imgurObject.data.link)
                    })
                })
            } 

            //生成token
            const token = jwt.sign({
                algorithm: 'HS256',
                exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 hour 過期 
                data: id
            }, config.development.secret);

            const loginData = {
                facebook_id: id,
                email: email,
                displayName: displayName,
                photos: await getImgurURL(fbPictureURL),
                // gender: gender,
                token: token,
                create_date: onTime()
            }
            // console.log(loginData);
            loginCheck(loginData).then((result) => {
                res.redirect(config.production.URL + '/goodideabillboard/backstage/#/home/?id=' + id);
                // res.redirect('http://localhost:8000/#/home/?id=' + id);
            }, (err) => {
                console.log(err)
            });
        }
    }
    //登出動作
    loginOutAction(req, res, next) {
        const id = req.query.id;
        loginOut(id).then((result) => {
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
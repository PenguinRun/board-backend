// var memberData = require('../../models/member/login_data_model');

module.exports = class GetMember {
    //登入動作
    getTodoListLogin(req, res, next) {

        // if (req.session.passport === undefined) {
        //     res.redirect('/todolist');
        // } else {


            //預設使用者權限皆為0，且todolist輸入筆數為50筆
            var memberInfo = {
                id: id,
                email: email,
                photos: photos,
                gender: gender,
                displayName: displayName,
                accessToken: accessToken
            }
            console.log(memberInfo);
            res.json({
                result: memberInfo
            })
            // console.log(memberInfo);
            //將資料寫入資料庫並寄信告知
    //         memberData(memberInfo).then(
    //             function (result) {
    //                 res.json({
    //                     result: result,
    //                 }
    //                 )
    //             }
    //     }
    //   ).catch(function (err) {
    //         // console.log(err);
    //         let error = {
    //             status: '500',
    //             stack: ""
    //         }
    //         res.render('error', {
    //             message: err,
    //             error: error
    //         })
    //     })
    }
}

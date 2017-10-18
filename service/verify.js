const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function tokenVerify(token){
    let tokenResult = "";
    const time = Math.floor(Date.now() / 1000);
    return new Promise((resolve, reject) => {
        if (token) {
            jwt.verify(token, config.development.secret, (err, decoded) => {
                // token是否正確
                if (err) {
                    tokenResult = false;
                    resolve(tokenResult);
                    // token若過期
                } else if (decoded.exp <= time) {
                    tokenResult = false;
                    resolve(tokenResult);
                    // token正確
                } else {
                    tokenResult = decoded.data;
                    resolve(tokenResult);
                }
            })
        }
    });
}
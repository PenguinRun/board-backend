require('dotenv').config()

module.exports = {
  development: {
    fb:{
      number: process.env.NUMBER,
      key: process.env.KEY
    },
    aws:{
      id: process.env.KEYID,
      sk: process.env.SKEY,
      server: process.env.REGION
    },
    secret: process.env.SECRETKEY,
  },
  production: {

  }
}

require('dotenv').config()

module.exports = {
  development: {
    mysql: {
      host: process.env.HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      port:process.env.PORT
    },
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
    secret_key: process.env.SECRET_KEY,
    testURL: process.env.testURL,
    imgur_client_id: process.env.IMGUR_CLIENT_ID 
  },
  production: {
    URL: process.env.URL
  }
}

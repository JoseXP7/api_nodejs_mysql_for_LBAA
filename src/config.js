require('dotenv').config()

module.exports = {
  app: {
    port: process.env.PORT || 4000,
  },
  jwt: {
    secret: process.env.JWT_SECRET, //usar .env
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  },
}

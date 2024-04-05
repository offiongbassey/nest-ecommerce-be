require('dotenv').config();

const { DB_USER, DB_PASS, DB_NAME, PROD_DB_USER, PROD_DB_PASS, PROD_DB_NAME, PROD_DB_PORT, PROD_DB_HOST  } = process.env;

module.exports = {
  "development": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": PROD_DB_USER,
    "password": PROD_DB_PASS,
    "database": PROD_DB_NAME,
    "port": PROD_DB_PORT,
    "host": PROD_DB_HOST,
    "dialect": "postgres"
  }
}

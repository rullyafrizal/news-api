// Dependencies
const path = require('path');

// This will fix the expected env values
const env = require('./env');

// get the path of the .env
const dotEnvPath = path.resolve('.env');

// load up the env
require('dotenv').config({ path: dotEnvPath });

module.exports = {
  [env(process.env.NODE_ENV)]: {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    database: process.env.REDIS_DATABASE,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }
}

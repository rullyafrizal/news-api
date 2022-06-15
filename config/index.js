require('dotenv').config();

// dependencies
const fs = require('fs');
const path = require('path');

// This will fix the expected env values
const env = require('./env');

const loadDatabaseConfig = () => {
  // check if the database config exists
  if (fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database')[ENV];
  }

  // throw an error
  throw new Error('Database configuration is required.');
};

const loadRedisConfig = () => {
  // check if the database config exists
  if (fs.existsSync(path.join(__dirname, './redis.js'))) {
    return require('./redis')[ENV];
  }

  // throw an error
  throw new Error('Redis configuration is required.');
}

const ENV = env(process.env.NODE_ENV || 'development');

// load up the database configuration
const dbConfig = loadDatabaseConfig();
const redisConfig = loadRedisConfig();

// setup the config
const config = {
  env: ENV,
  db: dbConfig,
  redis: redisConfig,
  debug: process.env.APP_DEBUG === 'true' ? true : false,
  port: process.env.APP_PORT,
};

module.exports = config;

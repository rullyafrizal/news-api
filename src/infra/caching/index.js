const { createRedisClient } = require('./redis');

module.exports = {
  redisClient: createRedisClient(),
  cacheTTL: 60 * 10,
};

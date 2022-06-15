const { redisClient, cacheTTL } = require('../../../infra/caching/index');

const setCache = async (key, value, ttl = cacheTTL) => {
  if (ttl) {
    return (await redisClient).setEx(key, ttl, value);
  }

  return (await redisClient).set(key, value)
}

const deleteCache = async (key) => {
  return (await redisClient).del(key);
}

const getCache = async (key) => {
  const prom = (await redisClient).get(key);

  return await prom
}

const scanAndDeleteCache = async(pattern) => {
  let cursor = '0';

  const prom = (await redisClient).scan(cursor, { MATCH: pattern, COUNT: 1000 });
  const reply = await prom;

  for (key of reply.keys) {
    cursor = reply.cursor;

    (await redisClient).del(key);
  }
}

module.exports = {
  setCache,
  deleteCache,
  getCache,
  scanAndDeleteCache
}

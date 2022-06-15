const { createClient } = require('redis');
// Config
const config = require('./../../../config');

const createRedisClient = async () => {
  // Check if we have config
  if (config && !config.redis) {
    throw new Error('Database configuration not found.');
  }

  const { host, port, username, password } = config.redis;

  const client = createClient({
    url: `redis://${username}:${password}@${host}:${port}`,
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  return client;
}

module.exports = {
  createRedisClient,
}

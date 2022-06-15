const Status = require('http-status');
const { setCache, deleteCache, getCache } = require('../utils/redis');
const BaseController = require('../controllers/BaseController');

const preInterceptorRedisMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.needCaching = false

  if (id) {
    const val = await getCache(id)

    if (val) {
      return (new BaseController())
        .successResponse(res, 'get:news:success', JSON.parse(val), Status.OK);
    }

    req.needCaching = true;
    return next();
  }

  let val = {}

  if (!Object.keys(req.query).length) {
    val = await getCache('all')
  } else {
    const keys = Object.keys(req.query)
    let keyname = 'all:'

    keys.map(async key => {
      keyname += key + ':' + req.query[key] + ':';
    })

    val = await getCache(keyname)
  }

  if (val) {
    return (new BaseController())
      .successResponse(res, 'get:all_news:success', JSON.parse(val), Status.OK);
  }

  req.needCaching = true;
  return next();
}

module.exports = {
  preInterceptorRedisMiddleware
}

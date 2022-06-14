const { Router } = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

// Utils
const createController = require('src/interfaces/http/utils/create-controller');

module.exports = () => {
  const router = new Router();

  // Router configuration
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
  router.use(compression());

  // Topics
  router.post('/topics', createController('TopicController').store);
  router.get('/topics', createController('TopicController').index);
  router.get('/topics/:id', createController('TopicController').show);
  router.put('/topics/:id', createController('TopicController').update);
  router.delete('/topics/:id', createController('TopicController').destroy);

  // News
  router.get('/news', createController('NewsController').index);
  router.post('/news', createController('NewsController').store);
  router.put('/news/:id', createController('NewsController').update);
  router.delete('/news/:id', createController('NewsController').destroy);
  router.get('/news/:id', createController('NewsController').show);

  return router;
};

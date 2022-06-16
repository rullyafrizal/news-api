const { Router } = require('express');
const morgan = require('morgan');
const helmet = require('helmet');


// routes
const api = require('./api');

const routes = () => {
  // Initialize router
  const router = new Router();

  // Helmet
  router.use(helmet());

  // Log the endpoints being accessed
  router.use(morgan('dev'));

  // Load up the routes
  router.get('/', function (req, res, next) {
    return res.status(200).json({
      code: 200,
      message: 'Welcome to the API',
      env: process.env.NODE_ENV === 'development' ? process.env : 'production',
    })
  })
  router.use('/api', api());

  // Show available endpoints in the terminal
  return router;
};

module.exports = routes;

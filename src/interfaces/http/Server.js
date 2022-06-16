const express = require('express');
const routeList = require('express-routes-catalogue');

// Routes configuration
const routes = require('./routes');

class Server {
  constructor({ config, containerMiddleware }) {
    this.app = express();
    this.config = config;

    // Load up the container
    this.app.use(containerMiddleware);
  }

  /**
   * Boots up the server
   */
  start() {
    // enable the configuration of the server.
    this._configure();

    // start the server
    return new Promise((resolve) => {
      const http = this.app.listen(this.config.port || 3000, () => {
        const { port } = http.address();

        console.log(`API Running at port: ${port}`);
      });
    });
  }

  /**
   * Server Configurations
   */
  _configure() {
    // load up the routes
    this.app.use(routes());

    // Show available endpoints in the terminal
    routeList.default.terminal(this.app);

    // Handle invalid requests
    this.app.use((req, res) => {
      return res.status(404).json({ error: 'Not found' });
    });
  }
}

module.exports = Server;

const path = require('path');

module.exports = (controller) => {
  // Build the path first of the controller
  const controllersPath = path.resolve(__dirname, '..', 'controllers');
  const controllerPath = path.resolve(
    controllersPath,
    path.extname(controller) === '.js' ? controller : `${controller}.js`
  );

  try {
    // Require/load it up
    const ControllerInstance = require(`${controllerPath}`);

    // Instantiate it
    return new ControllerInstance();
  } catch (error) {
    console.error('cc', error);
  }
};

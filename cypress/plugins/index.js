// web/cypress/plugins/index.js
module.exports = (on, config) => {
    // require('@cypress/code-coverage/task')(on, config);
    // return config;
    on('task',require('@cypress/code-coverage/task'))
  };
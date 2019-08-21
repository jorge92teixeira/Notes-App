const http = require('http');
const config = require('./utils/config');
const app = require('./app');
const { clog } = require('./utils/console_logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  clog(`Server running on port ${config.PORT}`);
});

const jayson = require('jayson');
const { PORT } = require('./config');

const client = jayson.Client.http({
    port: PORT
});

module.exports = client;
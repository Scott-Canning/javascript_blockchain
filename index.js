const jayson = require('jayson');
const { PORT } = require('./config');
const { startMining, stopMining } = require('./miner/miner');

const server = new jayson.Server({
    startMining: function(_, callback) {
        startMining();
        callback(null, 'Mining Started');
    },
    stopMining: function(_, callback) {
        stopMining()
        callback(null, 'Mining Stopped');
    }
});

server.http().listen(PORT);

const jayson = require('jayson');
const { PORT } = require('./config');
const { startMining, stopMining } = require('./miner/miner');
const { utxos } = require('./db');

const server = new jayson.Server({
    startMining: function(_, callback) {
        callback(null, 'Mining Started');
        startMining();
    },
    stopMining: function(_, callback) {
        callback(null, 'Mining Stopped');
        stopMining();
    },
    getBalance: function(address, callback) {
        callback(null, 'Mining Stopped');
        getBalance();
    }
});

server.http().listen(PORT);

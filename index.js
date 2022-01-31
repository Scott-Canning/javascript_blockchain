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

    getBalance: function([address], callback) {
        const addressUTXOs = utxos.filter(utxo => {
            return utxo.owner === address && !utxo.spent;
        });
        // console.log("addressUTXOs: ", utxos.map(x => x.owner), address);
        // console.log("addressUTXOs: ", addressUTXOs.length);
        const balance = addressUTXOs.reduce((prevVal, currVal) => 
                                             prevVal + currVal.amount, 0);
        console.log(balance)                                        
        callback(null, balance);
    }
});

server.http().listen(PORT);

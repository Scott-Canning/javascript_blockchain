const client = require('../../client');
const { argv } = require('yargs');
const { address } = argv; // CLI: node getBalance --address=<ADDRESS>

client.request('getBalance', [address], function(err, response) {
    if(err) throw err;
    console.log(response.result);
});
const db = require('../db');
const Block = require('../models/Block');
const Transaction = require('../models/Transaction');
const UTXO = require('../models/UTXO');
const { PUBLIC_KEY, PRIVATE_KEY } = require('../config');

let mining = false;

function startMining() {
    mining = true;
    mine();
}

function stopMining() {
    mining = false;
}

function mine() {
    if(!mining) return;

    // create new block
    const block = new Block();

    // construct coinbase transaction
    const coinbase_in =  new UTXO('0x0', db.blockchain.coinbase);
    const coinbase_out =  new UTXO(PUBLIC_KEY, db.blockchain.coinbase);
    const coinbaseTx = new Transaction([coinbase_in], [coinbase_out]);
    block.addTransaction(coinbaseTx);
    console.log(coinbase_out);
    
    // loop over mempool and add transactions until block is full (based on fees?)
    
    // validate block and update UTXOs to spent
    block.validateBlock();

    // hash block
    while('0x' + block.hashBlock() >= db.blockchain.targetDifficulty) {
        block.nonce++;
    }

    db.blockchain.blocks.push(new Block());
    console.log(`\nMined block: ${db.blockchain.getBlockHeight()} \nHash: ${'0x' + block.hashBlock()} \nNonce: ${block.nonce}`);
    
    // calculate blocktime for adjacent blocks after genensis block
    let blocktime = 0;
    if (db.blockchain.getBlockHeight() > 0){
        blocktime = db.blockchain.blocktime();
        console.log(`PoW time: ${blocktime}`)
    }
    db.blockchain.blockTimes.push(blocktime);

    // adjust difficulty every diffAdjEpoch number of blocks (param defined in Blockchain.js)
    if (db.blockchain.getBlockHeight() % db.blockchain.diffAdjEpoch === 0){
        const sum = db.blockchain.blockTimes.reduce((a, b) => a + b, 0);
        const averageBlockTime = (sum / db.blockchain.blockTimes.length) || 0;
        // adjust target difficulty
        db.blockchain.targetDifficulty = db.blockchain.adjustTargetDiff(averageBlockTime);
        db.blockchain.blockTimes = [];
    }
    setTimeout(mine, 0);
}

module.exports = {
    startMining, 
    stopMining
};
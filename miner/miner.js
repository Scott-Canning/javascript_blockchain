const db = require('../db');
const Block = require('../models/Block');
const DIFF_ADJ_EPOCH = 32; // blocks

// dynamic difficulty adjustment (move to blockchain?)
let difficulty = 2;
let targetDifficulty = BigInt("0x" + "0".repeat(difficulty) + "F".repeat(64 - difficulty));
let targetBlockTime = 5000; // init to 5 second blocktime

function adjustTarget(average) {
    if(average < targetBlockTime) {
        difficulty++;
        console.log("\n target difficulty update (+): ", difficulty)
    } else if (average > targetBlockTime) {
        difficulty--;
        console.log("\n target difficulty update (-): ", difficulty)
    }
    targetDifficulty = BigInt("0x" + "0".repeat(difficulty) + "F".repeat(64 - difficulty));
}

let mining = true;
mine();

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
    const block = new Block()
    while('0x' + block.hashBlock() >= targetDifficulty) {
        block.nonce++;
    }


    db.blockchain.blocks.push(new Block());
    console.log(`\nMined block: ${db.blockchain.getBlockHeight()} \nHash: ${block.hashBlock()} \nNonce: ${block.nonce}`);
    
    // calculate blocktime for adjacent blocks after genensis block
    let blocktime = 0;
    if (db.blockchain.getBlockHeight() > 0){
        blocktime = db.blockchain.blocks[db.blockchain.getBlockHeight()].timestamp - 
        db.blockchain.blocks[db.blockchain.getBlockHeight() - 1].timestamp;
        console.log(`PoW time: ${blocktime}`)
    }

    // adjust difficulty every DIFF_ADJ_EPOCH number of blocks
    db.blockchain.blockTimes.push(blocktime);
    if (db.blockchain.getBlockHeight() % DIFF_ADJ_EPOCH === 0){
        const sum = db.blockchain.blockTimes.reduce((a, b) => a + b, 0);
        const averageBlockTime = (sum / db.blockchain.blockTimes.length) || 0;
        adjustTarget(averageBlockTime);
        db.blockchain.blockTimes = [];
    }
    mine()
}

module.exports = {
    startMining, 
    stopMining
};
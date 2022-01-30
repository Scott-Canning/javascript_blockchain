const SHA256 = require("crypto-js/sha256");

class Block {
    constructor() {
        this.transactions = []; // new ArrayBuffer(1024);
        this.timestamp = Date.now(); //.toString();
        this.nonce = 0;
        // add merkle root
        // this.merkleRoot...
        // this.txCount = 0;
        // this.blockSize = 10;
        // this.blockNumber = 0;
    }

    addTransaction(block) {
        this.transactions.push(block);
    }

    hashBlock() {
        // add pointer to prior block
        return SHA256(this.timestamp + "" + 
                      this.nonce + 
                      JSON.stringify(this.transactions)
                      ).toString();
    }

    hasSpace() {
         return (this.txCount < this.blockSize);
    }
};

module.exports = Block;
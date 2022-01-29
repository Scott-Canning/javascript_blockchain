const SHA256 = require("crypto-js/sha256");

class Block {
    constructor() {
        this.transactions = []; // new ArrayBuffer(1024);
        this.timestamp = Date.now(); //.toString();
        this.nonce = 0;
        this.txCount = 0;
        this.blockSize = 10;
        this.blockNumber = 0;
    }

    hashBlock() {
        return SHA256(this.timestamp + "" + this.nonce).toString();
    }

    hasSpace() {
         return (this.txCount < this.blockSize);
    }
};

module.exports = Block;
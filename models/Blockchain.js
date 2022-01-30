const Block = require('./Block.js');
// const DIFF_ADJ_EPOCH = 32;
// const TGT_BLOCK_TIME = 5000;

class Blockchain {
    constructor() {
        this.blocks = [];
        this.blockTimes = [];        // track difficulty
        this.difficulty = 2;
        this.diffAdjEpoch = 32;      // adjust difficulty every 32 blocks
        this.targetDifficulty = BigInt("0x" + "0".repeat(this.difficulty) + "F".repeat(64 - this.difficulty));
        this.targetBlockTime = 5000; // target 5 second block time
        this.coinbase = 50;
        //this.rewardAdjEpoch = 1000;  // half coinbase reward every 1000 blocks
    };
    
    getBlockHeight() {
        return this.blocks.length - 1;
    }

    addBlock(block){
        this.blocks.push(block);
    }

    adjustTargetDiff(average) {
        if(average < this.targetBlockTime) {
            this.difficulty++;
            console.log("\n target difficulty update (+): ", this.difficulty)
        } else if (average > this.targetBlockTime) {
            this.difficulty--;
            console.log("\n target difficulty update (-): ", this.difficulty)
        }
        return BigInt("0x" + "0".repeat(this.difficulty) + "F".repeat(64 - this.difficulty));
    }

    blocktime() {
        return this.blocks[this.getBlockHeight()].timestamp - 
               this.blocks[this.getBlockHeight() - 1].timestamp;
    }

    // genesisBlock() {
    //     let block = new Block();
    //     this.chain.push(block);
    // }



    // addBlock(newBlock) {
    //     // increment block number if not genesis block and add prev hash param
    //     if(this.height !== 0) {
    //         newBlock.blockNumber = this.chain[this.height - 1].blockNumber + 1;
    //         newBlock.previousHash = this.chain[this.height - 1].toHash();
    //     } else {
    //         newBlock.blockNumber = 1;
    //     }
    //     // hash(data + previousHash) of n - 1 block
        
    //     this.height++;
    //     this.chain.push(newBlock);
    // };
    
    // addTransaction(transaction) {
    //     let success = false;
    //     const sender = transaction.sender;
    //     const receiver = transaction.receiver;
    //     const amount = transaction.amount
    //     // sender has adequate balance
    //     if(sender.balance >= amount){
    //         if(this.chain[this.height].hasSpace()) { // block has space
                
    //             sender.balance -= amount;
    //             receiver.balance = (receiver.balance || 0) + +amount;
    //         } else { // block is full, create new block
    //             const newBlock = new Block();
    //             this.addBlock(newBlock);
    //         }
            
    //         this.chain[this.height].transactions.push(transaction);
    //         this.chain[this.height].txCount++;
    //         success = true;
    //         const response = {
    //             success: success,
    //             balance: sender.balance
    //         }
    //         return response;
    //     } else {
    //         console.log("Insufficient Balance")
    //         const response = {
    //             success: success,
    //             balance: sender.balance
    //         }
    //         return response;
    //     }
    // }

    // isValid() {
    //     for(let i = 1; i < this.chain.length; i++) {
    //         if (this.chain[i - 1].toHash().toString() !== 
    //             this.chain[i].previousHash.toString()) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    // getBalance(address){
    //     let blockIndex = this.height
    //     console.log(this.chain[blockIndex]);
    //     for(let i = blockIndex; i >= 0; i--){
    //         for(let n = this.chain[blockIndex].txCount - 1; n >= 0; n--){
    //             let sender = this.chain[blockIndex].transactions[n].sender;
    //             let receiver = this.chain[blockIndex].transactions[n].receiver;
    //             if(sender.address === address){
    //                 return sender.balance;
    //             } 
    //             else if (receiver.address === address){
    //                 return receiver.balance;
    //             }
    //         }
    //     }
    //     return 0;
    // }

    // getAccount(address){
    //     const blockIndex = this.height;
    //     console.log(this.chain);
    //     // loop over blocks
    //     for(let i = blockIndex; i >= 0; i--){
    //         // loop over txs
    //         for(let n = this.chain[i].txCount - 1; n >= 0; n--){
    //             let sender = this.chain[i].transactions[n].sender;
    //             let receiver = this.chain[i].transactions[n].receiver;
    //             if (address === sender.address) {
    //                 return sender;
    //             }
    //             else if (address === receiver.address) {
    //                 return receiver;
    //             }
    //         }
    //     }
    //     return undefined;
    // }
};

module.exports = Blockchain;
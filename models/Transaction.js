const { utxos } = require('../db');

class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputs = inputUTXOs;
        this.outputs = outputUTXOs;
    }

    validateUTXOs() {
        let inputUTXOsum = 0;
        let outputUTXOsum = 0;

        // ensure no input UTXOs have been spent & sum input UTXOs
        for(let i = 0; i < this.inputs.length; i++){
            if(this.inputs[i].spent){
                throw Error;
            }
            inputUTXOsum += this.inputs[i].amount;
        }

        // sum output UTXOs
        for (let i = 0; i < this.outputs.length; i++) {
            outputUTXOsum += this.outputs[i].amount;
        }

        // throw error if total inputUTXOs fail to cover total outputUTXOs
        if (inputUTXOsum < outputUTXOsum){
            throw Error;
        }

        // store utxos in db object
        this.outputs.forEach((output) => {
            utxos.push(output)
        });
        
        // mark all inputs as spent
        this.inputs.map((tx) => {
                return tx.spent = true;
        });

        this.fee = inputUTXOsum - outputUTXOsum;
    }

}

module.exports = Transaction;
class Transaction {
    constructor(inputs, outputs) {
        this.inputs = inputs;
        this.outputs = outputs;
    }
    // added from class work
    /*
    execute() {
        let inputUTXOsum = 0;
        let outputUTXOsum = 0;

        // ensure no input UTXOs have been spent & sum input UTXOs
        for(let i = 0; i < this.inputUTXOs.length; i++){
            if(this.inputUTXOs[i].spent){
                throw Error;
            }
            inputUTXOsum += this.inputUTXOs[i].amount;
        }

        // sum output UTXOs
        for (let i = 0; i < this.outputUTXOs.length; i++) {
            outputUTXOsum += this.outputUTXOs[i].amount;
        }

        // throw error if total inputUTXOs fail to cover total outputUTXOs
        if (inputUTXOsum < outputUTXOsum){
            throw Error;
        }

        this.inputUTXOs.map((tx) => {
                return tx.spent = true;
        });

        this.fee = inputUTXOsum - outputUTXOsum;
    }
    */
}

module.exports = Transaction;
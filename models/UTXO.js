class UTXO {
    constructor(owner, amount, coinbase=false) {
        this.owner = owner;
        this.amount = amount;
        this.spent = false;
        this.coinbase = coinbase;
    }
}

module.exports = UTXO;
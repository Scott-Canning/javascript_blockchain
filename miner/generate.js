const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// seed accounts with random balances
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

// create dict with demo keys
function genNewKeyPair() {
  let seed = ec.genKeyPair();
  let publicKey = '0x' + seed.getPublic().encode('hex').slice(0,40);
  let privateKey = seed.getPrivate().toString(16);
  let randBalance = getRandomInt(100, 500);
  let addressData = {
    publicKey: publicKey,
    privateKey: privateKey,
    balance: randBalance
  }
  console.log(addressData);
  return addressData;
};

genNewKeyPair();

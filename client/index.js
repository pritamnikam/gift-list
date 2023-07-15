const axios = require('axios');

const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

function getArgs () {
  const args = process.argv
    .slice(2)
    .map(arg => arg.split('='))
    .reduce((args, [value, key]) => {
        args[value] = key;
        return args;
    }, {});

    return args;
}

async function main() {

  const args = getArgs();
  // console.log(args);

  let name = 'Norman Block'; // fallback
  if (args.name) {
    name = args.name;
  }
  
  // TODO: how do we prove to the server we're on the nice list? 
  // find the proof that norman block is in the list 
  // create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList); 
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name, proof
  });

  console.log({ gift });
}

main();
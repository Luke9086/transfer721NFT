const Web3 = require("web3");

// Loading the contract ABI
// (the results of a previous compilation step)
//const fs = require("fs");
const abi =[{
"inputs":[
{
"internalType":"address",
"name":"from",
"type":"address"
},
{
"internalType":"address",
"name":"to",
"type":"address"
},
{
"internalType":"uint256",
"name":"tokenId",
"type":"uint256"
}
],
"name":"safeTransferFrom",
"outputs":[
],
"stateMutability":"nonpayable",
"type":"function"
}];
abi_1155 =[{
"inputs":[
{
"internalType":"address",
"name":"from",
"type":"address"
},
{
"internalType":"address",
"name":"to",
"type":"address"
},
{
"internalType":"uint256",
"name":"id",
"type":"uint256"
},
{
"internalType":"uint256",
"name":"amount",
"type":"uint256"
},
{
"internalType":"bytes",
"name":"data",
"type":"bytes"
}
],
"name":"safeTransferFrom",
"outputs":[
],
"stateMutability":"nonpayable",
"type":"function"
}];
const savior = "0x61A8774a176241db17a2Ed7d8c53871B5554DDc1";
const tokenid = "103692867455058241420223838326624472908508969441821108243543584501925047959553";
const contractAddress = "0x495f947276749Ce646f68AC8c248420045cb7b5e";
const compromisedAddress = "0xBe698c8a8C30297D99f78824689de38Fcf4171DF";
const num = "1";
async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
    )
  );
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.PRIVATE_KEY
  );
  web3.eth.accounts.wallet.add(signer);
  // Creating a Contract instance
  const contract = new web3.eth.Contract(
    abi,
    // Replace this with the address of your deployed contract
   contractAddress
  );
  // Issuing a transaction that calls the `echo` method
  const tx = contract.methods.safeTransferFrom(compromisedAddress,savior,tokenid);
  const receipt = await tx
    .send({
      from: signer.address,
      gas: await tx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
}

require("dotenv").config();
main();

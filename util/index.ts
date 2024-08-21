const HYPERTENTS_CONTRACT = "0x2F54c2c475aA8f9e4E7d2Eb26FaDcaA185803199";


import {bscTestnet, sepolia} from "viem/chains";
import {config} from "dotenv";

import ABI from "./abi";
import {ethers} from "ethers";

config();

async function main() {
  const provider = new ethers.JsonRpcProvider(bscTestnet.rpcUrls.default.http[0]);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as any, provider);

  const hypertents = new ethers.Contract(HYPERTENTS_CONTRACT, ABI, signer);

  const {hash} = await hypertents.initiate({
      settlementContract: HYPERTENTS_CONTRACT,
      swapper: signer.address,
      nonce: '0',
      originChainId: 0,
      initiateDeadline: 0,
      fillDeadline: 0,
      orderData: `0x`,
    },
    `0x`,
    `0x`);

  console.log(hash);
}

main();

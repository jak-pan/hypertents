const HYPERTENTS_CONTRACT = "0x2F54c2c475aA8f9e4E7d2Eb26FaDcaA185803199";

import { readFile } from "fs/promises";

import { bscTestnet, sepolia } from "viem/chains";
import { HyperClient } from "@polytope-labs/hyperclient";
import { config } from "dotenv";
import {
  createPublicClient,
  createWalletClient,
  decodeFunctionData,
  formatEther,
  fromHex,
  getContract,
  http,
  parseAbi,
  parseEventLogs,
  toHex,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { Account } from "@ethereumjs/util";
const ABI = JSON.parse(
  await readFile("./out/Hypertents.sol/Hypertents.abi.json", "utf-8")
);

config();

async function main() {
  const account = privateKeyToAccount(process.env.PRIVATE_KEY);

  const bscWalletClient = createWalletClient({
    chain: bscTestnet,
    account,
    transport: http(),
  });

  const bscTestnetClient = createPublicClient({
    chain: bscTestnet,
    transport: http(),
  });

  const clients = {
    sepolia: createPublicClient({ chain: sepolia, transport: http() }),
    bscTestnet: createPublicClient({ chain: bscTestnet, transport: http() }),
  };

  const bscHypertents = getContract({
    address: HYPERTENTS_CONTRACT,
    abi: ABI,
    client: { public: bscTestnetClient, wallet: bscWalletClient },
  });

  console.log("bscHypertents", bscHypertents);
}

main();

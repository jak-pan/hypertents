/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  StateMachineAbi,
  StateMachineAbiInterface,
} from "../../StateMachine.sol/StateMachineAbi";

const _abi = [
  {
    type: "function",
    name: "RELAY_CHAIN",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
] as const;

export class StateMachineAbi__factory {
  static readonly abi = _abi;
  static createInterface(): StateMachineAbiInterface {
    return new utils.Interface(_abi) as StateMachineAbiInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StateMachineAbi {
    return new Contract(address, _abi, signerOrProvider) as StateMachineAbi;
  }
}

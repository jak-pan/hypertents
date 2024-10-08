"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachineAbi__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
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
];
var StateMachineAbi__factory = /** @class */ (function () {
    function StateMachineAbi__factory() {
    }
    StateMachineAbi__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    StateMachineAbi__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    StateMachineAbi__factory.abi = _abi;
    return StateMachineAbi__factory;
}());
exports.StateMachineAbi__factory = StateMachineAbi__factory;

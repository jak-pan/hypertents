"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDispatcherAbi__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        type: "function",
        name: "dispatch",
        inputs: [
            {
                name: "response",
                type: "tuple",
                internalType: "struct DispatchPostResponse",
                components: [
                    {
                        name: "request",
                        type: "tuple",
                        internalType: "struct PostRequest",
                        components: [
                            {
                                name: "source",
                                type: "bytes",
                                internalType: "bytes",
                            },
                            {
                                name: "dest",
                                type: "bytes",
                                internalType: "bytes",
                            },
                            {
                                name: "nonce",
                                type: "uint64",
                                internalType: "uint64",
                            },
                            {
                                name: "from",
                                type: "bytes",
                                internalType: "bytes",
                            },
                            {
                                name: "to",
                                type: "bytes",
                                internalType: "bytes",
                            },
                            {
                                name: "timeoutTimestamp",
                                type: "uint64",
                                internalType: "uint64",
                            },
                            {
                                name: "body",
                                type: "bytes",
                                internalType: "bytes",
                            },
                        ],
                    },
                    {
                        name: "response",
                        type: "bytes",
                        internalType: "bytes",
                    },
                    {
                        name: "timeout",
                        type: "uint64",
                        internalType: "uint64",
                    },
                    {
                        name: "fee",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    {
                        name: "payer",
                        type: "address",
                        internalType: "address",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "commitment",
                type: "bytes32",
                internalType: "bytes32",
            },
        ],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "dispatch",
        inputs: [
            {
                name: "request",
                type: "tuple",
                internalType: "struct DispatchPost",
                components: [
                    {
                        name: "dest",
                        type: "bytes",
                        internalType: "bytes",
                    },
                    {
                        name: "to",
                        type: "bytes",
                        internalType: "bytes",
                    },
                    {
                        name: "body",
                        type: "bytes",
                        internalType: "bytes",
                    },
                    {
                        name: "timeout",
                        type: "uint64",
                        internalType: "uint64",
                    },
                    {
                        name: "fee",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    {
                        name: "payer",
                        type: "address",
                        internalType: "address",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "commitment",
                type: "bytes32",
                internalType: "bytes32",
            },
        ],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "dispatch",
        inputs: [
            {
                name: "request",
                type: "tuple",
                internalType: "struct DispatchGet",
                components: [
                    {
                        name: "dest",
                        type: "bytes",
                        internalType: "bytes",
                    },
                    {
                        name: "height",
                        type: "uint64",
                        internalType: "uint64",
                    },
                    {
                        name: "keys",
                        type: "bytes[]",
                        internalType: "bytes[]",
                    },
                    {
                        name: "timeout",
                        type: "uint64",
                        internalType: "uint64",
                    },
                    {
                        name: "fee",
                        type: "uint256",
                        internalType: "uint256",
                    },
                ],
            },
        ],
        outputs: [
            {
                name: "commitment",
                type: "bytes32",
                internalType: "bytes32",
            },
        ],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "fundRequest",
        inputs: [
            {
                name: "commitment",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "fundResponse",
        inputs: [
            {
                name: "commitment",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "payable",
    },
];
var IDispatcherAbi__factory = /** @class */ (function () {
    function IDispatcherAbi__factory() {
    }
    IDispatcherAbi__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    IDispatcherAbi__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    IDispatcherAbi__factory.abi = _abi;
    return IDispatcherAbi__factory;
}());
exports.IDispatcherAbi__factory = IDispatcherAbi__factory;

const ABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "faucet",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "_filled",
    inputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "_pending",
    inputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "_refunds",
    inputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "settlementContract",
        type: "address",
        internalType: "address",
      },
      {
        name: "swapper",
        type: "address",
        internalType: "address",
      },
      {
        name: "nonce",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "originChainId",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "initiateDeadline",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "fillDeadline",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "orderData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "fill",
    inputs: [
      {
        name: "order",
        type: "tuple",
        internalType: "struct CrossChainOrder",
        components: [
          {
            name: "settlementContract",
            type: "address",
            internalType: "address",
          },
          {
            name: "swapper",
            type: "address",
            internalType: "address",
          },
          {
            name: "nonce",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "originChainId",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "initiateDeadline",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "fillDeadline",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "orderData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "fillerData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "initiate",
    inputs: [
      {
        name: "order",
        type: "tuple",
        internalType: "struct CrossChainOrder",
        components: [
          {
            name: "settlementContract",
            type: "address",
            internalType: "address",
          },
          {
            name: "swapper",
            type: "address",
            internalType: "address",
          },
          {
            name: "nonce",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "originChainId",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "initiateDeadline",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "fillDeadline",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "orderData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "signature",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "fillerData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onAccept",
    inputs: [
      {
        name: "incoming",
        type: "tuple",
        internalType: "struct IncomingPostRequest",
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
            name: "relayer",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onGetResponse",
    inputs: [
      {
        name: "incoming",
        type: "tuple",
        internalType: "struct IncomingGetResponse",
        components: [
          {
            name: "response",
            type: "tuple",
            internalType: "struct GetResponse",
            components: [
              {
                name: "request",
                type: "tuple",
                internalType: "struct GetRequest",
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
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "timeoutTimestamp",
                    type: "uint64",
                    internalType: "uint64",
                  },
                  {
                    name: "keys",
                    type: "bytes[]",
                    internalType: "bytes[]",
                  },
                  {
                    name: "height",
                    type: "uint64",
                    internalType: "uint64",
                  },
                ],
              },
              {
                name: "values",
                type: "tuple[]",
                internalType: "struct StorageValue[]",
                components: [
                  {
                    name: "key",
                    type: "bytes",
                    internalType: "bytes",
                  },
                  {
                    name: "value",
                    type: "bytes",
                    internalType: "bytes",
                  },
                ],
              },
            ],
          },
          {
            name: "relayer",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onGetTimeout",
    inputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct GetRequest",
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
            type: "address",
            internalType: "address",
          },
          {
            name: "timeoutTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "keys",
            type: "bytes[]",
            internalType: "bytes[]",
          },
          {
            name: "height",
            type: "uint64",
            internalType: "uint64",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onPostRequestTimeout",
    inputs: [
      {
        name: "",
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
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onPostResponse",
    inputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IncomingPostResponse",
        components: [
          {
            name: "response",
            type: "tuple",
            internalType: "struct PostResponse",
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
                name: "timeoutTimestamp",
                type: "uint64",
                internalType: "uint64",
              },
            ],
          },
          {
            name: "relayer",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onPostResponseTimeout",
    inputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct PostResponse",
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
            name: "timeoutTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "refund",
    inputs: [
      {
        name: "order",
        type: "tuple",
        internalType: "struct CrossChainOrder",
        components: [
          {
            name: "settlementContract",
            type: "address",
            internalType: "address",
          },
          {
            name: "swapper",
            type: "address",
            internalType: "address",
          },
          {
            name: "nonce",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "originChainId",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "initiateDeadline",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "fillDeadline",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "orderData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "expiredHeight",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "resolve",
    inputs: [
      {
        name: "order",
        type: "tuple",
        internalType: "struct CrossChainOrder",
        components: [
          {
            name: "settlementContract",
            type: "address",
            internalType: "address",
          },
          {
            name: "swapper",
            type: "address",
            internalType: "address",
          },
          {
            name: "nonce",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "originChainId",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "initiateDeadline",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "fillDeadline",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "orderData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "fillerData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct ResolvedCrossChainOrder",
        components: [
          {
            name: "settlementContract",
            type: "address",
            internalType: "address",
          },
          {
            name: "swapper",
            type: "address",
            internalType: "address",
          },
          {
            name: "nonce",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "originChainId",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "initiateDeadline",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "fillDeadline",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "swapperInputs",
            type: "tuple[]",
            internalType: "struct Input[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "swapperOutputs",
            type: "tuple[]",
            internalType: "struct Output[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "recipient",
                type: "address",
                internalType: "address",
              },
              {
                name: "chainId",
                type: "uint32",
                internalType: "uint32",
              },
            ],
          },
          {
            name: "fillerOutputs",
            type: "tuple[]",
            internalType: "struct Output[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "recipient",
                type: "address",
                internalType: "address",
              },
              {
                name: "chainId",
                type: "uint32",
                internalType: "uint32",
              },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "error",
    name: "HeightTooLow",
    inputs: [],
  },
  {
    type: "error",
    name: "OrderNotFound",
    inputs: [],
  },
  {
    type: "error",
    name: "UnauthorizedAccount",
    inputs: [],
  },
  {
    type: "error",
    name: "UnexpectedCall",
    inputs: [],
  },
  {
    type: "error",
    name: "UnsupportedChain",
    inputs: [],
  },
] as const;

export default ABI;

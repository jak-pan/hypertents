# Hypertents

Hypertents is a proof of concept implementation of cross-chain intents settled via hyperbridge.

Workflow:

1. Swappers can post their intent `CrossChainOrder` on any source chain supported by Hyperbridge. For instance, Alice may submit the intent to swap 10 USDC input tokens on BSC for 9 USDT output tokens on ETH mainnet.
2. Intent Fillers fulfill the intent on the target chain specified by the intent: swapper receives their intended tokens. In our example, filler Bob may fulfill Alice's intent by filling her intent of 9 USDT on ETH mainnet.
3. Intent Fillers claim the intent inputs on the source chain. In our example, Bob could now claim the 10 USDC on BSC.
4. If no filler fulfills the intent, the swapper can claim back their input after the order expiry specified in the `CrossChainOrder`. In our example, if Alice's order found no fillers and she specified a fillDeadline of `1000'000`, she can claim it back after block `1000'0000` on BSC.

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

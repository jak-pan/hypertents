/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export type PostRequestStruct = {
  source: PromiseOrValue<BytesLike>;
  dest: PromiseOrValue<BytesLike>;
  nonce: PromiseOrValue<BigNumberish>;
  from: PromiseOrValue<BytesLike>;
  to: PromiseOrValue<BytesLike>;
  timeoutTimestamp: PromiseOrValue<BigNumberish>;
  body: PromiseOrValue<BytesLike>;
};

export type PostRequestStructOutput = [
  string,
  string,
  BigNumber,
  string,
  string,
  BigNumber,
  string
] & {
  source: string;
  dest: string;
  nonce: BigNumber;
  from: string;
  to: string;
  timeoutTimestamp: BigNumber;
  body: string;
};

export type DispatchPostResponseStruct = {
  request: PostRequestStruct;
  response: PromiseOrValue<BytesLike>;
  timeout: PromiseOrValue<BigNumberish>;
  fee: PromiseOrValue<BigNumberish>;
  payer: PromiseOrValue<string>;
};

export type DispatchPostResponseStructOutput = [
  PostRequestStructOutput,
  string,
  BigNumber,
  BigNumber,
  string
] & {
  request: PostRequestStructOutput;
  response: string;
  timeout: BigNumber;
  fee: BigNumber;
  payer: string;
};

export type DispatchPostStruct = {
  dest: PromiseOrValue<BytesLike>;
  to: PromiseOrValue<BytesLike>;
  body: PromiseOrValue<BytesLike>;
  timeout: PromiseOrValue<BigNumberish>;
  fee: PromiseOrValue<BigNumberish>;
  payer: PromiseOrValue<string>;
};

export type DispatchPostStructOutput = [
  string,
  string,
  string,
  BigNumber,
  BigNumber,
  string
] & {
  dest: string;
  to: string;
  body: string;
  timeout: BigNumber;
  fee: BigNumber;
  payer: string;
};

export type DispatchGetStruct = {
  dest: PromiseOrValue<BytesLike>;
  height: PromiseOrValue<BigNumberish>;
  keys: PromiseOrValue<BytesLike>[];
  timeout: PromiseOrValue<BigNumberish>;
  fee: PromiseOrValue<BigNumberish>;
};

export type DispatchGetStructOutput = [
  string,
  BigNumber,
  string[],
  BigNumber,
  BigNumber
] & {
  dest: string;
  height: BigNumber;
  keys: string[];
  timeout: BigNumber;
  fee: BigNumber;
};

export interface IDispatcherAbiInterface extends utils.Interface {
  functions: {
    "dispatch(((bytes,bytes,uint64,bytes,bytes,uint64,bytes),bytes,uint64,uint256,address))": FunctionFragment;
    "dispatch((bytes,bytes,bytes,uint64,uint256,address))": FunctionFragment;
    "dispatch((bytes,uint64,bytes[],uint64,uint256))": FunctionFragment;
    "fundRequest(bytes32,uint256)": FunctionFragment;
    "fundResponse(bytes32,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "dispatch(((bytes,bytes,uint64,bytes,bytes,uint64,bytes),bytes,uint64,uint256,address))"
      | "dispatch((bytes,bytes,bytes,uint64,uint256,address))"
      | "dispatch((bytes,uint64,bytes[],uint64,uint256))"
      | "fundRequest"
      | "fundResponse"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "dispatch(((bytes,bytes,uint64,bytes,bytes,uint64,bytes),bytes,uint64,uint256,address))",
    values: [DispatchPostResponseStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "dispatch((bytes,bytes,bytes,uint64,uint256,address))",
    values: [DispatchPostStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "dispatch((bytes,uint64,bytes[],uint64,uint256))",
    values: [DispatchGetStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "fundRequest",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "fundResponse",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "dispatch(((bytes,bytes,uint64,bytes,bytes,uint64,bytes),bytes,uint64,uint256,address))",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dispatch((bytes,bytes,bytes,uint64,uint256,address))",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "dispatch((bytes,uint64,bytes[],uint64,uint256))",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fundRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fundResponse",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IDispatcherAbi extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IDispatcherAbiInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    "dispatch(((bytes,bytes,uint64,bytes,bytes,uint64,bytes),bytes,uint64,uint256,address))"(
      response: DispatchPostResponseStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "dispatch((bytes,bytes,bytes,uint64,uint256,address))"(
      request: DispatchPostStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "dispatch((bytes,uint64,bytes[],uint64,uint256))"(
      request: DispatchGetStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fundRequest(
      commitment: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fundResponse(
      commitment: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  "dispatch(((bytes,bytes,uint64,bytes,bytes,uint64,bytes),bytes,uint64,uint256,address))"(
    response: DispatchPostResponseStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "dispatch((bytes,bytes,bytes,uint64,uint256,address))"(
    request: DispatchPostStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "dispatch((bytes,uint64,bytes[],uint64,uint256))"(
    request: DispatchGetStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fundRequest(
    commitment: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fundResponse(
    commitment: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    "dispatch(((bytes,bytes,uint64,bytes,bytes,uint64,bytes),bytes,uint64,uint256,address))"(
      response: DispatchPostResponseStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    "dispatch((bytes,bytes,bytes,uint64,uint256,address))"(
      request: DispatchPostStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    "dispatch((bytes,uint64,bytes[],uint64,uint256))"(
      request: DispatchGetStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    fundRequest(
      commitment: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    fundResponse(
      commitment: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    "dispatch(((bytes,bytes,uint64,bytes,bytes,uint64,bytes),bytes,uint64,uint256,address))"(
      response: DispatchPostResponseStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "dispatch((bytes,bytes,bytes,uint64,uint256,address))"(
      request: DispatchPostStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "dispatch((bytes,uint64,bytes[],uint64,uint256))"(
      request: DispatchGetStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fundRequest(
      commitment: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fundResponse(
      commitment: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    "dispatch(((bytes,bytes,uint64,bytes,bytes,uint64,bytes),bytes,uint64,uint256,address))"(
      response: DispatchPostResponseStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "dispatch((bytes,bytes,bytes,uint64,uint256,address))"(
      request: DispatchPostStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "dispatch((bytes,uint64,bytes[],uint64,uint256))"(
      request: DispatchGetStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fundRequest(
      commitment: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fundResponse(
      commitment: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}

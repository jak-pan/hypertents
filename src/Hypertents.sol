// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {CrossChainOrder, ResolvedCrossChainOrder, ISettlementContract} from "@across-protocol/contracts/erc7683/ERC7683.sol";
import {BaseIsmpModule, IncomingPostRequest, IncomingGetResponse} from "@polytope-labs/ismp-solidity/IIsmpModule.sol";

contract Hypertents is ISettlementContract, BaseIsmpModule {
	/// @notice Initiates the settlement of a cross-chain order
	/// @dev To be called by the filler
	/// @param order The CrossChainOrder definition
	/// @param signature The swapper's signature over the order
	/// @param fillerData Any filler-defined data required by the settler
	function initiate(CrossChainOrder memory order, bytes memory signature, bytes memory fillerData) external {
        // verify signature and collect funds to address(this)
    }

	/// @notice Resolves a specific CrossChainOrder into a generic ResolvedCrossChainOrder
	/// @dev Intended to improve standardized integration of various order types and settlement contracts
	/// @param order The CrossChainOrder definition
	/// @param fillerData Any filler-defined data required by the settler
	/// returns ResolvedCrossChainOrder hydrated order data including the inputs and outputs of the order
	function resolve(CrossChainOrder memory order, bytes memory fillerData) external view returns (ResolvedCrossChainOrder memory) {
        // return the ResolvedCrossChainOrder
    }

    /// Fill the order on the destination chain
    function fill(CrossChainOrder memory order) external {}

    /// Request for a refund on the source chain
    function refund(CrossChainOrder memory order) external {}

    /// Process an incoming request to redeem the filler's funds
	function onAccept(IncomingPostRequest calldata) external override onlyHost {}

    /// Process the response to a state query for refunds
    function onGetResponse(IncomingGetResponse memory) external override onlyHost {}
}

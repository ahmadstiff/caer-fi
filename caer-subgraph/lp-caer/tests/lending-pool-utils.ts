import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BorrowByPosition,
  CreatePosition,
  Flashloan,
  RepayByPosition,
  RepayWithCollateralByPosition,
  Supply,
  SupplyCollateralByPosition,
  SwapByPosition,
  Withdraw,
  WithdrawCollateral
} from "../generated/LendingPool/LendingPool"

export function createBorrowByPositionEvent(
  user: Address,
  amount: BigInt,
  shares: BigInt,
  bridge: boolean
): BorrowByPosition {
  let borrowByPositionEvent = changetype<BorrowByPosition>(newMockEvent())

  borrowByPositionEvent.parameters = new Array()

  borrowByPositionEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  borrowByPositionEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  borrowByPositionEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )
  borrowByPositionEvent.parameters.push(
    new ethereum.EventParam("bridge", ethereum.Value.fromBoolean(bridge))
  )

  return borrowByPositionEvent
}

export function createCreatePositionEvent(
  user: Address,
  positionAddress: Address
): CreatePosition {
  let createPositionEvent = changetype<CreatePosition>(newMockEvent())

  createPositionEvent.parameters = new Array()

  createPositionEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  createPositionEvent.parameters.push(
    new ethereum.EventParam(
      "positionAddress",
      ethereum.Value.fromAddress(positionAddress)
    )
  )

  return createPositionEvent
}

export function createFlashloanEvent(
  user: Address,
  token: Address,
  amount: BigInt
): Flashloan {
  let flashloanEvent = changetype<Flashloan>(newMockEvent())

  flashloanEvent.parameters = new Array()

  flashloanEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  flashloanEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  flashloanEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return flashloanEvent
}

export function createRepayByPositionEvent(
  user: Address,
  amount: BigInt,
  shares: BigInt
): RepayByPosition {
  let repayByPositionEvent = changetype<RepayByPosition>(newMockEvent())

  repayByPositionEvent.parameters = new Array()

  repayByPositionEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  repayByPositionEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  repayByPositionEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return repayByPositionEvent
}

export function createRepayWithCollateralByPositionEvent(
  user: Address,
  amount: BigInt,
  shares: BigInt
): RepayWithCollateralByPosition {
  let repayWithCollateralByPositionEvent =
    changetype<RepayWithCollateralByPosition>(newMockEvent())

  repayWithCollateralByPositionEvent.parameters = new Array()

  repayWithCollateralByPositionEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  repayWithCollateralByPositionEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  repayWithCollateralByPositionEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return repayWithCollateralByPositionEvent
}

export function createSupplyEvent(
  user: Address,
  amount: BigInt,
  shares: BigInt
): Supply {
  let supplyEvent = changetype<Supply>(newMockEvent())

  supplyEvent.parameters = new Array()

  supplyEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  supplyEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  supplyEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return supplyEvent
}

export function createSupplyCollateralByPositionEvent(
  user: Address,
  amount: BigInt
): SupplyCollateralByPosition {
  let supplyCollateralByPositionEvent =
    changetype<SupplyCollateralByPosition>(newMockEvent())

  supplyCollateralByPositionEvent.parameters = new Array()

  supplyCollateralByPositionEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  supplyCollateralByPositionEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return supplyCollateralByPositionEvent
}

export function createSwapByPositionEvent(
  user: Address,
  tokenIn: Address,
  tokenOut: Address,
  amountIn: BigInt,
  amountOut: BigInt
): SwapByPosition {
  let swapByPositionEvent = changetype<SwapByPosition>(newMockEvent())

  swapByPositionEvent.parameters = new Array()

  swapByPositionEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  swapByPositionEvent.parameters.push(
    new ethereum.EventParam("tokenIn", ethereum.Value.fromAddress(tokenIn))
  )
  swapByPositionEvent.parameters.push(
    new ethereum.EventParam("tokenOut", ethereum.Value.fromAddress(tokenOut))
  )
  swapByPositionEvent.parameters.push(
    new ethereum.EventParam(
      "amountIn",
      ethereum.Value.fromUnsignedBigInt(amountIn)
    )
  )
  swapByPositionEvent.parameters.push(
    new ethereum.EventParam(
      "amountOut",
      ethereum.Value.fromUnsignedBigInt(amountOut)
    )
  )

  return swapByPositionEvent
}

export function createWithdrawEvent(
  user: Address,
  amount: BigInt,
  shares: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
  )

  return withdrawEvent
}

export function createWithdrawCollateralEvent(
  user: Address,
  amount: BigInt
): WithdrawCollateral {
  let withdrawCollateralEvent = changetype<WithdrawCollateral>(newMockEvent())

  withdrawCollateralEvent.parameters = new Array()

  withdrawCollateralEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawCollateralEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawCollateralEvent
}

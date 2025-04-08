import {
  BorrowByPosition as BorrowByPositionEvent,
  CreatePosition as CreatePositionEvent,
  Flashloan as FlashloanEvent,
  RepayByPosition as RepayByPositionEvent,
  RepayWithCollateralByPosition as RepayWithCollateralByPositionEvent,
  Supply as SupplyEvent,
  SupplyCollateralByPosition as SupplyCollateralByPositionEvent,
  SwapByPosition as SwapByPositionEvent,
  Withdraw as WithdrawEvent,
  WithdrawCollateral as WithdrawCollateralEvent
} from "../generated/LendingPool/LendingPool"
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
} from "../generated/schema"

export function handleBorrowByPosition(event: BorrowByPositionEvent): void {
  let entity = new BorrowByPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount
  entity.shares = event.params.shares
  entity.bridge = event.params.bridge

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCreatePosition(event: CreatePositionEvent): void {
  let entity = new CreatePosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.positionAddress = event.params.positionAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFlashloan(event: FlashloanEvent): void {
  let entity = new Flashloan(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.token = event.params.token
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRepayByPosition(event: RepayByPositionEvent): void {
  let entity = new RepayByPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRepayWithCollateralByPosition(
  event: RepayWithCollateralByPositionEvent
): void {
  let entity = new RepayWithCollateralByPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSupply(event: SupplyEvent): void {
  let entity = new Supply(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSupplyCollateralByPosition(
  event: SupplyCollateralByPositionEvent
): void {
  let entity = new SupplyCollateralByPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSwapByPosition(event: SwapByPositionEvent): void {
  let entity = new SwapByPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.tokenIn = event.params.tokenIn
  entity.tokenOut = event.params.tokenOut
  entity.amountIn = event.params.amountIn
  entity.amountOut = event.params.amountOut

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount
  entity.shares = event.params.shares

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawCollateral(event: WithdrawCollateralEvent): void {
  let entity = new WithdrawCollateral(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

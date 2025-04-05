import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { BorrowByPosition } from "../generated/schema"
import { BorrowByPosition as BorrowByPositionEvent } from "../generated/LendingPool/LendingPool"
import { handleBorrowByPosition } from "../src/lending-pool"
import { createBorrowByPositionEvent } from "./lending-pool-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let amount = BigInt.fromI32(234)
    let shares = BigInt.fromI32(234)
    let bridge = "boolean Not implemented"
    let newBorrowByPositionEvent = createBorrowByPositionEvent(
      user,
      amount,
      shares,
      bridge
    )
    handleBorrowByPosition(newBorrowByPositionEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BorrowByPosition created and stored", () => {
    assert.entityCount("BorrowByPosition", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BorrowByPosition",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BorrowByPosition",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "BorrowByPosition",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "shares",
      "234"
    )
    assert.fieldEquals(
      "BorrowByPosition",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bridge",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

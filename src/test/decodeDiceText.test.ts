import { describe, it } from "node:test";
import assert from "node:assert";

import { decodeDiceText } from "../logic/index.ts";

describe("decodeDiceText", () => {
  it("should decode valid dice notation correctly", () => {
    const [amount, diceType] = decodeDiceText("2d6");
    assert.strictEqual(amount, 2);
    assert.strictEqual(diceType, 6);
  });

  it("should default to 1 when amount is not provided and 20 when dice type not specified", () => {
    const [amount, diceType] = decodeDiceText("d");
    assert.strictEqual(amount, 1);
    assert.strictEqual(diceType, 20);
  });

  it("should throw an error for invalid dice notation", () => {
    assert.throws(() => decodeDiceText("invalid"), /Invalid dice notation/);
  });
});

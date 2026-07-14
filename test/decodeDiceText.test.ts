import { describe, it, expect } from "vitest";

import { decodeDiceText } from "../src/logic/index.ts";

describe("decodeDiceText", () => {
  it("should decode valid dice notation correctly", () => {
    const [amount, diceType] = decodeDiceText("2d6");
    expect(amount).toBe(2);
    expect(diceType).toBe(6);
  });

  it("should default to 1 when amount is not provided and 20 when dice type not specified", () => {
    const [amount, diceType] = decodeDiceText("d");
    expect(amount).toBe(1);
    expect(diceType).toBe(20);
  });

  it("should throw an error for invalid dice notation", () => {
    expect(() => decodeDiceText("invalid")).toThrow(/Invalid dice notation/);
  });
});

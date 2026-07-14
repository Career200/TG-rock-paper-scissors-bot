import { describe, it, expect } from "vitest";

import { rpsGame } from "../src/logic/index.ts";

describe("rpsGame", () => {
  it("returns 0 on a tie", () => {
    expect(rpsGame("rock", "rock")).toBe(0);
  });
  it("returns 1 when user1 beats user2", () => {
    expect(rpsGame("rock", "scissors")).toBe(1);
  });
  it("returns 2 when user2 beats user1", () => {
    expect(rpsGame("paper", "scissors")).toBe(2);
  });
});

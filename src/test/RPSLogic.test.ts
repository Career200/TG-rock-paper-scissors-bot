import { describe, it } from "node:test";
import assert from "node:assert";

import { rpsGame } from "../logic/index.ts";

describe("rpsGame", () => {
  it("returns 0 on a tie", () => {
    assert.strictEqual(rpsGame("rock", "rock"), 0);
  });
  it("returns 1 when user1 beats user2", () => {
    assert.strictEqual(rpsGame("rock", "scissors"), 1);
  });
  it("returns 2 when user2 beats user1", () => {
    assert.strictEqual(rpsGame("paper", "scissors"), 2);
  });
});

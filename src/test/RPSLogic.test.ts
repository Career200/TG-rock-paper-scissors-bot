import { describe, it } from "node:test";
import assert from "node:assert";

import { RPSMatch } from "../RPSLogic.js";

describe("RPSMatch", () => {
  it("should return 'It's a tie!' when both users throw the same option", () => {
    assert.strictEqual(RPSMatch("rock", "rock"), "It's a tie!");
    assert.strictEqual(RPSMatch("paper", "paper"), "It's a tie!");
    assert.strictEqual(RPSMatch("scissors", "scissors"), "It's a tie!");
  });
  it("should return 'User 1 wins!' when user 1 throws rock and user 2 throws scissors", () => {
    assert.strictEqual(RPSMatch("rock", "scissors"), "User 1 wins!");
  });
  it("should return 'User 2 wins!' when user 1 throws paper and user 2 throws scissors", () => {
    assert.strictEqual(RPSMatch("paper", "scissors"), "User 2 wins!");
  });
});

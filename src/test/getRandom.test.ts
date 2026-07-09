import { describe, it } from "node:test";
import assert from "node:assert";

import { getRandom } from "../logic/index.ts";

describe("getRandom", () => {
  it("treats a single argument as the max, not the min", () => {
    const [min, max] = getRandom(5);
    assert.strictEqual(min, 1);
    assert.strictEqual(max, 5);
  });
});

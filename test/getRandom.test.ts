import { describe, it, expect } from "vitest";

import { getRandom } from "../src/logic/index.ts";

describe("getRandom", () => {
  it("treats a single argument as the max, not the min", () => {
    const [min, max] = getRandom(5);
    expect(min).toBe(1);
    expect(max).toBe(5);
  });
});

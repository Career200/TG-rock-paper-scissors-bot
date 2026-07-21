import {
  createExecutionContext,
  waitOnExecutionContext
} from "cloudflare:test";
import { env } from "cloudflare:workers";
import { afterEach, describe, it, expect, vi } from "vitest";
import worker from "../src/worker.ts";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("worker webhook handler", () => {
  it("initializes the bot against a mocked getMe call and processes an update", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = input.toString();
      if (url.includes("/bottest-token/getMe")) {
        return new Response(
          JSON.stringify({
            ok: true,
            result: {
              id: 1,
              is_bot: true,
              first_name: "TestBot",
              username: "test_bot"
            }
          }),
          { status: 200 }
        );
      }
      if (url.includes("/bottest-token/sendRichMessage")) {
        return new Response(JSON.stringify({ ok: true, result: true }), {
          status: 200
        });
      }
      throw new Error(`Unexpected fetch to ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const request = new Request("http://example.com/webhook", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        update_id: 1,
        message: {
          message_id: 1,
          date: 0,
          chat: { id: 1, type: "private", first_name: "Tester" },
          from: { id: 1, is_bot: false, first_name: "Tester" },
          text: "rock"
        }
      })
    });
    const ctx = createExecutionContext();

    const response = await worker.fetch(
      request,
      { ...env, BOT_TOKEN: "test-token" },
      ctx
    );
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

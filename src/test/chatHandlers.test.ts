import { describe, it } from "node:test";
import assert from "node:assert";
import type { Update } from "grammy/types";

process.env.BOT_TOKEN ??= "test-token";

const { bot } = await import("../bot/core.ts");
await import("../bot/modes/chat.ts");

// Skip the network call on bot.init()
bot.botInfo = {
  id: 1,
  is_bot: true,
  first_name: "TestBot",
  username: "test_bot",
  can_join_groups: true,
  can_read_all_group_messages: false,
  supports_inline_queries: false,
  can_connect_to_business: false,
  has_main_web_app: false,
  has_topics_enabled: false,
  allows_users_to_create_topics: false,
  can_manage_bots: false,
  supports_join_request_queries: false
};

let updateId = 0;
const makeTextUpdate = (text: string): Update => ({
  update_id: ++updateId,
  message: {
    message_id: 1,
    date: 0,
    chat: { id: 1, type: "private", first_name: "Tester" },
    from: { id: 1, is_bot: false, first_name: "Tester" },
    text
  }
});

describe("chat handlers", () => {
  it("route 'rock' to the rps handler and return a result", async () => {
    const calls: { method: string; payload: unknown }[] = [];
    bot.api.config.use((_prev, method, payload) => {
      calls.push({ method, payload });
      return Promise.resolve({ ok: true, result: true as any });
    });

    await bot.handleUpdate(makeTextUpdate("rock"));

    assert.strictEqual(
      calls.length,
      1,
      "expected exactly one handler to reply"
    );
    assert.strictEqual(calls[0].method, "sendRichMessage");
    const markdown = (calls[0].payload as any).rich_message.markdown as string;
    assert.match(markdown, /wins!|draw/i);
  });
});

import { webhookCallback } from "grammy";
import { createBot } from "./bot/core.ts";

interface Env {
  BOT_TOKEN: string;
  MODE?: string;
}

let bot: ReturnType<typeof createBot> | undefined;

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    bot ??= createBot(env.BOT_TOKEN, env.MODE === "development");
    return webhookCallback(bot, "cloudflare-mod")(request);
  }
};

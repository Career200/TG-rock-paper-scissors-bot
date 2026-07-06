import { Bot } from "grammy";

const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  throw new Error("BOT_TOKEN is not defined in the environment variables.");
}

export const bot = new Bot(TOKEN);

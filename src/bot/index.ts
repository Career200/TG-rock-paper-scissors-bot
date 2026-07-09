import { bot } from "./core.ts";

import "./modes/chat.ts";

console.log("Bot is starting...");

if (process.env.MODE === "development") {
  bot.on("message", async (ctx) => {
    console.log(`Received message: ${ctx.message.text}`);
  });
}

bot.start();

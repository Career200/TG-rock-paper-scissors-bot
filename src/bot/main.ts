import { Bot } from "grammy";
import { SoloMatch } from "../logic/RPSMatch.js";

const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  throw new Error("BOT_TOKEN is not defined in the environment variables.");
}

const emojiTextLookup = {
  rock: "🗿",
  paper: "📃",
  scissors: "✂️"
};

const bot = new Bot(TOKEN);

bot.on("message", (ctx) => ctx.reply("Bot is up!"));

console.log("Bot is starting...");
bot.start();

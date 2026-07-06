import {
  diceNotationRegex,
  decodeDiceText,
  getDiceThrows
} from "../../logic/main.ts";
import { getCoinFlipResultText, getRandomResultText } from "../common.ts";
import { bot } from "../core.ts";

const replyWithMarkdown = async (ctx: any, text: string) => {
  await ctx.replyWithRichMessage({
    markdown: text
  });
};

bot.command("start", async (ctx) => {
  await replyWithMarkdown(
    ctx,
    `Welcome to the bot! Use /help to see available commands.`
  );
});

bot.command(["help", "commands"], async (ctx) => {
  await replyWithMarkdown(
    ctx,
    `The bot will respond to certain ___messages___ or __/commands__:\n\n` +
      `__/help__ - Show this help message\n\n` +
      `___coin___ or ` +
      `___flip___ or ` +
      `___coinflip___ or ` +
      `__/coinflip__ - Flip a coin and get either Heads or Tails!\n\n` +
      `__random__ - Generate a random number between 1 and 100.\n\n` +
      `___random [number]___ or ` +
      `___random [number] [number]___  - Generate a random number between 1 and [number] or between [number] and [number].\n\n` +
      `___[amount?]d[diceType]___ - Generate random numbers from dice notation, e.g. d4 for a four-sided die or 2d6 for two six-sided dice.\n\n` +
      `Notice that "_d50_" is the same as "_random 50_" or "_random 1 50_" in terms of the result, the only difference is the accompanying text. Also, don't stress the upper/lowercase in messages, bot does not care. Also also: send a message that says "_d_" and see what happens.\n\n` +
      `P. S. You can call the bot in groups and private chats by typing @${bot.botInfo.username} and your query.`
  );
});

bot.command("coinflip", async (ctx) => {
  await replyWithMarkdown(ctx, getCoinFlipResultText());
});

bot.on(":text").hears(/^(?:coin|flip|coinflip)$/i, async (ctx) => {
  await replyWithMarkdown(ctx, getCoinFlipResultText());
});

bot.on(":text").hears(/^random(?: (\d+))?(?: (\d+))?$/i, async (ctx) => {
  if (!ctx.message?.text) return; // not possible from hears - type guard

  const match = ctx.message.text.match(/^random(?: (\d+))?(?: (\d+))?$/i);
  if (!match) return;

  await replyWithMarkdown(
    ctx,
    getRandomResultText(parseInt(match[1]), parseInt(match[2]))
  );
});

bot.on(":text").hears(diceNotationRegex, async (ctx) => {
  if (!ctx.message?.text) return; // not possible from hears - type guard

  const [amount, diceType] = decodeDiceText(ctx.message.text);
  const throws = getDiceThrows(amount, diceType);

  const total = throws.reduce((acc, val) => acc + val, 0);

  await ctx.replyWithRichMessage({
    markdown: `Total ___${total}___ from _${amount}d${diceType}_: __${throws.join("__, __")}__`
  });
});

/*
 TODO: random broken: random 20 = number from 20 and nan

*/

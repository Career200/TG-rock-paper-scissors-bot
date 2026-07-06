import {
  diceNotationRegex,
  decodeDiceText,
  getDiceThrows
} from "../../logic/main.ts";
import {
  helpText,
  getCoinFlipResultText,
  getRandomResultText,
  getDiceResultText
} from "../../common.ts";
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
    helpText +
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

  await replyWithMarkdown(ctx, getDiceResultText(amount, diceType, throws));
});

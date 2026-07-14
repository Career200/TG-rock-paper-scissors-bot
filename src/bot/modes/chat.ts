import {
  diceNotationRegex,
  decodeDiceText,
  getDiceThrows,
  rpsRegex,
  soloMatch,
  rpsArr,
  type rpsOption
} from "../../logic/index.ts";
import {
  helpText,
  getCoinFlipResultText,
  getRandomResultText,
  getDiceResultText,
  getRpsText
} from "../../common.ts";
import type { Bot } from "grammy";

const replyWithMarkdown = async (ctx: any, text: string) => {
  await ctx.replyWithRichMessage({
    markdown: text
  });
};

export const registerChatHandlers = (bot: Bot) => {
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

  bot.on(":text").hears(rpsRegex, async (ctx) => {
    if (!ctx.message?.text) return; // not possible from hears - type guard

    const match = ctx.message.text.match(rpsRegex);
    if (!match || !rpsArr.includes(match[1] as rpsOption)) return;

    const userThrow = match[1] as rpsOption;

    const { result, botThrow } = soloMatch(userThrow);

    await replyWithMarkdown(
      ctx,
      getRpsText(
        result,
        { name: "user", option: userThrow },
        { name: "bot", option: botThrow }
      )
    );
  });
};

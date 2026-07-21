import { helpText, getCoinFlipResultText } from "../../common.ts";
import { stripLeadingMention, type RespondFn } from "../utils.ts";
import { matchStatic } from "../features/static/index.ts";
import { matchRandom } from "../features/random/index.ts";
import { matchRps } from "../features/rps/index.ts";
import { InlineQueryResultBuilder, type Bot } from "grammy";

const matchers: RespondFn[] = [matchStatic, matchRandom, matchRps];

const resolveReply = async (text: string) => {
  for (const respond of matchers) {
    const reply = await respond(text);
    if (reply !== undefined) return reply;
  }
  return undefined;
};

export const registerStatelessHandlers = (bot: Bot) => {
  bot.command("start", async (ctx) => {
    await ctx.replyWithRichMessage({
      markdown: `Welcome to the bot! Use /help to see available commands.`
    });
  });

  bot.command(["help", "commands"], async (ctx) => {
    await ctx.replyWithRichMessage({
      markdown:
        helpText +
        `P. S. You can call the bot in groups and private chats by typing @${bot.botInfo.username} and your query.`
    });
  });

  bot.command("coinflip", async (ctx) => {
    await ctx.replyWithRichMessage({ markdown: getCoinFlipResultText() });
  });

  bot.on(":text", async (ctx, next) => {
    if (!ctx.message?.text) return next();

    const reply = await resolveReply(ctx.message.text);
    if (reply === undefined) return;

    await ctx.replyWithRichMessage({ markdown: reply });
  });

  bot.on("guest_message:text", async (ctx, next) => {
    const guestMessage = ctx.guestMessage;
    const text = stripLeadingMention(guestMessage.text, guestMessage.entities);

    const reply = await resolveReply(text);
    if (reply === undefined) return next();

    await ctx.api.answerGuestQuery(
      guestMessage.guest_query_id!,
      InlineQueryResultBuilder.article(
        String(guestMessage.message_id),
        "Result"
      ).rich({ markdown: reply })
    );
  });
};

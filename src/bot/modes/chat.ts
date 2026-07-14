import { helpText, getCoinFlipResultText } from "../../common.ts";
import { dispatch } from "../dispatcher.ts";
import { InlineQueryResultBuilder, type Bot } from "grammy";

const stripLeadingMention = (
  text: string,
  entities: readonly { offset: number; length: number; type: string }[] = []
) => {
  const mention = entities.find((e) => e.type === "mention" && e.offset === 0);
  return mention ? text.slice(mention.length).trim() : text;
};

export const registerChatHandlers = (bot: Bot) => {
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

  bot.on(":text", async (ctx) => {
    if (!ctx.message?.text) return; // not possible from :text - type guard

    await dispatch({
      text: ctx.message.text,
      reply: async (markdown) => {
        await ctx.replyWithRichMessage({ markdown });
      }
    });
  });

  bot.on("guest_message", async (ctx) => {
    const guestMessage = ctx.guestMessage;
    if (!guestMessage.text) return;

    await dispatch({
      text: stripLeadingMention(guestMessage.text, guestMessage.entities),
      reply: async (markdown) => {
        await ctx.api.answerGuestQuery(
          guestMessage.guest_query_id!,
          InlineQueryResultBuilder.article(
            String(guestMessage.message_id),
            "Result"
          ).rich({ markdown })
        );
      }
    });
  });
};

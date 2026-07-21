import { InlineKeyboard, InlineQueryResultBuilder, type Bot } from "grammy";
import { stripLeadingMention } from "../../utils.ts";

// spike
const duelTriggerRegex = /^(duel|rps)\b/i;

const spikeKeyboard = () =>
  new InlineKeyboard()
    .text("Claim", "spike_claim")
    .text("Not yours", "spike_not_yours");

export const registerDuelHandlers = (bot: Bot) => {
  bot.on("guest_message", async (ctx, next) => {
    const guestMessage = ctx.guestMessage;

    // spike
    if (guestMessage.reply_to_message) {
      await ctx.api.answerGuestQuery(
        guestMessage.guest_query_id!,
        InlineQueryResultBuilder.article(
          String(guestMessage.message_id),
          "Reply result"
        ).text("spike: fresh plain-text message from a reply, no buttons")
      );
      return;
    }

    return next();
  });

  bot.on("guest_message:text", async (ctx, next) => {
    const guestMessage = ctx.guestMessage;
    const text = stripLeadingMention(guestMessage.text, guestMessage.entities);

    const trigger = text.match(duelTriggerRegex);
    if (!trigger) return next();

    await ctx.api.answerGuestQuery(
      guestMessage.guest_query_id!,
      InlineQueryResultBuilder.article(
        String(guestMessage.message_id),
        "Duel",
        { reply_markup: spikeKeyboard() }
      ).text(`spike: "${trigger[1]}" trigger matched — duel keyboard incoming`)
    );
  });

  // spike
  bot.callbackQuery("spike_not_yours", async (ctx) => {
    await ctx.answerCallbackQuery({ text: "Not your duel!", show_alert: true });
  });

  bot.callbackQuery("spike_claim", async (ctx) => {
    await ctx.answerCallbackQuery({ text: "Claimed!" });

    const inlineMessageId = ctx.callbackQuery.inline_message_id;
    if (!inlineMessageId) return;

    const claimer =
      ctx.callbackQuery.from.username ?? ctx.callbackQuery.from.first_name;
    await ctx.api.editMessageTextInline(
      inlineMessageId,
      `Claimed by @${claimer}`,
      { reply_markup: spikeKeyboard() }
    );
  });
};

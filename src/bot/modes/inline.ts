import { InlineQueryResultBuilder, type Bot } from "grammy";
import { getCoinflip } from "../../logic/index.ts";
import { emojiTextLookup } from "../../common.ts";

const inlineOptions = ["flip", "random" /* , ...RPSArr */] as const;

const inlineQueryResults = {
  flip: InlineQueryResultBuilder.article("flip", "Flip a coin", {
    description: "Flip a coin and get either Heads or Tails!"
  }).text(emojiTextLookup.flip + " " + getCoinflip()),
  random: InlineQueryResultBuilder.article(
    "random",
    "Generate a random number",
    {
      description:
        "Use random [max] for values 1-[max] or specify with random [min] [max]."
    }
  ).text(emojiTextLookup.random + " " + Math.floor(Math.random() * 100) + 1)
  /* later */
  /* rock: InlineQueryResultBuilder.article("rock", "Rock").text(
    "Initiate rock-paper-scissors, Rock 🗿"
  ),
  paper: InlineQueryResultBuilder.article("paper", "Paper").text(
    "Initiate rock-paper-scissors, Paper 📃"
  ),
  scissors: InlineQueryResultBuilder.article("scissors", "Scissors").text(
    "Initiate rock-paper-scissors, Scissors ✂️"
  ) */
};

const allInlineQueryResults = Object.values(inlineQueryResults);

export const registerInlineHandlers = (bot: Bot) => {
  bot.inlineQuery(/flip/, async (ctx) => {
    const res = inlineQueryResults.flip;

    await ctx.answerInlineQuery([res]);
  });

  /* inline "autofill" buttons */
  bot.on("inline_query", async (ctx) => {
    const query = ctx.inlineQuery.query.trim().toLowerCase();
    console.log(`Received inline query: ${query}`);

    if (!query) {
      return ctx.answerInlineQuery(allInlineQueryResults);
    }

    const filteredOptions = inlineOptions.filter((option) =>
      option.startsWith(query)
    );

    const results = filteredOptions.map((option) => inlineQueryResults[option]);

    return ctx.answerInlineQuery(results);
  });
};

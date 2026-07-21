import { registerDuelHandlers } from "../features/duel/index.ts";
import type { Bot } from "grammy";

export const registerStatefulHandlers = (bot: Bot) => {
  registerDuelHandlers(bot);
};

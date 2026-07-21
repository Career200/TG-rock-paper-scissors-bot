import { Bot } from "grammy";
import { registerStatelessHandlers } from "./handlers/stateless.ts";
import { registerStatefulHandlers } from "./handlers/stateful.ts";

export const createBot = (token: string, isDev: boolean = false) => {
  const bot = new Bot(token);

  if (isDev) {
    bot.use(async (ctx, next) => {
      console.log(ctx.message ?? ctx.guestMessage);
      await next();
    });
  }

  registerStatelessHandlers(bot);
  registerStatefulHandlers(bot);

  return bot;
};

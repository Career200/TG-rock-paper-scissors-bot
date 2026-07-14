import { Bot } from "grammy";
import { registerChatHandlers } from "./modes/chat.ts";

export const createBot = (token: string) => {
  const bot = new Bot(token);

  registerChatHandlers(bot);

  return bot;
};

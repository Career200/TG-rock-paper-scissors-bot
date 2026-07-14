# TG handy tools bot

A Telegram bot built with [grammY](https://grammy.dev/), deployed as a **Cloudflare Worker** and driven entirely by **Telegram webhooks** (no polling, no long-running process).

## Tech stack

The project structure is the default scaffold produced by `wrangler init` (a plain Cloudflare Worker, TypeScript template); the bot logic itself is implemented with grammY, wired up in `src/bot`.

- **Runtime**: [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- **Bot framework**: [grammY](https://grammy.dev/)
- **Transport**: Telegram Bot API webhooks via grammY's `webhookCallback`
- **Language**: TypeScript
- **Testing**: [Vitest](https://vitest.dev/) + [`@cloudflare/vitest-pool-workers`](https://developers.cloudflare.com/workers/testing/vitest-integration/) (tests run against the actual `workerd` runtime)
- **Tooling**: [Wrangler](https://developers.cloudflare.com/workers/wrangler/) for local dev (`wrangler dev`) and deployment (`wrangler deploy`)

## Setup

1. Get a bot token from [@BotFather](https://t.me/BotFather).
2. `npm install`
3. `npx wrangler login` (once, to authenticate with your Cloudflare account)
4. Provide the token: for local dev, put `BOT_TOKEN=...` in a `.dev.vars` file (gitignored); for production, `npx wrangler secret put BOT_TOKEN`
5. Run locally with `npm run dev`, or ship with `npm run deploy`
6. Register the webhook once, pointing at your deployed Worker URL:
   ```bash
   curl "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<YOUR_WORKER_URL>"
   ```

See the [grammY Cloudflare Workers guide](https://grammy.dev/hosting/cloudflare-workers-nodejs) for more details on [debugging](https://grammy.dev/hosting/cloudflare-workers-nodejs#debugging-your-bot), and background on building a Cloudflare worker bot from scratch.

## Features

Bot responds to user messages:

1. Coinflip on "coin"/"flip"/"coinflip" or /coinflip
2. Random number on "random [first number?] [second number?]" - 1-100 by default, 1-first when one specified, first-second with both
3. Dice from dice notation - "d20" and "2d6" and so on
4. Rock-paper-scissors - play with bot

Supposed features:
1. Play with a friend in a convenient manner (bot remembers your figure and displays the result with notification when your call is answered)- WiP
2. Add to group chat (direct duels with inline keyboard)? - later
3. Play with multiple users - ongoing discussion (is it really needed? Forces multiple rounds, pulling a straw is faster)
4. Pull a straw.


## Commands
### /help
- User sends /help command
- Bot responds with a list of available commands and their descriptions

### /coinflip
- User sends /coinflip command
- Bot responds with a random result (Heads or Tails)

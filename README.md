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
4. Provide the token: for production, `npx wrangler secret put BOT_TOKEN`. For local dev, see [Local development](#local-development) below.
5. Ship with `npm run deploy`.
6. Register the production webhook once, pointing at your deployed Worker URL. `allowed_updates` must list `guest_message` for guest-mode replies:
   ```bash
   curl "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<YOUR_WORKER_URL>&allowed_updates=%5B%22message%22%2C%22guest_message%22%5D"
   ```

See the [grammY Cloudflare Workers guide](https://grammy.dev/hosting/cloudflare-workers-nodejs) for more details on [debugging](https://grammy.dev/hosting/cloudflare-workers-nodejs#debugging-your-bot), and background on building a Cloudflare worker bot from scratch.

## Local development

Local dev talks to Telegram through a tunnel, so it needs its own bot — reusing the production `BOT_TOKEN` would mean testing against the live bot, and `wrangler dev` never reads secrets from Cloudflare anyway (`env.BOT_TOKEN` only comes from `.dev.vars` or an explicit `--var`).

1. Create a second bot with [@BotFather](https://t.me/BotFather) dedicated to local testing.
2. Install [ngrok](https://ngrok.com/) and, optionally, reserve a static domain (free tier supports one) so the webhook URL doesn't change between runs.
3. Copy `.dev.vars.example` to `.dev.vars` (gitignored) and fill in:
   ```
   DEV_BOT_TOKEN=<your dev bot's token>
   NGROK_DOMAIN=<your reserved domain, optional>
   ```
4. Run `npm run dev`. This runs `scripts/dev.mjs`, which:
   - starts ngrok on port 8787 (or reuses one already running),
   - registers that tunnel URL as the dev bot's webhook via `setWebhook`,
   - starts `wrangler dev` with `BOT_TOKEN` set to `DEV_BOT_TOKEN` and `MODE=development`, so the Worker answers as the dev bot.

   Use `npm run dev:worker` instead if you just want plain `wrangler dev` without the ngrok/webhook automation.

Running in dev mode (`MODE=development`) also logs every incoming `ctx.message` to the console before any handler runs, to make it easier to inspect what Telegram actually sent.

## Features

Bot responds to user messages:

1. Help on "help"/"commands" or /help
2. Coinflip on "coin"/"flip"/"coinflip" or /coinflip
3. Random number on "random [first number?] [second number?]" - 1-100 by default, 1-first when one specified, first-second with both
4. Dice from dice notation - "d20" and "2d6" and so on
5. Rock-paper-scissors - play with bot

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

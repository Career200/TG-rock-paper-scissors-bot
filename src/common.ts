import { getCoinflip, getRandom, rpsOption } from "./logic/index.ts";

export const emojiTextLookup = {
  flip: "🪙",
  random: "🎲",
  rock: "🗿",
  paper: "📃",
  scissors: "✂️"
};

export const getCoinFlipResultText = () =>
  `You got ${emojiTextLookup.flip} __${getCoinflip()}__!`;

export const getRandomResultText = (first?: number, second?: number) => {
  const [min, max, res] = getRandom(first, second);
  return `Between ${min} and ${max} you got: ${emojiTextLookup.random} __${res}__!`;
};

export const getDiceResultText = (
  amount: number,
  diceType: number,
  throws: number[]
) => {
  const total = throws.reduce((acc, val) => acc + val, 0);
  return `Total ___${total}___ from _${amount}d${diceType}_: __${throws.join("__, __")}__`;
};

export const helpText = `The bot will respond to certain ___messages___ or __/commands__:\n\n__/help__ - Show this help message\n\n___coin___ or ___flip___ or ___coinflip___ or __/coinflip__ - Flip a coin and get either Heads or Tails!\n\n__random__ - Generate a random number between 1 and 100.\n\n___random [number]___ or ___random [number] [number]___  - Generate a random number between 1 and [number] or between [number] and [number].\n\n___[amount?]d[diceType]___ - Generate random numbers from dice notation, e.g. d4 for a four-sided die or 2d6 for two six-sided dice.\n\nNotice that "_d50_" is the same as "_random 50_" or "_random 1 50_" in terms of the result, the only difference is the accompanying text. Also, don't stress the upper/lowercase in messages, bot does not care. Also also: send a message that says "_d_" and see what happens.\n\n`;

type userInfo = {
  name: string;
  option: rpsOption;
};
export const getRpsText = (
  gameResult: 0 | 1 | 2,
  user1: userInfo,
  user2: userInfo
) => {
  if (gameResult === 0) {
    return (
      "It's a __draw__!" +
      user1.name +
      user1.option +
      "-" +
      user2.option +
      user2.name
    );
  }

  const user1won = gameResult < 2;
  let winner = user1won ? user1 : user2;
  let loser = user1won ? user2 : user1;

  return (
    winner.name +
    " wins! __" +
    winner.option.toUpperCase() +
    "__ " +
    emojiTextLookup[winner.option] +
    " beats __" +
    loser.option +
    "__ " +
    emojiTextLookup[loser.option]
  );
};

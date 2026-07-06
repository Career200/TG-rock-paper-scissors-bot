import { getCoinflip, getRandom } from "../logic/main.ts";

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

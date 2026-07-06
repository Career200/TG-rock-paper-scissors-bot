function normalizeNumber(n: number | undefined, defaultTo: number): number;
function normalizeNumber(n?: number): number | undefined;
function normalizeNumber(n?: number, defaultTo?: number) {
  return n == null || Number.isNaN(n) ? defaultTo : n;
}

export const diceNotationRegex = /^(\d+)?d(\d+)?$/i;

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

export const RPSArr = [ROCK, PAPER, SCISSORS] as const;

export type rpsOptions = (typeof RPSArr)[number];

export const getCoinflip = () => (Math.random() < 0.5 ? "Heads" : "Tails");

/**
 * No args => between 1 and 100. One arg => between 1 and that number. Two args => between those two numbers.
 */
export const getRandom = (first?: number, second?: number) => {
  let min = !normalizeNumber(second) ? 1 : normalizeNumber(first, 1); // if only first => first is max
  let max = normalizeNumber(second) ?? normalizeNumber(first, 100);

  const res = Math.floor(Math.random() * (max - min + 1)) + min;

  return [min, max, res];
};

/**
 * Transforms a dice notation string (e.g., "2d6") to numbers. No amount in the line => 1 ("d20" = 1 die); No dice type in the line => 20 ("2d" = 2 default dice (useful for advantage)).
 */
export const decodeDiceText = (line: string) => {
  const match = line.match(diceNotationRegex);
  if (!match) {
    throw new Error("Invalid dice notation");
  }
  const amount = match[1] ? parseInt(match[1], 10) : 1;
  const diceType = match[2] ? parseInt(match[2], 10) : 20;
  return [amount, diceType];
};

/**
 * Generates an array of random numbers. No args => between 1 and 20. One arg => between 1 and that value.
 */
export const getDiceThrows = (first?: number, second?: number) => {
  const amount = normalizeNumber(first, 1);
  const diceType = normalizeNumber(second, 20);
  return Array.from(
    { length: amount },
    () => Math.floor(Math.random() * diceType) + 1
  );
};

const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper"
};

export const RPSMatch = (user1: rpsOptions, user2: rpsOptions) => {
  if (user1 === user2) {
    return "It's a tie!";
  } else if (beats[user1] === user2) {
    return "User 1 wins!";
  } else {
    return "User 2 wins!";
  }
};

export const SoloMatch = (userThrow: rpsOptions) =>
  RPSMatch(userThrow, RPSArr[Math.floor(Math.random() * 3)]);

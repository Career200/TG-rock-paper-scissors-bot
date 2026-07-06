export const diceNotationRegex = /^(\d+)?d(\d+)?$/i;

export const RPSArr = ["rock", "paper", "scissors"] as const;

type options = (typeof RPSArr)[number];

export const getCoinflip = () => (Math.random() < 0.5 ? "Heads" : "Tails");

const transformFromOptionalArg = (first: number, second?: number) => {
  const min = second !== undefined ? first : 1;
  const max = second !== undefined ? second : first;

  return [min, max];
};
/**
 * No args => between 1 and 100. One arg => between 1 and that number. Two args => between those two numbers.
 *
 */
export const getRandom = (first?: number, second?: number) => {
  if (first === undefined || Number.isNaN(first)) {
    first = 100;
  }
  const [min, max] = transformFromOptionalArg(first, second);
  const res = Math.floor(Math.random() * (max - min + 1)) + min;

  return [min, max, res];
};

/**
 * Transforms a dice notation string (e.g., "2d6") to numbers. No amount in the line => 1 ("d20" = 1 die); No dice type in the line => 20 ("2d" = 2 default dice (useful for advantage)).
 *
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
  if (first === undefined || Number.isNaN(first)) {
    first = 20;
  }
  const [amount, diceType] = transformFromOptionalArg(first, second);

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

export const RPSMatch = (user1: options, user2: options) => {
  if (user1 === user2) {
    return "It's a tie!";
  } else if (beats[user1] === user2) {
    return "User 1 wins!";
  } else {
    return "User 2 wins!";
  }
};

export const SoloMatch = (userThrow: options) =>
  RPSMatch(userThrow, RPSArr[Math.floor(Math.random() * 3)]);

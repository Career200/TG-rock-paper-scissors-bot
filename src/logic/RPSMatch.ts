export const RPSArr = ["rock", "paper", "scissors"] as const;

type options = (typeof RPSArr)[number];

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

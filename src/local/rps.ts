import { RPSArr, RPSMatch } from "../logic/main.ts";
import type { rpsOptions } from "../logic/main.ts";

const isRpsOption = (arg: string): arg is rpsOptions => {
  return RPSArr.includes(arg as rpsOptions);
};

const testGame = (user?: string) => {
  let user1: rpsOptions;
  if (user && isRpsOption(user)) {
    user1 = user;
  } else {
    user1 = RPSArr[Math.floor(Math.random() * 3)];
  }
  const user2 = RPSArr[Math.floor(Math.random() * 3)];
  console.log(
    `User1: ${user1} User2: ${user2} Result: ${RPSMatch(user1, user2)}`
  );
};

const userArg = process.argv[2];

testGame(userArg);

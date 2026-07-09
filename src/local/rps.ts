import { rpsArr, rpsGame } from "../logic/index.ts";
import type { rpsOption } from "../logic/index.ts";

const isRpsOption = (arg: string): arg is rpsOption => {
  return rpsArr.includes(arg as rpsOption);
};

const testGame = (user?: string) => {
  let user1: rpsOption;
  if (user && isRpsOption(user)) {
    user1 = user;
  } else {
    user1 = rpsArr[Math.floor(Math.random() * 3)];
  }
  const user2 = rpsArr[Math.floor(Math.random() * 3)];
  console.log(
    `User1: ${user1} User2: ${user2} Result: ${rpsGame(user1, user2)}`
  );
};

const userArg = process.argv[2];

testGame(userArg);

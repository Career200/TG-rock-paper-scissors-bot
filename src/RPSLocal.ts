import { RPSArr, RPSMatch } from "./logic/RPSMatch.js";

const CLItest = () => {
  const user1 = RPSArr[Math.floor(Math.random() * 3)];
  const user2 = RPSArr[Math.floor(Math.random() * 3)];
  console.log(
    `User1: ${user1} User2: ${user2} Result: ${RPSMatch(user1, user2)}`
  );
};

CLItest();

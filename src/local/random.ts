import {
  getCoinFlipResultText,
  getRandomResultText,
  helpText,
  getDiceResultText
} from "../common.ts";
import {
  diceNotationRegex,
  decodeDiceText,
  getDiceThrows
} from "../logic/index.ts";

const randTest = (msg: string) => {
  if (msg === "flip") {
    console.log(getCoinFlipResultText());
    return;
  }
  if (msg === "help") {
    console.log(helpText);
    return;
  }
  if (msg.startsWith("random")) {
    const match = msg.match(/^random(?: (\d+))?(?: (\d+))?$/i);
    if (!match) return;
    console.log(match);
    console.log(getRandomResultText(parseInt(match[1]), parseInt(match[2])));
    return;
  }
  if (msg.match(diceNotationRegex)) {
    const [amount, diceType] = decodeDiceText(msg);
    const throws = getDiceThrows(amount, diceType);
    console.log(getDiceResultText(amount, diceType, throws));
    return;
  }
  console.log("Unknown command. Use 'help' to see available commands.");
};

const args = process.argv.toSpliced(0, 2).join(" ");

randTest(args);

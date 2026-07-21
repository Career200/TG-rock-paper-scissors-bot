import {
  diceNotationRegex,
  decodeDiceText,
  getDiceThrows
} from "../../../logic/index.ts";
import { getRandomResultText, getDiceResultText } from "../../../common.ts";
import type { RespondFn } from "../../utils.ts";

export const matchRandom: RespondFn = (text) => {
  const randomMatch = text.match(/^random(?: (\d+))?(?: (\d+))?$/i);
  if (randomMatch) {
    return getRandomResultText(
      parseInt(randomMatch[1]),
      parseInt(randomMatch[2])
    );
  }

  const diceMatch = text.match(diceNotationRegex);
  if (diceMatch) {
    const [amount, diceType] = decodeDiceText(text);
    const throws = getDiceThrows(amount, diceType);
    return getDiceResultText(amount, diceType, throws);
  }

  return undefined;
};

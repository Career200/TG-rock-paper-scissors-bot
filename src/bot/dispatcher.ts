import {
  diceNotationRegex,
  decodeDiceText,
  getDiceThrows,
  rpsRegex,
  soloMatch,
  type rpsOption
} from "../logic/index.ts";
import {
  helpText,
  getCoinFlipResultText,
  getRandomResultText,
  getDiceResultText,
  getRpsText
} from "../common.ts";

// Handle normal chat replies and a guest-query answers
export type Responder = {
  text: string;
  reply: (markdown: string) => Promise<void>;
};

type Rule = {
  regex: RegExp;
  handler: (text: string, match: RegExpMatchArray) => string;
};

const rules: Rule[] = [
  {
    regex: /^(?:help|commands)$/i,
    handler: () => helpText
  },
  {
    regex: /^(?:coin|flip|coinflip)$/i,
    handler: () => getCoinFlipResultText()
  },
  {
    regex: /^random(?: (\d+))?(?: (\d+))?$/i,
    handler: (_text, match) =>
      getRandomResultText(parseInt(match[1]), parseInt(match[2]))
  },
  {
    regex: diceNotationRegex,
    handler: (text) => {
      const [amount, diceType] = decodeDiceText(text);
      const throws = getDiceThrows(amount, diceType);
      return getDiceResultText(amount, diceType, throws);
    }
  },
  {
    regex: rpsRegex,
    handler: (_text, match) => {
      const userThrow = match[1] as rpsOption;
      const { result, botThrow } = soloMatch(userThrow);
      return getRpsText(
        result,
        { name: "user", option: userThrow },
        { name: "bot", option: botThrow }
      );
    }
  }
];

export const dispatch = async (responder: Responder) => {
  for (const rule of rules) {
    const match = responder.text.match(rule.regex);
    if (!match) continue;

    await responder.reply(rule.handler(responder.text, match));
    return;
  }
};

import { rpsRegex, soloMatch, type rpsOption } from "../../../logic/index.ts";
import { getRpsText } from "../../../common.ts";
import type { RespondFn } from "../../utils.ts";

export const matchRps: RespondFn = (text) => {
  const match = text.match(rpsRegex);
  if (!match) return undefined;

  const userThrow = match[1] as rpsOption;
  const { result, botThrow } = soloMatch(userThrow);
  return getRpsText(
    result,
    { name: "user", option: userThrow },
    { name: "bot", option: botThrow }
  );
};

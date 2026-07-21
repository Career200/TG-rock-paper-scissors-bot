import { helpText, getCoinFlipResultText } from "../../../common.ts";
import type { RespondFn } from "../../utils.ts";

export const matchStatic: RespondFn = (text) => {
  if (/^(?:help|commands)$/i.test(text)) return helpText;
  if (/^(?:coin|flip|coinflip)$/i.test(text)) return getCoinFlipResultText();
  return undefined;
};

export const stripLeadingMention = (
  text: string,
  entities: readonly { offset: number; length: number; type: string }[] = []
) => {
  const mention = entities.find((e) => e.type === "mention" && e.offset === 0);
  return mention ? text.slice(mention.length).trim() : text;
};

export type RespondFn = (
  text: string
) => string | undefined | Promise<string | undefined>;

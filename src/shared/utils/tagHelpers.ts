export type TagLike = {
  label: string;
  value: string;
};

export const chipStringsToTags = (chips: string[] | undefined): TagLike[] => {
  const rawChips = chips ?? [];
  return rawChips
    .map((chip) => {
      const [rawLabel, rawValue] = chip.split(":");
      const label = rawLabel?.trim();
      const value = rawValue?.trim();
      if (!label || !value) return null;
      return { label, value };
    })
    .filter((tag): tag is TagLike => tag !== null);
};

export const tagsToChipStrings = (tags: TagLike[]): string[] =>
  tags.map((tag) => `${tag.label}: ${tag.value}`);

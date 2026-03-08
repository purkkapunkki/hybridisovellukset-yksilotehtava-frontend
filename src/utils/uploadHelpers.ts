// utility functions used by Upload view and tests

export const normalizeTagNames = (tagString: string): string[] => {
  return tagString
    .split(',')
    .map((tagName) => tagName.trim().toLowerCase())
    .filter((tagName) => tagName.length >= 2 && tagName.length <= 50);
};

export const validateForm = (
  file: File | null,
  title: string,
  tagString: string,
): boolean => {
  if (!file) return false;
  if (title.trim().length <= 3) return false;
  const tagNames = normalizeTagNames(tagString);
  return tagNames.length > 0;
};

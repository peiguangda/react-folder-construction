export const translate = (lang = {}, textKey) => {
  if (lang[textKey] !== undefined) {
    return lang[textKey];
  }
  return textKey;
};

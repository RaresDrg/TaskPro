export function capitalize(text: string) {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(
      /(^|[\s-])(\S)/g,
      (_, separator, letter) => separator + letter.toUpperCase(),
    );
}

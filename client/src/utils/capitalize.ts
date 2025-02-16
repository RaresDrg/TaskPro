/**
 * Capitalizes the first letter of each word in a text.
 *
 * @param text - The input text to be capitalized.
 * @returns The text with the first letter of each word capitalized.
 */

export function capitalize(text: string): string {
  const capitalizedText = text
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return capitalizedText;
}

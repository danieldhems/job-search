
export function sentenceCase(str: string): string {
  const firstChar = str.charAt(0);
  return firstChar.toUpperCase() + str.substring(1);
}
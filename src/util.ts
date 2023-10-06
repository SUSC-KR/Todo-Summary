export function split(text: string | null | undefined, by: string): string[] {
  if (!text) {
    return [];
  }
  return text.split(by);
}

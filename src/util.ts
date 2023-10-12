export function split(text: string | null | undefined, by: string): string[] {
  if (!text) {
    return [];
  }
  return text.split(by);
}

export async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomInt(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from)) + from;
}

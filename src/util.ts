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

export function findOrCreateIfNotExist<T>(params: {
  target: T[];
  predicate: (value: T, idx: number) => boolean;
  create: () => T;
}): T {
  const { target, predicate, create } = params;

  const result: T | undefined = target.find(predicate);
  if (result) {
    return result;
  }

  const newValue = create();
  target.push(newValue);
  return newValue;
}

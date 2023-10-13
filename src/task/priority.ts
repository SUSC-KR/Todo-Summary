export const Priority = {
  highest: 'highest',
  high: 'high',
  normal: 'normal',
  low: 'low',
  lowest: 'lowest',
  none: 'none',
} as const;
export type Priority = (typeof Priority)[keyof typeof Priority];

export const PriorityEmoji: Record<Priority, string> = {
  [Priority.highest]: ':red_square:',
  [Priority.high]: ':orange_square:',
  [Priority.normal]: ':yellow_square:',
  [Priority.low]: ':green_square:',
  [Priority.lowest]: ':blue_square:',
  [Priority.none]: ':white_large_square:',
};

export const PriorityOrder: Record<Priority, number> = {
  [Priority.highest]: 0,
  [Priority.high]: 1,
  [Priority.normal]: 2,
  [Priority.low]: 3,
  [Priority.lowest]: 4,
  [Priority.none]: 5,
};

export const Priority = {
  highest: 'highest',
  high: 'high',
  normal: 'normal',
  low: 'low',
  lowest: 'lowest',
  none: 'none',
} as const;
export type Priority = (typeof Priority)[keyof typeof Priority];

import type { StockData } from './types';

export const findHammers = (data: StockData[]) => {
  return data.filter((sd) => {
    const { o, c, h, l } = sd;
    const body = Math.abs(o - c);
    const upperWick = h - Math.max(o, c);
    const lowerWick = Math.min(o, c) - l;
    const isHammer = upperWick < body && body < lowerWick / 5 && body > h / 300;
    return isHammer;
  });
};

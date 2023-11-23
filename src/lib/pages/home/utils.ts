import type { Source } from './types';

export const sourceToColor = (s: Source) =>
  ({
    [String(s === 'alfacart')]: 'red',
    [String(s === 'alfagift')]: 'red',
    [String(s === 'klikindomaret')]: 'orange',
  }).true;

export const sourceToLabel = (s: Source) =>
  ({
    [String(s === 'alfacart')]: 'Alfamart',
    [String(s === 'alfagift')]: 'Alfamart',
    [String(s === 'klikindomaret')]: 'Indomaret',
  }).true;

export const format = (number: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
    number
  );

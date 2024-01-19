import { HttpStatus } from '@nestjs/common';


type Meta = {
  pagination?: { page: number; count: number; size: number; total: number };
} & Record<string, any>;

//@ts-ignore
BigInt.prototype.toJSON = function () {
  return Number(this.toString());
};

export function ResponseBuilder<T>(
  code: HttpStatus,
  data: T,
  message: string = '',
  meta: Meta = {},
) {
  return { data, code, message, meta };
}

export type Alphabets =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

export function valueToString(val: string | number | null | undefined) {
  if (val === 0 || val === '0') return '';
  else if (typeof val === 'string' || typeof val === 'number')
    return val.toString();
  else return '';
}

export function compareDatesDescending(a: Date, b: Date): number {
  return b.getTime() - a.getTime();
}

export function isValidTime(timeString: string): boolean {
  // Regular expression to match valid time formats (HH:mm or HH:mm:ss)
  const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;

  return timeRegex.test(timeString);
}

export function getDateFromWeekNumber(year: number, weekNumber: number, dayOfWeek: number) {
  var januaryFirst = new Date(year, 0, 1);
  var daysToAdd = (weekNumber - 1) * 7 + (dayOfWeek - januaryFirst.getDay());
  var resultDate = new Date(year, 0, 1 + daysToAdd);
  return resultDate;
}

export function createReference(
  prefix: string,
  suffix: string,
  id: number,
  middleLength: number,
  split: '/' | '-' = '-',
): string {
  const paddedId = id.toString().padStart(middleLength, '0');
  return `${prefix}${split}${paddedId}${suffix.length > 0 ? split : ''
    }${suffix}`;
}

//This function creates a new date then subtracts the number of days from it
export function daysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

export function formatDate(date: Date, format: string): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return format
    .replace('dd', day < 10 ? `0${day}` : day.toString())
    .replace('MM', month < 10 ? `0${month}` : month.toString())
    .replace('yyyy', year.toString())
    .replace('HH', hours < 10 ? `0${hours}` : hours.toString())
    .replace('mm', minutes < 10 ? `0${minutes}` : minutes.toString())
    .replace('ss', seconds < 10 ? `0${seconds}` : seconds.toString());
}
export function customSort(
  arr: string[],
  anchor: string = 'category',
): string[] {
  const nonNumericValues = arr.filter((value) => isNaN(Number(value)));
  const numericValues = arr
    .filter((value) => !isNaN(Number(value)))
    .map((v) => Number(v));

  const sortedNumericValues = numericValues
    .sort((a, b) => (a as number) - (b as number))
    .map((m) => m.toString());
  if (nonNumericValues.includes(anchor)) {
    let oid = nonNumericValues.indexOf(anchor);
    nonNumericValues.splice(oid, 1);
    nonNumericValues.unshift(anchor);
  }
  return [...nonNumericValues, ...sortedNumericValues];
}

export function generateRandomPassword(length: number) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=<>?";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
}
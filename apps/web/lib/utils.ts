import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { fromUnixTime } from "date-fns";
import countryList from "./country-list";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTopNWithOtherSum<T extends any[]>(
  data: T,
  valueKey: keyof T[number],
  groupKey: keyof T[number],
  n: number = 3
) {
  // Sort the data by the selected key in descending order
  const sortedData = [...data].sort((a, b) => b[valueKey] - a[valueKey]);

  // Extract the top N items
  const topN = sortedData.slice(0, n);

  // Aggregate remaining items into 'Other'
  const otherData = sortedData.slice(n);
  const otherValue = otherData.reduce((acc, item) => acc + item[valueKey], 0);

  if (otherData.length > 0) {
    topN.push({ [groupKey]: 'Other', [valueKey]: otherValue } as any);
  }

  return topN;
}

export function getTopNWithOtherAvg<T extends any[]>(
  data: T,
  valueKey: keyof T[number],
  groupKey: keyof T[number],
  n: number = 3,
  order: 'asc' | 'desc' = 'desc'
) {
  // Sort the data by the selected key in descending order
  const sortedData = [...data].sort((a, b) => order == 'desc' ? b[valueKey] - a[valueKey] : a[valueKey] - b[valueKey]);

  // Extract the top N items
  const topN = sortedData.slice(0, n);

  // Aggregate remaining items into 'Other'
  const otherData = sortedData.slice(n);
  const otherValue = otherData.reduce((acc, item) => acc + item[valueKey], 0) / otherData.length;

  if (otherData.length > 0) {
    topN.push({ [groupKey]: 'Other', [valueKey]: otherValue } as any);
  }

  return topN;
}


export function generateInsight<T extends Record<string, any>>(
  data: T[],
  valueKey: keyof T,
  groupKey: keyof T
): string {
  if (data.length === 0) return "No data available.";

  // Find the top category
  const total = data.reduce((acc, item) => acc + item[valueKey], 0);
  const topItem = data[0];
  const topValue = topItem![valueKey];
  const percentage = ((topValue / total) * 100).toFixed(1); // Rounded to 1 decimal place

  return `${percentage}% of ${valueKey.toString()} comes from ${topItem![groupKey]}.`;
}

export function generateLowestBounceRateInsight<T extends Record<string, any>>(
  data: T[],
  valueKey: keyof T,
  groupKey: keyof T
): string {
  if (data.length === 0) return "No data available.";

  // Find the category with the lowest bounce rate
  const sortedData = [...data].sort((a, b) => a[valueKey] - b[valueKey]);
  const lowestItem = sortedData[0];
  return `${lowestItem![groupKey]} has the lowest bounce rate at ${(lowestItem![valueKey] * 100).toFixed(1)}%.`
}

export function generateHighestSessionDurationInsight<T extends Record<string, any>>(
  data: T[],
  valueKey: keyof T,
  groupKey: keyof T
): string {
  if (data.length === 0) return "No data available.";

  // Find the category with the highest session duration
  const sortedData = [...data].sort((a, b) => b[valueKey] - a[valueKey]);
  const highestItem = sortedData[0];

  return `Highest session duration is from ${highestItem![groupKey]} at ${formatDuration(highestItem![valueKey])}.`;
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (remainingSeconds > 0 || parts.length === 0) {
    parts.push(`${remainingSeconds}s`);
  }

  return parts.join(' ');
}

export const getURL = (path: string = '') => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
      process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
      process?.env?.NEXT_PUBLIC_VERCEL_URL &&
        process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
        'http://localhost:3000/';

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, '');
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, '');

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

export function fromUnixTimeOrUndefined(unixTime: number | undefined | null) {
  if (!unixTime) return undefined;

  return fromUnixTime(unixTime);
}


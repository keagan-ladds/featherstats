import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

  return `${percentage}% of ${valueKey.toString()} come(s) from ${topItem![groupKey]}.`;
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
  
  return `Highest ${valueKey.toString()} is from ${highestItem![groupKey]} at ${highestItem![valueKey]} seconds.`;
}


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


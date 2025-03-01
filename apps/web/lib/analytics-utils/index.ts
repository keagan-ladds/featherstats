import { UAParser } from 'ua-parser-js';
import ipAnonymize from 'ip-anonymize';

/**
 * Anonymize an IP address by removing the last octet for IPv4
 * or the last 80 bits for IPv6 (per Google Analytics approach)
 */
export function anonymizeIP(ip: string): string {
  try {
    return ipAnonymize(ip) || 'anonymous';
  } catch (error) {
    // If IP anonymization fails, return a fallback
    return 'anonymous';
  }
}

/**
 * Get the client IP from request headers with support for proxies
 * Returns both actual and anonymized IP addresses
 */
interface IPInfo {
  ip: string;
  anonymizedIp: string;
}

export function getClientIP(headers: Headers): IPInfo {
  const forwardedFor = headers.get('x-forwarded-for');
  const realIp = headers.get('x-real-ip');
  
  let ip = forwardedFor 
    ? forwardedFor.split(',')[0].trim()
    : realIp || 'unknown';

  // Anonymize the IP by removing the last octet for IPv4
  // or the last 80 bits (last 20 characters) for IPv6
  let anonymizedIp = ip;
  if (ip.includes('.')) {
    // IPv4
    anonymizedIp = ip.split('.').slice(0, 3).concat(['0']).join('.');
  } else if (ip.includes(':')) {
    // IPv6
    anonymizedIp = ip.substring(0, ip.length - 20) + ':0000:0000:0000:0000:0000';
  }

  return { ip, anonymizedIp };
}

/**
 * Parse user agent string to get browser, OS, and device information
 */
export function parseUserAgent(userAgent: string | null) {
  if (!userAgent) return null;
  
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();
  
  return {
    browser: {
      name: browser.name || 'unknown',
      version: browser.version || 'unknown'
    },
    os: {
      name: os.name || 'unknown',
      version: os.version || 'unknown'
    },
    device: {
      type: device.type || 'desktop',
      vendor: device.vendor || 'unknown',
      model: device.model || 'unknown'
    }
  };
}

/**
 * Get language preferences from Accept-Language header
 */
export function parseLanguagePreference(acceptLanguage: string | null): string[] {
  if (!acceptLanguage) return ['unknown'];
  
  return acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim())
    .filter(Boolean);
}

/**
 * Clean and normalize referrer URL
 */
export function cleanReferrer(referrer: string | null): string {
  if (!referrer) return 'direct';
  
  try {
    const url = new URL(referrer);
    // Return only the hostname to avoid storing full URLs with query parameters
    return url.hostname;
  } catch {
    return 'invalid';
  }
}

export interface GeoLocation {
  city?: string;
  region?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export interface ClientInfo {
  ip: string;
  location: GeoLocation | null;
  userAgent: any;
  languages: string[];
  referrer: string;
  timestamp: string;
}

export async function getLocationFromIP(ip: string): Promise<GeoLocation | null> {
  try {
    // Skip lookup for localhost/private IPs
    if (ip === '127.0.0.1' || ip === 'localhost' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return null;
    }

    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    if (data.error) {
      console.error('IP Geolocation error:', data);
      return null;
    }

    return {
      city: data.city,
      region: data.region,
      country: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude
    };
  } catch (error) {
    console.error('Failed to get location from IP:', error);
    return null;
  }
}

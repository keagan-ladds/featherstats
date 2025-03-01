import { FeatherstatsClient } from '@repo/analytics-client';

declare const FEATHERSTATS_BASE_URL: string;

declare global {
  interface Window {
    FEATHERSTATS_API_KEY?: string;
    featherstats?: {
      q?: Array<[string, ...any[]]>;
      instance?: FeatherstatsClient;
    };
  }
}

function init() {
  // Get the script tag that loaded this file
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1];
  const apiKey = window.FEATHERSTATS_API_KEY || currentScript.getAttribute('data-api-key');

  if (!apiKey) {
    console.error('Featherstats: No API key provided');
    return;
  }

  // Initialize the client
  const client = new FeatherstatsClient(apiKey, { baseUrl: FEATHERSTATS_BASE_URL });
  client.track('page_hit', {payload: { referrer: document.referrer}});

  // Process any queued commands
  const w = window;
  w.featherstats = w.featherstats || {};
  const q = w.featherstats.q || [];

  // Replace the queue with actual function calls
  w.featherstats = {
    track: (eventName: string, payload?: Object) => client.track(eventName, { payload }),
    instance: client
  };

  // Process any queued commands
  q.forEach(([method, ...args]) => {
    const fn = (w.featherstats as any)[method];
    if (typeof fn === 'function') {
      fn.apply(null, args);
    }
  });
}

// Initialize when the script loads
init();

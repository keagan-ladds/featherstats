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

  const utms = getUTMParameters();
  const defaultPayload = {
    referrer: document.referrer,
    pathname: window.location.pathname,
    utm_source: utms.utm_source,
    utm_medium: utms.utm_medium,
    utm_campaign: utms.utm_campaign,
    utm_term: utms.utm_term,
    utm_content: utms.utm_content
  }

  // Initialize the client
  const client = new FeatherstatsClient(apiKey, { baseUrl: FEATHERSTATS_BASE_URL });
  client.track('page_hit', { payload: defaultPayload });

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


  let pathname = location.pathname;
  window.addEventListener("click", function () {
    if (location.pathname != pathname) {
      pathname = location.pathname;
      client.track('page_hit', {
        payload: {
          ...defaultPayload,
          pathname: pathname
        }
      });
    }
  });

  window.addEventListener("beforeunload", function (event) {
    client.track('page_leave', {
      payload: {
        ...defaultPayload,
        pathname: pathname
      }
    });
    client.cleanup();
  });

}

// Initialize when the script loads
init();

function getUTMParameters() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined
  };
}

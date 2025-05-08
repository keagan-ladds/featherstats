import { nanoid } from 'nanoid'

type EventType = 'page_hit' | 'page_leave' | 'custom_event'

interface FeatherstatsClientConfig {
  batchSize?: number;
  flushInterval?: number;
  baseUrl?: string;
  requeueOnFailure?: boolean;
}

export interface AnalyticsEvent {
  timestamp: string
  sessionId: string
  userId: string;
  eventType: EventType;
  payload: Object;
}

interface UtmParameters {
  utm_source: string | undefined;
  utm_medium: string | undefined,
  utm_campaign: string | undefined,
  utm_term: string | undefined,
  utm_content: string | undefined
}

interface AdAttributionParameters {
  gclid: string | undefined;
  gclsrc: string | undefined;
  fbclid: string | undefined;
  msclkid: string | undefined;
  ttclid: string | undefined;
  li_fat_id: string | undefined;
  wbraid: string | undefined;
  gbraid: string | undefined;
}

export interface EventOptions {
  revenue?: {
    amount: number,
    currency?: string
  },
  properties?: Record<string, any>,
  flush?: boolean
}

const DEFAULT_CONFIG: Required<FeatherstatsClientConfig> = {
  batchSize: 10,
  flushInterval: 5000,
  baseUrl: 'https://app.featherstats.com',
  requeueOnFailure: false
};

export class FeatherstatsClient {
  private eventQueue: AnalyticsEvent[] = [];
  private readonly config: Required<FeatherstatsClientConfig>;
  private readonly apiKey: string;
  private readonly userId: string;
  private readonly utmParameters: UtmParameters;
  private readonly adParameters: AdAttributionParameters;
  private flushTimeout?: NodeJS.Timeout;
  private isDestroyed: boolean = false;
  private lastPageHit: number = Date.now();

  public constructor(apiKey: string, config?: FeatherstatsClientConfig) {
    this.apiKey = apiKey;
    this.userId = this.getUserId();
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.utmParameters = this.getUtmParameters();
    this.adParameters = this.getAdAttributionParameters();
    this.startFlushInterval();
    this.registerEventHandlers();
  }

  public async track(
    eventType: EventType,
    eventName?: string,
    options: EventOptions = {}
  ): Promise<void> {
    if (this.isDestroyed) {
      console.warn('Attempting to track event on destroyed telemetry service');
      return;
    }

    if (eventType === "custom_event" && !eventName) {
      console.warn('Attempting to track custom event without event name.');
      return;
    }

    if (eventType === "page_hit") {
      this.lastPageHit = Date.now()
    }

    const defaultPayload = this.getDefaultPayload(eventType);
    const event: AnalyticsEvent = {
      eventType,
      sessionId: this.getSessionId(),
      userId: this.userId,
      timestamp: new Date().toISOString(),
      payload: {
        ...defaultPayload,
        eventName: eventName,
        properties: options.properties,
        revenue: options.revenue
      }
    };

    this.eventQueue.push(event);

    if (options.flush || this.eventQueue.length >= this.config.batchSize) {
      await this.flush();
    }
  }


  public async flush(): Promise<void> {
    if (this.eventQueue.length === 0 || this.isDestroyed) return;

    const events = [...this.eventQueue];
    this.eventQueue = [];

    try {
      await this.sendEvents(events);
    } catch (error) {
      console.error('Failed to send telemetry events:', error);
      if (!this.isDestroyed && this.config.requeueOnFailure) {
        this.eventQueue = [...events, ...this.eventQueue];
      }
    }
  }

  public cleanup(): void {
    this.isDestroyed = true;

    // Flush any remaining events
    this.flush().catch(error => {
      console.error('Error in cleanup flush:', error);
    });

    if (this.flushTimeout) {
      clearInterval(this.flushTimeout);
      this.flushTimeout = undefined;
    }
  }

  private registerEventHandlers(): void {
    var client = this;
    function trackPageHit() {
      client.track('page_hit');
    }

    function trackPageLeave() {
      client.track('page_leave');
      client.flush();
    }

    window.addEventListener("beforeunload", function (event) {
      trackPageLeave();
    });

    document.addEventListener("visibilitychange", function logData() {
      if (document.visibilityState === "visible") {
        trackPageHit();
      } else if (document.visibilityState === "hidden") {
        trackPageLeave();
      }
    });

    // Handle back/forward navigation
    window.addEventListener("popstate", function () {
      trackPageLeave(); // Trigger page leave for the current page
      setTimeout(trackPageHit, 0); // Track new page view
    });

    // Intercept pushState and replaceState to track navigation
    function wrapHistoryMethod(method: 'pushState' | 'replaceState') {
      const original = history[method];
      history[method] = function (...args) {
        trackPageLeave(); // Track leave before changing route
        setTimeout(trackPageHit, 0); // Track new page hit
        return original.apply(this, args);
      };
    }
    wrapHistoryMethod('pushState');
    wrapHistoryMethod('replaceState');
  }

  private getUtmParameters() {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || undefined,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
      utm_term: params.get('utm_term') || undefined,
      utm_content: params.get('utm_content') || undefined
    };
  }

  private getAdAttributionParameters(): AdAttributionParameters {
    const sessionParams = sessionStorage.getItem('_adp');
    if (sessionParams) {
      return JSON.parse(sessionParams)
    }


    const params = new URLSearchParams(window.location.search);
    const adParams = {
      gclid: params.get('gclid') || undefined,
      wbraid: params.get('wbraid') || undefined,
      gbraid: params.get('gbraid') || undefined,
      gclsrc: params.get('gclsrc') || undefined,
      fbclid: params.get('fbclid') || undefined,
      msclkid: params.get('msclkid') || undefined,
      ttclid: params.get('ttclid') || undefined,
      li_fat_id: params.get('li_fat_id') || undefined
    };

    sessionStorage.setItem('_adp', JSON.stringify(adParams));

    return adParams;
  }

  private async sendEvents(events: AnalyticsEvent[]): Promise<void> {
    await fetch(`${this.config.baseUrl}/api/v1/collect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': this.apiKey
      },
      body: JSON.stringify({ events }),
    });
  }



  private getDefaultPayload(eventType: string) {
    const pageLeavePayload = {
      duration: Date.now() - this.lastPageHit
    }

    return {
      referrer: this.getReferrer(),
      pathname: window.location.pathname,
      utm_source: this.utmParameters.utm_source,
      utm_medium: this.utmParameters.utm_medium,
      utm_campaign: this.utmParameters.utm_campaign,
      utm_term: this.utmParameters.utm_term,
      utm_content: this.utmParameters.utm_content,
      ad_params: this.adParameters,
      ...(eventType === "page_leave" && pageLeavePayload || {})
    }
  }

  private startFlushInterval(): void {
    // Clear any existing interval
    if (this.flushTimeout) {
      clearInterval(this.flushTimeout);
    }

    // Start new interval
    this.flushTimeout = setInterval(() => {
      if (!this.isDestroyed) {
        this.flush().catch(error => {
          console.error('Error in flush interval:', error);
        });
      }
    }, this.config.flushInterval);

    // Ensure the interval doesn't prevent the process from exiting
    if (this.flushTimeout.unref) {
      this.flushTimeout.unref();
    }
  }

  private getSessionId(sessionDurationMinutes: number = 30): string {
    const now = Date.now();
    let sessionId = sessionStorage.getItem('_sid');
    let expiryTime = sessionStorage.getItem('_sxp');

    if (sessionId && expiryTime) {
      if (now < parseInt(expiryTime)) {
        return sessionId;
      }
    }

    sessionId = nanoid();
    expiryTime = (now + sessionDurationMinutes * 60 * 1000).toString();
    sessionStorage.setItem('_sid', sessionId);
    sessionStorage.setItem('_sxp', expiryTime);
    return sessionId;
  }

  private getReferrer() {
    let sessionReferrer = sessionStorage.getItem('_rfk');
    if (sessionReferrer) {
      return sessionReferrer;
    }

    sessionReferrer = document.referrer;

    sessionStorage.setItem('_rfk', sessionReferrer);
    return sessionReferrer;
  }

  private getUserId(): string {
    let userId = localStorage.getItem('userId');
    if (userId) return userId;

    userId = nanoid();
    localStorage.setItem('userId', userId);
    return userId;
  }
}

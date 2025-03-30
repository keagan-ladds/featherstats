import { nanoid } from 'nanoid'

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
  eventType: string;
  payload: Object;
}

interface UtmParameters {
  utm_source: string | undefined;
  utm_medium: string | undefined,
  utm_campaign: string | undefined,
  utm_term: string | undefined,
  utm_content: string | undefined
}

interface EventOptions {
  payload?: Object
}

const DEFAULT_CONFIG: Required<FeatherstatsClientConfig> = {
  batchSize: 10,
  flushInterval: 5000,
  baseUrl: 'http://localhost:3000',
  requeueOnFailure: false
};

export class FeatherstatsClient {
  private eventQueue: AnalyticsEvent[] = [];
  private readonly config: Required<FeatherstatsClientConfig>;
  private readonly apiKey: string;
  private readonly userId: string;
  private readonly utmParameters: UtmParameters;
  private flushTimeout?: NodeJS.Timeout;
  private isDestroyed: boolean = false;
  private lastPageHit: number = Date.now();

  public constructor(apiKey: string, config?: FeatherstatsClientConfig) {
    this.apiKey = apiKey;
    this.userId = this.getUserId();
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.utmParameters = this.getUtmParameters();
    this.startFlushInterval();
    this.registerEventHandlers();
  }

  public async track(
    eventType: string,
    options: EventOptions = {}
  ): Promise<void> {
    if (this.isDestroyed) {
      console.warn('Attempting to track event on destroyed telemetry service');
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
        ...options.payload || {}
      }
    };

    this.eventQueue.push(event);

    if (this.eventQueue.length >= this.config.batchSize) {
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
    window.addEventListener("beforeunload", function (event) {
      client.track('page_leave');
      client.flush();
    });

    document.addEventListener("visibilitychange", function logData() {
      if (document.visibilityState === "visible") {
        client.track('page_hit');
      } else if (document.visibilityState === "hidden") {
        client.track('page_leave');
        client.flush();
      }
    });
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
      referrer: document.referrer,
      pathname: window.location.pathname,
      utm_source: this.utmParameters.utm_source,
      utm_medium: this.utmParameters.utm_medium,
      utm_campaign: this.utmParameters.utm_campaign,
      utm_term: this.utmParameters.utm_term,
      utm_content: this.utmParameters.utm_content,
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
    let sessionId = sessionStorage.getItem('sessionId');
    let expiryTime = sessionStorage.getItem('sessionIdExpiry');

    if (sessionId && expiryTime) {
      if (now < parseInt(expiryTime)) {
        return sessionId;
      }
    }

    sessionId = nanoid();
    expiryTime = (now + sessionDurationMinutes * 60 * 1000).toString();
    sessionStorage.setItem('sessionId', sessionId);
    sessionStorage.setItem('sessionIdExpiry', expiryTime);
    return sessionId;
  }

  private getUserId(): string {
    let userId = localStorage.getItem('userId');
    if (userId) return userId;

    userId = nanoid();
    localStorage.setItem('userId', userId);
    return userId;
  }
}

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

interface EventOptions {
    payload?: Object
}

const DEFAULT_CONFIG: Required<FeatherstatsClientConfig> = {
  batchSize: 10,
  flushInterval: 5000, // 10 seconds
  baseUrl: 'http://localhost:3000',
  requeueOnFailure: false
};

export class FeatherstatsClient {
  private eventQueue: AnalyticsEvent[] = [];
  private readonly config: Required<FeatherstatsClientConfig>;
  private readonly apiKey: string;
  private readonly userId: string;
  private flushTimeout?: NodeJS.Timeout;
  private isDestroyed: boolean = false;

  public constructor(apiKey: string, config?: FeatherstatsClientConfig) {
    this.apiKey = apiKey;
    this.userId = this.getUserId();
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.startFlushInterval();
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

  public async track(
    eventType: string,
    options: EventOptions = {}
  ): Promise<void> {
    if (this.isDestroyed) {
      console.warn('Attempting to track event on destroyed telemetry service');
      return;
    }

    const event: AnalyticsEvent = {
        eventType,
        sessionId: this.getSessionId(),
        userId: this.userId,
        timestamp: new Date().toISOString(),
        payload: options.payload || {}
    };

    this.eventQueue.push(event);

    if (this.eventQueue.length >= this.config.batchSize) {
      await this.flush();
    }
  }

  private async flush(): Promise<void> {
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
}

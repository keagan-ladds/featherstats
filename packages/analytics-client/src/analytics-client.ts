import { nanoid } from 'nanoid'

interface FeatherstatsClientConfig {
    batchSize?: number;
    flushInterval?: number;
    baseUrl?: string;
}


export interface AnalyticsEvent {
    timestamp: string
    sessionId: string
    eventType: string;
    payload: Object;
}

interface EventOptions {
    payload?: Object
}

const DEFAULT_CONFIG: Required<FeatherstatsClientConfig> = {
  batchSize: 10,
  flushInterval: 5000, // 5 seconds
  baseUrl: 'https://featherstats.com'
};

export class FeatherstatsClient {
  private eventQueue: AnalyticsEvent[] = [];
  private readonly config: Required<FeatherstatsClientConfig>;
  private readonly apiKey: string;
  private readonly sessionId: string;
  private flushTimeout?: NodeJS.Timeout;
  private isDestroyed: boolean = false;

  public constructor(apiKey: string, config?: FeatherstatsClientConfig) {
    this.apiKey = apiKey;
    this.sessionId = this.getSessionId();
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.startFlushInterval();
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('sessionId');
    if (sessionId) return sessionId;

    sessionId = nanoid();
    sessionStorage.setItem('sessionId', sessionId);
    return sessionId;
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
        sessionId: this.sessionId,
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
      if (!this.isDestroyed) {
        // Only requeue if service is not destroyed
        this.eventQueue = [...events, ...this.eventQueue];
      }
    }
  }

  private async sendEvents(events: AnalyticsEvent[]): Promise<void> {
    await fetch(`${this.config.baseUrl}/api/v1/event`, {
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

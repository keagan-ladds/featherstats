export type TopLocationsData = {
    country: string;
    city: string;
    visits: number;
    hits: number;
}[]

export interface TopPagesData {
    pathname: string;
    visits: number;
    hits: number;
}

export interface KeyMetricsData {
    date: Date;
    visits: number;
    pageviews: number;
    bounce_rate: number;
    avg_session_sec: number
}
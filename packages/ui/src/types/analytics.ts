export type TopLocationsData = {
    country: string;
    city: string;
    visits: number;
    hits: number;
}[]

export type TopPagesData = {
    pathname: string;
    visits: number;
    hits: number;
}[]

export type TopSourcesData = {
    referrer: string;
    visits: number;
    hits: number;
}[]

export type KeyMetricsData = {
    date: Date;
    visits: number;
    pageviews: number;
    bounce_rate: number;
    avg_session_sec: number
}[]
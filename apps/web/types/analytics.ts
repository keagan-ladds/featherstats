export type CountrySummaryData = {
    country: string;
    visits: number;
    pageviews: number;
}[]

export type CitySummaryData = {
    city: string;
    country: string;
    visits: number;
    pageviews: number;
}[]

export type PageSummaryData = {
    pathname: string;
    visits: number;
    pageviews: number;
}[]

export type SourceSummaryData = {
    source: string;
    referrer: string;
    visits: number;
    pageviews: number;
}[]

export type ChannelSummaryData = {
    channel: string;
    visits: number;
    pageviews: number;
}[]

export type KeyMetricsData = {
    date: Date;
    visits: number;
    pageviews: number;
    bounce_rate: number;
    avg_session_sec: number
}[]

export type DeviceSummaryData = {
    device: string;
    visits: number;
    pageviews: number;
}[]

export type BrowserSummaryData = {
    browser: string;
    visits: number;
    pageviews: number;
}[]

export type OperatingSystemSummaryData = {
    os: string;
    visits: number;
    pageviews: number
}[]

export type SourceDetailsData = {
    source: string;
    referrer: string;
    visits: number;
    pageviews: number;
    bounce_rate: number;
    avg_session_sec: number;
}[]

export type PageDetailsData = {
    pathname: string;
    visits: number;
    pageviews: number;
    bounce_rate: number;
    avg_session_sec: number;
}[]


export type CityDetailsData = {
    city: string;
    country: string;
    visits: number;
    hits: number;
}[]

export type BrowserDetailsData = {
    browser: string;
    visits: number;
    pageviews: number;
    bounce_rate: number;
    avg_session_sec: number;
}[]

export type DeviceDetailsData = {
    device: string;
    visits: number;
    pageviews: number;
    bounce_rate: number;
    avg_session_sec: number;
}[]

export type OsDetailsData = {
    os: string;
    visits: number;
    pageviews: number;
    bounce_rate: number;
    avg_session_sec: number;
}[]

export type CountryDetailsData = {
    country: string;
    visits: number;
    pageviews: number;
    bounce_rate: number;
    avg_session_sec: number;
}[]

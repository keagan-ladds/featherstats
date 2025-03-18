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

export type TopDevicesData = {
    device: string;
    visits: number;
    hits: number;
}[]

export type TopBrowsersData = {
    browser: string;
    visits: number;
    hits: number;
}[]

export type TopOperatingSystemsData = {
    os: string;
    visits: number;
    hits: number
}[]

export type SourceDetailsData = {
    referrer: string;
    visits: number;
    hits: number;
    bounce_rate: number;
    avg_session_sec: number;
}[]

export type PageDetailsData = {
    pathname: string;
    visits: number;
    hits: number;
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

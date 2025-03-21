import countryList from "./country-list";

export function formatCountryCode(countryCode: string): string {
    return countryList[countryCode as keyof typeof countryList];
}
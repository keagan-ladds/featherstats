import countryList from "./country-list";

export function formatCountryCode(countryCode: string): string {
    return countryList[countryCode as keyof typeof countryList];
}

export const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
    }).format(amount / 100)
}

export const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
}
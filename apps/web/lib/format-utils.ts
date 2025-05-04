import countryList from "./country-list";

export function formatCountryCode(countryCode: string): string {
    return countryList[countryCode as keyof typeof countryList] || countryCode;
}

export const formatCurrency = (amount: number, currency: string) => {
    const locale = Intl.NumberFormat().resolvedOptions().locale
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
    }).format(amount / 100)
}

export const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
}
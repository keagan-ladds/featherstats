import countryList from "./country-list";

export function formatCountryCode(countryCode: string): string {
    return countryList[countryCode as keyof typeof countryList];
}

export const formatCurrency = (amount: number, current: string) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: current,
        minimumFractionDigits: 0,
    }).format(amount / 100)
}
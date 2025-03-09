import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@repo/ui/components/ui/table";
import { TopLocationsData } from "@repo/ui/types/analytics";

interface TopLocationsCardProps {
    data: TopLocationsData | null
    loading?: boolean;
    error?: Error | null
}
export default function TopLocationsCard({ data }: TopLocationsCardProps) {

    const aggregatedByCountry = aggregateByCountry(data);
    const aggregateddByCity = aggregateByCity(data);

    return <>
        <Card>
            <Tabs defaultValue="country" >
                <CardHeader>
                    <div className="w-full flex items-center">
                        <CardTitle className="h-9">Top Locations</CardTitle>
                        <TabsList className="ml-auto" >
                            <TabsTrigger value="country">Country</TabsTrigger>
                            <TabsTrigger value="city">City</TabsTrigger>
                        </TabsList>
                    </div>
                </CardHeader>
                <CardContent>
                    <TabsContent value="country">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Country</TableHead>
                                    <TableHead className="w-[100px] text-right">Visitors</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {aggregatedByCountry.map((country, i) => <TableRow key={i}>
                                    <TableCell className="font-medium">{country.country}</TableCell>
                                    <TableCell className="text-right">{country.visits}</TableCell>
                                </TableRow>)}

                            </TableBody>
                        </Table>
                    </TabsContent>

                    <TabsContent value="city">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>City</TableHead>
                                    <TableHead className="w-[100px] text-right">Visitors</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {aggregateddByCity?.map((item, i) => <TableRow key={i}>
                                    <TableCell className="font-medium">{item.city || 'Unknown'}</TableCell>
                                    <TableCell className="text-right">{item.visits}</TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
    </>
}

type AggregatedCountryData = {
    country: string;
    visits: number;
    hits: number;
}[];

type AggregatedCityData = {
    city: string;
    visits: number;
    hits: number;
}[];

/**
 * Aggregates location data by country, keeping the maximum visits and hits for each country
 * @param data - Array of location data or null/undefined
 * @returns Aggregated data by country
 */
function aggregateByCountry(data: TopLocationsData | null | undefined): AggregatedCountryData {
    // Handle null or empty array
    if (!data || !Array.isArray(data) || data.length === 0) {
        return [];
    }

    // Create a map to track max values per country
    const countryMap = new Map<string, { country: string; visits: number; hits: number }>();

    // Process each location entry
    for (const location of data) {
        const { country, visits, hits } = location;

        if (!countryMap.has(country)) {
            // First entry for this country
            countryMap.set(country, { country, visits, hits });
        } else {
            // Update only if current values are higher than stored values
            const current = countryMap.get(country)!;
            countryMap.set(country, {
                country,
                visits: Math.max(current.visits, visits),
                hits: Math.max(current.hits, hits)
            });
        }
    }

    // Convert map to array of results
    return Array.from(countryMap.values());
}

/**
 * Aggregates location data by city, keeping the maximum visits and hits for each country
 * @param data - Array of location data or null/undefined
 * @returns Aggregated data by city
 */
function aggregateByCity(data: TopLocationsData | null | undefined): AggregatedCityData {
    // Handle null or empty array
    if (!data || !Array.isArray(data) || data.length === 0) {
        return [];
    }

    // Create a map to track max values per country
    const cityMap = new Map<string, { city: string; visits: number; hits: number }>();

    // Process each location entry
    for (const location of data) {
        const { city, visits, hits } = location;

        if (!cityMap.has(city)) {
            // First entry for this country
            cityMap.set(city, { city, visits, hits });
        } else {
            // Update only if current values are higher than stored values
            const current = cityMap.get(city)!;
            cityMap.set(city, {
                city,
                visits: Math.max(current.visits, visits),
                hits: Math.max(current.hits, hits)
            });
        }
    }

    // Convert map to array of results
    return Array.from(cityMap.values());
}
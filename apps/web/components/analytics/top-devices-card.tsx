import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@repo/ui/components/ui/table";
import { TopLocationsData } from "@repo/ui/types/analytics";
import { useAnalytics } from "hooks/use-analytics";
import AnalyticsLoader from "./analytics-loader";


export default function TopDevicesCard() {
    const { topDevices, topBrowsers, topOperatingSystems } = useAnalytics();
    return <>
        <Card className="min-h-[310px]">
            <Tabs defaultValue="browser" >
                <CardHeader>
                    <div className="w-full flex items-center">
                        <CardTitle>Top Devices</CardTitle>
                        <TabsList className="ml-auto" >
                            <TabsTrigger value="browser">Browser</TabsTrigger>
                            <TabsTrigger value="os">OS</TabsTrigger>
                            <TabsTrigger value="device">Device Type</TabsTrigger>
                        </TabsList>
                    </div>
                </CardHeader>
                <CardContent>
                    <TabsContent value="browser">
                        <AnalyticsLoader {...topBrowsers}>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Country</TableHead>
                                        <TableHead className="w-[100px] text-right">Visitors</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topBrowsers.data.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium">{item.browser}</TableCell>
                                            <TableCell className="text-right">{item.visits}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </AnalyticsLoader>

                    </TabsContent>

                    <TabsContent value="os">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Operating System</TableHead>
                                    <TableHead className="w-[100px] text-right">Visitors</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topOperatingSystems.data.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">{item.os}</TableCell>
                                        <TableCell className="text-right">{item.visits}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>

                    <TabsContent value="device">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Device Type</TableHead>
                                    <TableHead className="w-[100px] text-right">Visitors</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topDevices.data.map((device, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">{device.device}</TableCell>
                                        <TableCell className="text-right">{device.visits}</TableCell>
                                    </TableRow>
                                ))}
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
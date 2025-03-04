'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@repo/ui/components/ui/table";
import { TopPagesData } from "@repo/ui/types/analytics";
import { useAnalytics } from "hooks/use-analytics";
import AnalyticsLoader from "./analytics-loader";

export interface TopPagesCardProps {

}

export default function TopPagesCard({ }: TopPagesCardProps) {
    const { topPages } = useAnalytics()

    return <>
        <Card className="min-h-[380px]">
            <Tabs defaultValue="top_pages">
                <CardHeader>
                    <div className="w-full flex items-center">
                        <CardTitle>Top Pages</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <TabsContent value="top_pages">
                        <AnalyticsLoader {...topPages}>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Page Url</TableHead>
                                        <TableHead className="w-[100px] !text-right" align="right">Visitors</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topPages.data?.map((page, i) => <TableRow key={i}>
                                        <TableCell>{page.pathname}</TableCell>
                                        <TableCell align="right">{page.visits}</TableCell>
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </AnalyticsLoader>
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
    </>
}
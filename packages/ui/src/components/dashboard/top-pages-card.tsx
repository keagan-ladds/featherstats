'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { TopPagesData } from "@/types/analytics";

export interface TopPagesCardProps {
    data: TopPagesData | null
    loading?: boolean
    error?: Error | null
}

export default function TopPagesCard({ data, loading }: TopPagesCardProps) {
    return <>
        <Card className="ui-min-h-[380px]">
            <Tabs defaultValue="top_pages">
                <CardHeader>
                    <div className="ui-w-full ui-flex ui-items-center">
                        <CardTitle>Top Pages</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <TabsContent value="top_pages">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Page Url</TableHead>
                                    <TableHead className="ui-w-[100px] ui-text-right">Visitors</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.map((page, i) => <TableRow key={i}>
                                    <TableCell>{page.pathname}</TableCell>
                                    <TableCell className="ui-text-right">{page.visits}</TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
    </>
}
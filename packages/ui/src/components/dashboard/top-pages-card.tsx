'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

export interface TopPagesCardProps {
    data: {
        pathname: string,
        visits: number,
        hits: number
    }[],
    loading?: boolean
}

export default function TopPagesCard({ data, loading }: TopPagesCardProps) {
    return <>
        <Card>
            <Tabs defaultValue="top_pages">
                <CardHeader>
                    <div className="ui-w-full ui-flex ui-items-center">
                        <CardTitle>Top Pages</CardTitle>
                        <TabsList className="ui-ml-auto">
                            <TabsTrigger value="top_pages">Pages</TabsTrigger>
                        </TabsList>
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
                                {data.map((page, i) => <TableRow key={i}>
                                    <TableCell>{page.pathname}</TableCell>
                                    <TableCell className="ui-text-right">{page.visits}</TableCell>
                                </TableRow>)}

                            </TableBody>
                        </Table>
                        {loading && <div className="ui-gap-1 ui-flex ui-flex-col">
                            {[...Array(10)].map((_, i) => <Skeleton className="ui-h-8 ui-w-full" key={i} />)}
                        </div>}
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
    </>
}
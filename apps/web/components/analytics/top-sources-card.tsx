import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@repo/ui/components/ui/table";
import { TopSourcesData } from "@repo/ui/types/analytics";


interface TopSourcesCardProps {
    data: TopSourcesData;
    loading: boolean;
    error?: Error | null
}

export default function TopSourcesCard({ data, loading }: TopSourcesCardProps) {
    return <>
        <Card className="min-h-[380px]">
            <Tabs defaultValue="sources">
                <CardHeader>
                    <div className="w-full flex items-center">
                        <CardTitle>Top Sources</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <TabsContent value="sources">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Source</TableHead>
                                    <TableHead className="w-[100px] text-right">Visitors</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((source, i) => <TableRow key={i}>
                                    <TableCell className="font-medium">{source.referrer}</TableCell>
                                    <TableCell className="text-right">{source.visits}</TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
    </>
}
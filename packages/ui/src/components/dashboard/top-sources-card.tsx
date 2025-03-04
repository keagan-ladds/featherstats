import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { TopSourcesData } from "@/types/analytics";


interface TopSourcesCardProps {
    data: TopSourcesData;
    loading: boolean;
    error?: Error | null
}

export default function TopSourcesCard({ data, loading }: TopSourcesCardProps) {
    return <>
        <Card className="ui-min-h-[380px]">
            <Tabs defaultValue="sources">
                <CardHeader>
                    <div className="ui-w-full ui-flex ui-items-center">
                        <CardTitle>Top Sources</CardTitle>
                        <TabsList className="ui-ml-auto">
                            <TabsTrigger value="sources">Sources</TabsTrigger>
                            <TabsTrigger value="devices">Devices</TabsTrigger>
                        </TabsList>
                    </div>
                </CardHeader>
                <CardContent>
                    <TabsContent value="sources">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Source</TableHead>
                                    <TableHead className="ui-w-[100px] ui-text-right">Visitors</TableHead>
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
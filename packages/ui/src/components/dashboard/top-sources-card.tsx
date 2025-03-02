import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";


export default function TopSourcesCard() {
    return <>
        <Card>
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
                                    <TableHead className="w-[100px] !text-right">Visitors</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">INV001</TableCell>
                                    <TableCell className="text-right">$250.00</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TabsContent>

                </CardContent>
            </Tabs>
        </Card>
    </>
}
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/ui/chart"
import React from "react"
import { Cell, Label, Pie, PieChart } from "recharts"
import { BrowserDetailsData } from "types/analytics"

interface Props {
    data: BrowserDetailsData
    loading?: boolean
}

export function getTop3WithOther(
    data: BrowserDetailsData,
    key: keyof Omit<BrowserDetailsData[number], 'browser'>
) {
    // Sort the data by the selected key in descending order
    const sortedData = [...data].sort((a, b) => b[key] - a[key]);
    
    // Extract the top 3 items
    const top3 = sortedData.slice(0, 3);
    
    // Aggregate remaining items into 'Other'
    const otherData = sortedData.slice(3);
    const otherValue = otherData.reduce((acc, item) => acc + item[key], 0);
    
    if (otherData.length > 0) {
        top3.push({ browser: 'Other', [key]: otherValue } as any);
    }
    
    return top3;
}


export default function BrowserSessionsChart({ data, loading }: Props) {

    const chartConfig = {
        sessions: {
            label: "Sessions",
        },
    } satisfies ChartConfig

    const chartData = React.useMemo(() => {
        return getTop3WithOther(data, "visits")
    }, [data])

    const totalSessions = React.useMemo(() => {
        return data.reduce((acc, curr) => acc + curr.visits, 0)
    }, [data])

    return <>
        <Card className="flex flex-col">
            <CardHeader className="items-center !pb-0">
                <CardTitle>Sessions By Browser</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 !p-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto !aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visits"
                            nameKey="browser"
                            fillRule="evenodd"
                            innerRadius={60}
                            strokeWidth={5}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index+1}))`} />
                            ))}
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalSessions.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Sessions
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter> */}
        </Card>
    </>
}
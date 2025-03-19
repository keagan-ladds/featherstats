import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/ui/chart"
import { generateInsight, getTopNWithOtherAvg, getTopNWithOtherSum } from "lib/utils"
import { Lightbulb } from "lucide-react"
import React from "react"
import { Cell, Label, LabelList, Pie, PieChart } from "recharts"

interface Props<T extends any[]> {
    data: T
    loading?: boolean
    groupKey: keyof T[number]
}


export default function PageViewsChart<T extends any[]>({ data, loading, groupKey }: Props<T>) {

    const chartConfig = {
        sessions: {
            label: "Sessions",
        }
    } satisfies ChartConfig

    const chartData = React.useMemo(() => {
        return getTopNWithOtherAvg(data, "pageviews", groupKey)
    }, [data])

    const totalPageViews = React.useMemo(() => {
        return data.reduce((acc, curr) => acc + curr.pageviews, 0)
    }, [data])

    const insightText = React.useMemo(() => {
        return generateInsight(chartData, "pageviews", groupKey)
    }, [data])

    return <>
        <Card className="flex flex-col">
            <CardHeader className="items-center !pb-0">
                <CardTitle>Page Views</CardTitle>
                <CardDescription>Total pages viewed by users</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 !p-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto !aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel nameKey={groupKey as string} />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="pageviews"
                            nameKey={groupKey as string}
                            fillRule="evenodd"
                            innerRadius={60}
                            strokeWidth={0}>
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
                                                    {totalPageViews.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Page Views
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
            <CardFooter className="flex-col gap-2 !text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    <Lightbulb className="h-4 w-4 flex-shrink-0" /> {insightText}
                </div>
            </CardFooter>
        </Card>
    </>
}
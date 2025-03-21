import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/ui/chart"
import LearningTooltip from "components/learning-tooltip"
import { group } from "console"
import { generateInsight, getTopNWithOtherSum } from "lib/utils"
import { Lightbulb, TrendingUp } from "lucide-react"
import React from "react"
import { Cell, Label, LabelList, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

interface Props<T extends any[]> {
    data: T
    loading?: boolean
    groupKey: keyof T[number]
    groupFormatter?: (name: any) => string;
}

const DefaultGroupFormatter = (value: any) => value;

export default function VisitsChart<T extends any[]>({ data, loading, groupKey, groupFormatter = DefaultGroupFormatter }: Props<T>) {

    const chartConfig = {
        sessions: {
            label: "Sessions",
        },
    } satisfies ChartConfig

    const chartData = React.useMemo(() => {
        return getTopNWithOtherSum(data, "visits", groupKey)
    }, [data])

    const totalSessions = React.useMemo(() => {
        return data.reduce((acc, curr) => acc + curr.visits, 0)
    }, [data])

    const insightText = React.useMemo(() => {
        return generateInsight(chartData, "visits", groupKey)
    }, [data])

    return <>
        <Card className="flex flex-col">
            <CardHeader className="items-center !pb-0">
                <CardTitle className="flex items-center gap-2">Visits <LearningTooltip description="This chart displays the distribution of total visits across different traffic segments, providing insights into where your users are coming from." /></CardTitle>
                <CardDescription>Total number of site visits</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 !p-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto !aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel nameFormatter={groupFormatter} />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visits"
                            nameKey={groupKey as string}
                            fillRule="evenodd"
                            innerRadius={60}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
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
                                                    Visits
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
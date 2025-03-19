import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/ui/chart"
import { formatDuration, getTopNWithOtherAvg } from "lib/utils"
import React from "react"
import { Bar, BarChart, CartesianGrid, Cell, Label, LabelList, Pie, PieChart, RadialBar, RadialBarChart, XAxis } from "recharts"
import { BrowserDetailsData, OsDetailsData } from "types/analytics"


interface Props<T extends any[]> {
    data: T
    loading?: boolean
    groupKey: keyof T[number]
}

export default function SessionDurationChart<T extends any[]>({ data, loading, groupKey }: Props<T>) {

    const chartData = React.useMemo(() => {
        return getTopNWithOtherAvg(data, "avg_session_sec", groupKey).map((item, index) => ({
            ...item,
            fill: `hsl(var(--chart-${index + 1}))`,
        }))
    }, [data])

    const chartConfig = React.useMemo(() => {

        return chartData.reduce((config, item) => {
            return {
                ...config,
                [item[groupKey]]: {
                    label: item[groupKey]
                }
            }
        }, {}) satisfies ChartConfig;
    }, [chartData])

    return <>
        <Card className="flex flex-col">
            <CardHeader className="items-center !pb-0">
                <CardTitle>Avg. Session Duration</CardTitle>
                <CardDescription>Average time spent per session</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 !p-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto !aspect-square max-h-[250px]"
                >
                    <BarChart accessibilityLayer data={chartData} dataKey={"avg_session_sec"}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={groupKey as string}
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig].label
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent nameKey={groupKey as string} valueFormatter={(value) => formatDuration(value as number)}  />}
                        />
                        <Bar
                            dataKey={"avg_session_sec"}

                            strokeWidth={2}
                            radius={8}
                            activeIndex={2}
                        />
                    </BarChart>
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
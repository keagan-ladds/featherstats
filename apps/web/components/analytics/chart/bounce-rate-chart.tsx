import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/ui/chart"
import { generateLowestBounceRateInsight, getTopNWithOtherAvg } from "lib/utils"
import { Lightbulb } from "lucide-react"
import React from "react"
import { Bar, BarChart, CartesianGrid, Cell, Label, LabelList, Pie, PieChart, PolarAngleAxis, RadialBar, RadialBarChart, XAxis } from "recharts"

interface Props<T extends any[]> {
    data: T
    loading?: boolean
    groupKey: keyof T[number]
}


export default function BounceRateChart<T extends any[]>({ data, loading, groupKey }: Props<T>) {



    const chartData = React.useMemo(() => {
        return getTopNWithOtherAvg(data, "bounce_rate", groupKey, 3, "asc").map((item, index) => ({
            ...item,
            fill: `hsl(var(--chart-${index + 1}))`,
            name: 'test'
        }))
    }, [data])

    const insightText = React.useMemo(() => {
        return generateLowestBounceRateInsight(chartData, "bounce_rate", groupKey)
    }, [chartData])

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
                <CardTitle>Bounce Rate</CardTitle>
                <CardDescription>Percentage of single-page visits</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 !p-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto !aspect-square max-h-[250px]"
                >
                    <BarChart accessibilityLayer data={chartData} dataKey={"bounce_rate"}>
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
                            content={<ChartTooltipContent nameKey={groupKey as string}  valueFormatter={(value) => `${(value as number * 100).toFixed(1)}%`} />}
                        />
                        <Bar
                            dataKey={"bounce_rate"}

                            strokeWidth={2}
                            radius={8}
                            activeIndex={2}
                        />
                    </BarChart>
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/ui/chart"
import LearningTooltip from "components/learning-tooltip"
import { generateLowestBounceRateInsight, getTopNWithOtherAvg } from "lib/utils"
import { Lightbulb } from "lucide-react"
import React from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

interface Props<T extends any[]> {
    data: T
    loading?: boolean
    groupKey: keyof T[number]
    groupFormatter?: (name: any) => string;
}

const DefaultGroupFormatter = (value: any) => value;
export default function BounceRateChart<T extends any[]>({ data, loading, groupKey, groupFormatter = DefaultGroupFormatter }: Props<T>) {
    const chartData = React.useMemo(() => {
        return getTopNWithOtherAvg(data, "bounce_rate", groupKey, 3, "asc").map((item, index) => ({
            ...item,
            fill: `hsl(var(--chart-${index + 1}))`,
            name: 'test'
        }))
    }, [data])

    const insightText = React.useMemo(() => {
        return generateLowestBounceRateInsight(chartData, "bounce_rate", groupKey, groupFormatter)
    }, [chartData])

    const chartConfig = React.useMemo(() => {

        return chartData.reduce((config, item) => {
            return {
                ...config,
                [item[groupKey]]: {
                    label: groupFormatter(item[groupKey])
                }
            }
        }, {
            bounce_rate: {
                label: 'Bounce Rate'
            },
        }) satisfies ChartConfig;
    }, [chartData])


    return <>
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0!">
                <CardTitle className="flex items-center gap-2">Bounce Rate
                    <LearningTooltip description="Represents the percentage of single-page visits where users left without further interaction. A high bounce rate may indicate poor engagement or mismatched content." />
                </CardTitle>
                <CardDescription>Percentage of single-page visits</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0!">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square! max-h-[250px]"
                >
                    <BarChart accessibilityLayer data={chartData} layout="vertical" dataKey={"bounce_rate"}>
                        <CartesianGrid vertical={false} />
                        <YAxis
                            dataKey={groupKey as string}
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            interval={0}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig].label
                            }
                            hide

                        />
                        <XAxis dataKey={"bounce_rate"} hide type="number" />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent labelKey="bounce_rate" nameKey={groupKey as string} valueFormatter={(value) => `${(value as number * 100).toFixed(1)}%`} />}
                        />
                        <Bar
                            dataKey={"bounce_rate"}
                            strokeWidth={2}
                            radius={8}
                            layout="vertical"
                            minPointSize={10}
                            activeIndex={2}
                        >
                            <LabelList
                                dataKey={groupKey as string}
                                position="insideLeft"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={groupFormatter}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm!">
                <div className="flex items-center gap-2 font-medium leading-none">
                    <Lightbulb className="h-4 w-4 shrink-0" /> {insightText}
                </div>
            </CardFooter>
        </Card>
    </>
}
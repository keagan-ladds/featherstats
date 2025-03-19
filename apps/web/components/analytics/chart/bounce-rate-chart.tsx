import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/ui/chart"
import { generateLowestBounceRateInsight, getTopNWithOtherAvg } from "lib/utils"
import { Lightbulb } from "lucide-react"
import React from "react"
import { Cell, Label, LabelList, Pie, PieChart, PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"

interface Props<T extends any[]> {
    data: T
    loading?: boolean
    groupKey: keyof T[number]
}


export default function BounceRateChart<T extends any[]>({ data, loading, groupKey }: Props<T>) {

    const chartConfig = {
        sessions: {
            label: "Sessions",
        },
        "Other": {
            label: "Other",
        }
    } satisfies ChartConfig

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
                    <RadialBarChart
                        data={chartData}
                        startAngle={-90}
                        endAngle={270}
                        innerRadius={30}
                        outerRadius={110}>
                            <ChartTooltip
                            
                            cursor={true}
                            content={<ChartTooltipContent nameKey={groupKey as string}  valueFormatter={(value) => `${(value as number * 100).toFixed(1)}%`}/>}
                        />
                        
                        <PolarAngleAxis type="number" domain={[0, 1]} dataKey={'bounce_rate'} angleAxisId={0} tick={false} tickFormatter={() => 'test'} />
                        <RadialBar dataKey="bounce_rate" background angleAxisId={0}>
                            <LabelList
                                position="insideStart"
                                dataKey={groupKey as string}
                                className="fill-white capitalize mix-blend-luminosity"
                                fontSize={11}
                            />
                        </RadialBar>
                        
                    </RadialBarChart>
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/ui/chart"
import { getTopNWithOtherAvg } from "lib/utils"
import React from "react"
import { Cell, Label, LabelList, Pie, PieChart, RadialBar, RadialBarChart } from "recharts"
import { OsDetailsData } from "types/analytics"

interface Props {
    data: OsDetailsData
    loading?: boolean
}


export default function OsBounceRateChart({ data, loading }: Props) {

    const chartConfig = {
        bounce_rate: {
            label: "Bounce Rate",
        },
    } satisfies ChartConfig

    const chartData = React.useMemo(() => {
        return getTopNWithOtherAvg(data, "bounce_rate", "os", 3, "asc")
    }, [data])


    return <>
        <Card className="flex flex-col">
            <CardHeader className="items-center !pb-0">
                <CardTitle>Bounce Rate By OS</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 !p-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto !aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={-90}
                        endAngle={380}
                        innerRadius={30}
                        outerRadius={110}
                        
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel nameKey="os" />}
                        />
                        <RadialBar dataKey="bounce_rate" background>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
                            ))}
                            <LabelList
                                position="insideStart"
                                dataKey="os"
                                className="fill-white capitalize mix-blend-luminosity"
                                fontSize={11}
                            />
                        </RadialBar>
                    </RadialBarChart>
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
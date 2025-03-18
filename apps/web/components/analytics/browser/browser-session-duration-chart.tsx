import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/ui/chart"
import React from "react"
import { Cell, Label, LabelList, Pie, PieChart, RadialBar, RadialBarChart } from "recharts"
import { BrowserDetailsData } from "types/analytics"
import { getTop3WithOther } from "./browser-sessions-chart"
import { getTop3WithOtherAvg } from "./browser-bounce-rate-chart"

interface Props {
    data: BrowserDetailsData
    loading?: boolean
}


export default function BrowserSessionDurationChart({ data, loading }: Props) {

    const chartConfig = {
        sessions: {
            label: "Sessions",
        },
        avg_session_sec: {
            label: "Sessions",
        },
    } satisfies ChartConfig

    const chartData = React.useMemo(() => {
        return getTop3WithOtherAvg(data, "avg_session_sec")
    }, [data])

    const totalPageViews = React.useMemo(() => {
        return data.reduce((acc, curr) => acc + curr.pageviews, 0)
    }, [data])

    return <>
        <Card className="flex flex-col">
            <CardHeader className="items-center !pb-0">
                <CardTitle>Session Duration By Browser</CardTitle>
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
                            content={<ChartTooltipContent  nameKey="browser" />}
                        />
                        <RadialBar dataKey="avg_session_sec" background>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
                            ))}
                            <LabelList
                                position="insideStart"
                                dataKey="browser"
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
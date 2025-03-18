import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/ui/chart"
import { TrendingUp } from "lucide-react"
import React from "react"
import { Bar, BarChart, Cell, Label, Pie, PieChart, XAxis, YAxis } from "recharts"
import { DeviceDetailsData } from "types/analytics"

interface Props {
    data: DeviceDetailsData
    loading?: boolean
}



export default function DeviceSessionDurationChart({ data, loading }: Props) {

    const chartConfig = {
        avg_session_sec: {
            label: "Session Duration",
        },
        mobile: {
            label: "Mobile",
            color: "hsl(var(--chart-1))",
        },
        desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-2))",
        },
        tablet: {
            label: "Tablet",
            color: "hsl(var(--chart-3))",
        },
    } satisfies ChartConfig


    return <>
        <Card className="flex flex-col">
            <CardHeader className="items-center !pb-0">
                <CardTitle>Session Duration By Device Type</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 !pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto !aspect-square max-h-[250px]"
                >
                    <BarChart
                        accessibilityLayer
                        data={data}
                        layout="vertical"
                        margin={{
                            left: 0,
                        }}
                    >
                        <YAxis
                            dataKey="device"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />
                        <XAxis dataKey="avg_session_sec" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="avg_session_sec" layout="vertical" radius={5} >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`var(--color-${entry.device})`} />
                            ))}
                        </Bar>

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
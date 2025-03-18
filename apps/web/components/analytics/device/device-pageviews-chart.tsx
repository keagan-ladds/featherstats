import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/ui/chart"
import { TrendingUp } from "lucide-react"
import React from "react"
import { Cell, Label, Pie, PieChart } from "recharts"
import { DeviceDetailsData } from "types/analytics"

interface Props {
    data: DeviceDetailsData
    loading?: boolean
}



export default function DevicePageViewsChart({ data, loading }: Props) {

    const chartConfig = {
        pageviews: {
            label: "Page Views",
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


    const totalPageViews = React.useMemo(() => {
        return data.reduce((acc, curr) => acc + curr.pageviews, 0)
    }, [data])

    return <>
        <Card className="flex flex-col">
            <CardHeader className="items-center !pb-0">
                <CardTitle>Page Views By Device Type</CardTitle>
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
                            data={data}
                            dataKey="pageviews"
                            nameKey="device"
                            fillRule="evenodd"
                            innerRadius={60}
                            strokeWidth={5}>
                                {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`var(--color-${entry.device})`} />
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
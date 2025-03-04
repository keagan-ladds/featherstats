import { KeyMetricsData } from "@/types/analytics";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useMemo, useState } from "react";
import { cn } from "@repo/ui/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface DashboardMetricsCardProps {
  data: KeyMetricsData,
  loading: boolean
  className?: string | undefined
}

const chartConfig = {
  views: {
    label: "Page Views",
  },
  visits: {
    label: "Sessions",
    color: "hsl(var(--chart-1))"
  },
  pageviews: {
    label: "Page Views",
    color: "hsl(var(--chart-2))",
  },
  bounce_rate: {
    label: "Bounce Rate",
    color: "hsl(var(--chart-3))",
  },
  avg_session_sec: {
    label: "Session Duration",
    color: "hsl(var(--chart-4))",
  }
} satisfies ChartConfig

export default function DashboardMetricsCard({ data, loading, className }: DashboardMetricsCardProps) {

  const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("pageviews")
  const aggregate = useMemo(
    () => ({
      visits: data.reduce((acc, curr) => acc + curr.visits, 0),
      pageviews: data.reduce((acc, curr) => acc + curr.pageviews, 0),
      bounce_rate: data.reduce((acc, curr) => acc + curr.bounce_rate, 0) / data.length * 100,
      avg_session_sec: data.reduce((acc, curr) => acc + curr.avg_session_sec, 0) / data.length,
    }),[data]
  )

  return <>
    <Card className={cn(className)}>
      <CardHeader className="ui-flex ui-flex-col ui-items-stretch ui-space-y-0 ui-border-b ui-p-0 sm:ui-flex-row">
        <div className="ui-grid ui-grid-cols-2 sm:ui-flex">
          {["visits", "pageviews", "bounce_rate", "avg_session_sec"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="ui-relative ui-z-30 ui-flex ui-flex-1 ui-flex-col ui-justify-center ui-gap-1 ui-px-6 ui-py-4 ui-text-left even:ui-border-l data-[active=true]:ui-bg-muted/50 sm:ui-border-l sm:ui-border-t-0 sm:ui-px-8 sm:ui-py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="ui-text-ui-xs ui-text-muted-foreground ui-whitespace-nowrap">
                  {chartConfig[chart].label}
                </span>
                <span className="ui-text-lg ui-font-bold ui-leading-none sm:ui-text-3xl">
                  {loading ? <Skeleton className="ui-w-full ui-h-6 sm:ui-h-10"/> : aggregate[key as keyof typeof aggregate]?.toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="ui-px-2 sm:ui-p-6">
        <ChartContainer
          config={chartConfig}
          className="ui-aspect-auto ui-h-[250px] ui-w-full"
        >
          <AreaChart
            accessibilityLayer
            data={data ?? []}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Area dataKey={activeChart} type="linear" fill={`var(--color-${activeChart})`} fillOpacity={0.4} stroke={`var(--color-${activeChart})`}/>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  </>
}
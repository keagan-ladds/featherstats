import { Card, CardHeader, CardContent } from "@repo/ui/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useCallback, useMemo, useState } from "react";
import { cn } from "@repo/ui/lib/utils";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { useAnalytics } from "hooks/use-analytics";
import { isSameDay } from "date-fns"
import { formatDuration } from "lib/utils";
import ClarityModeTooltip from "components/clarity-mode/clarity-tooltip";

interface DashboardMetricsCardProps {
  className?: string | undefined
}

const chartConfig = {
  views: {
    label: "Page Views",
  },
  visits: {
    //label: <div className="flex items-center gap-2">Visits <ClarityModeTooltip className="size-3" content="A visit (or session) is when a user comes to your site and interacts with it." /></div>,
    
    label: "Visits",
    color: "hsl(var(--chart-1))"
  },
  pageviews: {
    //label: <div className="flex items-center gap-2">Pageviews <ClarityModeTooltip className="size-3" content="A pageview is recorded each time a page on your website is loaded or reloaded. One visit can include multiple pageviews if the user navigates through different pages." /></div>,
    label: "Pageviews",
    color: "hsl(var(--chart-2))",
  },
  bounce_rate: {
    //label: <div className="flex items-center gap-2">Bounce Rate <ClarityModeTooltip className="size-3" content="Bounce rate is the percentage of visitors who leave after viewing only one page without interacting. A high bounce rate may indicate that users didn't find what they were looking for." /></div>,
    label: "Bounce Rate",
    color: "hsl(var(--chart-3))",
  },
  avg_session_sec: {
    //label: <div className="flex items-center gap-2">Avg. Session Duration <ClarityModeTooltip className="size-3" content="This is the average time visitors spend on your site during a session. A higher session duration usually means users are engaged with your content." /></div>,
    label: "Avg. Session Duration",
    color: "hsl(var(--chart-4))",
  }
} satisfies ChartConfig

export default function DashboardMetricsCard({ className }: DashboardMetricsCardProps) {
  const { keyMetrics, dateRange } = useAnalytics();

  const formatAxisLabel = useCallback((date: Date) => {
    if (isSameDay(dateRange.start, dateRange.end)) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit"
      })
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit"
      })
    }


  }, [dateRange])

  const formatTooltipLabel = useCallback((date: Date) => {

    if (isSameDay(dateRange.start, dateRange.end)) {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit"
      })
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }, [dateRange])

  const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("visits")

  const aggregate = useMemo(
    () => {

      const avg_denom = keyMetrics.data && keyMetrics.data.reduce((acc, curr) => acc + (curr.pageviews > 0 ? 1 : 0), 0) || 1

      const visits = keyMetrics.data && keyMetrics.data.reduce((acc, curr) => acc + curr.visits, 0) || 0
      const pageviews = keyMetrics.data && keyMetrics.data.reduce((acc, curr) => acc + curr.pageviews, 0) || 0
      const bounce_rate = keyMetrics.data && keyMetrics.data.reduce((acc, curr) => acc + curr.bounce_rate / avg_denom, 0) * 100.0 || 0
      const avg_session_sec = keyMetrics.data && keyMetrics.data.reduce((acc, curr) => acc + curr.avg_session_sec, 0) / avg_denom || 0

      return {
        visits: visits.toLocaleString(),
        pageviews: pageviews.toLocaleString(),
        bounce_rate: bounce_rate.toLocaleString(undefined, { maximumFractionDigits: 0 }) + " %",
        avg_session_sec: formatDuration(avg_session_sec as number)
      }
    }, [keyMetrics.data]
  )

  const tooltipValueFormatters = {
    bounce_rate: (value: any) => `${(value * 100).toFixed()}%`,
    avg_session_sec: (value: any) => formatDuration(value)
  }

  return <>
    <Card className={cn(className)}>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="grid grid-cols-2 sm:flex">
          {["visits", "pageviews", "bounce_rate", "avg_session_sec"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left even:border-l sm:first:border-l-0 data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl text-nowrap">
                  {keyMetrics.loading ? <Skeleton className="w-full h-6 sm:h-10" /> : aggregate[key as keyof typeof aggregate]}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 mt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={keyMetrics.data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
              tickFormatter={(value) => tooltipValueFormatters[activeChart as keyof typeof tooltipValueFormatters]?.(value) || value.toLocaleString()}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return formatAxisLabel(date)
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"

                  labelFormatter={(value) => {
                    return formatTooltipLabel(new Date(value))
                  }}
                  valueFormatter={(value) => tooltipValueFormatters[activeChart as keyof typeof tooltipValueFormatters]?.(value) || value.toLocaleString()}
                />
              }
            />
            <Area dataKey={activeChart} type="linear" fill={`var(--color-${activeChart})`} fillOpacity={0.4} stroke={`var(--color-${activeChart})`} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  </>
}
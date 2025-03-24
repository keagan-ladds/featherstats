'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { cn } from "lib/utils"
import { ReactElement, useCallback, useState } from "react"

interface SummaryCardProps {
    className?: string
    tabs: {
        [key: string]: {
            title: React.ReactNode | string;
            triggerText: string;
            content: React.ReactNode
        }
    },
    defaultTab: string;
    onValueChange?: (value: string) => void;
}

export default function SummaryCard({ className, tabs, ...props }: SummaryCardProps) {
    const [currentTab, setCurrentTab] = useState<string>(props.defaultTab);

    const onValueChange = useCallback((value: string) => {
        setCurrentTab(value)
        props.onValueChange?.(value);

    }, [props.onValueChange])

    return <>
        <Card className={cn("min-h-[380px]", className)} >
            <Tabs defaultValue={props.defaultTab} onValueChange={onValueChange} >
                <CardHeader>
                    <div className="w-full grid gap-6 lg:flex items-center">
                        <CardTitle>{tabs[currentTab]?.title}</CardTitle>
                        <TabsList className={cn("w-full lg:w-auto lg:ml-auto", Object.keys(tabs).length != 1 || "hidden lg:invisible")} >
                            {Object.keys(tabs).map((value) =>
                                <TabsTrigger className="w-full lg:w-auto" value={value} key={value}>{tabs[value]?.triggerText}</TabsTrigger>)}
                        </TabsList>
                    </div>
                </CardHeader>
                <CardContent>
                    {Object.keys(tabs).map((value, i) =>
                        <TabsContent value={value} key={value}>
                            {tabs[value]!.content}
                        </TabsContent>
                    )}
                </CardContent>
            </Tabs>
        </Card>
    </>
}
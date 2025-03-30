'use client'

import { Card, CardContent, CardHeader } from "@repo/ui/components/ui/card";
import { ChartConfig, ChartContainer } from "@repo/ui/components/ui/chart";
import SourceIcon from "components/icon/source-icon";
import { Globe2 } from "lucide-react";
import Link from "next/link";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

interface DomainCardProps {
    domainName: string;
}

export default function DomainCard({ domainName }: DomainCardProps) {
    return <>
        <Card className="hover:bg-primary/5 cursor-pointer">
            <Link href={`/${domainName}`}>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <SourceIcon source={domainName} className="size-4" />
                        <h2>{domainName}</h2>
                    </div>
                </CardHeader>
            </Link>
        </Card>
    </>
}
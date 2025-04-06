import { Heading, Section, Text } from "@react-email/components"
import { TransactionalEmail } from "./transactional-email"
import * as React from 'react';

export interface Props {
    userName?: string;
}

export const DailyLimitWarningEmail = ({ userName }: Props) => {
    return (
        <TransactionalEmail
            previewText="You've Reached 80% of Your Daily Soft Limit"
            title={`Hi ${userName}`}
            message="We wanted to let you know that you've reached 80% of your daily soft limit for analytics events on your site. Once this limit is reached, analytics events across all your domains will not be processed until the following day."
            ctaText="Upgrade"
            ctaUrl="https://app.featherstats.com/#upgrade">
            <div>
                <Section className="mb-6">
                    <Text className="text-gray-700"></Text>
                    <Text className="text-gray-700">This could be due to a transient spike in traffic, which can happen from time to time. However, if you notice this happening frequently, we recommend upgrading your plan to ensure seamless data tracking without interruptions.</Text>
                    <Text className="text-gray-700 text-xl font-semibold">What you can do:</Text>
                    <Text className="text-gray-700 !mb-0">1️⃣ Monitor your traffic - Check if any unexpected spikes are occurring on your site. </Text>
                    <Text className="text-gray-700">2️⃣ Upgrade your plan - Consider upgrading for additional tracking capacity and avoid future interruptions.</Text>
                </Section>
            </div>


        </TransactionalEmail>
    )
}

export default DailyLimitWarningEmail
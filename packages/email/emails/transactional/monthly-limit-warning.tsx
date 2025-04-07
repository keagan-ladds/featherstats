import { Section, Text } from "@react-email/components"
import { TransactionalEmail } from "./transactional-email"
import * as React from 'react';

export interface Props {
    userName?: string;
}

export const MonthlyLimitWarningEmail = ({ userName }: Props) => {
    return (
        <TransactionalEmail
            previewText="You're Approaching Your Monthly Usage Limit"
            title={`Hi ${userName}`}
            message="You've used 75% of your monthly analytics quota. Once this limit is reached, analytics data across all your domains will stop being processed until the next billing cycle begins."
            ctaText="Upgrade Plan"
            ctaUrl="https://app.featherstats.com/manage/subscription/upgrade"
        >
            <div>
                <Section className="mb-6">
                    <Text className="text-gray-700"></Text>
                    <Text className="text-gray-700">
                        This might be due to consistent traffic growth over the month — a good sign! However, if this trend continues, you may exceed your quota before the end of your billing cycle.
                    </Text>
                    <Text className="text-gray-700 text-xl font-semibold">What you can do:</Text>
                    <Text className="text-gray-700 !mb-0">1️⃣ Monitor usage - Keep an eye on your dashboard to track your remaining quota.</Text>
                    <Text className="text-gray-700">2️⃣ Upgrade your plan - Increase your monthly capacity and ensure seamless data tracking.</Text>
                </Section>
            </div>
        </TransactionalEmail>
    )
}

export default MonthlyLimitWarningEmail
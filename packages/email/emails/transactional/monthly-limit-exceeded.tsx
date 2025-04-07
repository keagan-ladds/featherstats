import { Section, Text } from "@react-email/components"
import { TransactionalEmail } from "./transactional-email"
import * as React from 'react';

export interface Props {
    userName?: string;
}

export const MonthlyLimitExceededEmail = ({ userName }: Props) => {
    return (
        <TransactionalEmail
            previewText="You've Reached Your Monthly Usage Limit"
            title={`Hi ${userName}`}
            message="You've reached your monthly limit for analytics events on your site. Analytics data will no longer be collected across your domains until your usage resets next month or your plan is upgraded."
            ctaText="Upgrade to Restore Tracking"
            ctaUrl="https://app.featherstats.com/manage/subscription/upgrade"
        >
            <div>
                <Section className="mb-6">
                    <Text className="text-gray-700"></Text>
                    <Text className="text-gray-700">
                        This may be due to sustained high traffic over the past month. If your site continues to grow, it's important to ensure your plan scales with your needs to avoid losing valuable data.
                    </Text>
                    <Text className="text-gray-700 text-xl font-semibold">What you can do:</Text>
                    <Text className="text-gray-700 !mb-0">1️⃣ Upgrade your plan - Instantly restore tracking and increase your monthly quota.</Text>
                    <Text className="text-gray-700">2️⃣ Wait for your reset - Your quota will reset at the start of the next billing cycle, and tracking will resume automatically.</Text>
                </Section>
            </div>
        </TransactionalEmail>
    )
}

export default MonthlyLimitExceededEmail
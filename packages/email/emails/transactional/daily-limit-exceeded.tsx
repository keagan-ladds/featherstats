import { Section, Text } from "@react-email/components"
import { TransactionalEmail } from "./transactional-email"
import * as React from 'react';

export interface Props {
    userName?: string;
}

export const DailyLimitExceededEmail = ({ userName }: Props) => {
    return (
        <TransactionalEmail
            previewText="You've Reached Your Daily Soft Limit"
            title={`Hi ${userName}`}
            message="You've reached your daily soft limit for analytics events on your site. Analytics events across all your domains will no longer be processed until the limit resets tomorrow."
            ctaText="Upgrade to Restore Tracking"
            ctaUrl="https://app.featherstats.com/manage/subscription/upgrade"
        >
            <div>
                <Section className="mb-6">
                    <Text className="text-gray-700"></Text>
                    <Text className="text-gray-700">
                        This could be due to a spike in traffic, which can happen occasionally. If this becomes a regular occurrence, we recommend upgrading your plan to ensure uninterrupted data collection.
                    </Text>
                    <Text className="text-gray-700 text-xl font-semibold">What you can do:</Text>
                    <Text className="text-gray-700 !mb-0">1️⃣ Wait until tomorrow - Your limit will automatically reset, and tracking will resume.</Text>
                    <Text className="text-gray-700">2️⃣ Upgrade your plan - Get more daily capacity and prevent tracking disruptions in the future.</Text>
                </Section>
            </div>
        </TransactionalEmail>
    )
}

export default DailyLimitExceededEmail
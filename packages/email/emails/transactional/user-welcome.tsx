import { Heading, Section, Text } from "@react-email/components"
import { TransactionalEmail } from "./transactional-email"
import * as React from 'react';

export interface WelcomeEmailProps {
    userName?: string;
}

export const WelcomeEmail = ({ userName }: WelcomeEmailProps) => {
    return (
        <TransactionalEmail
            previewText="Welcome to Featherstats! Get started with your dashboard."
            title={`Welcome, ${userName}! 🎉`}
            message="We're excited to have you on board. Start exploring your analytics now."
            ctaText="Get Started"
            ctaUrl="https://app.featherstats.com/">
            <Section className="mb-6">
                <Text className="text-gray-700 !my-0">Here's how to get started: </Text>
                <Text className="text-gray-700 m-0">1️⃣ Set up tracking - Follow our quick guide to add the tracking script to your site.</Text>
                <Text className="text-gray-700 m-0">2️⃣ Explore your dashboard - See real-time data and insights.</Text>
                <Text className="text-gray-700 m-0">3️⃣ Enable Clarity Mode - Get helpful explanations to better understand your analytics.</Text>
            </Section>
        </TransactionalEmail>
    )
}

export default WelcomeEmail
import { Section, Text } from "@react-email/components";
import { TransactionalEmail } from "./transactional-email"
import React from "react";

interface Props {
    userName: string;
    oneTimePasscode: string;
}

export const OtpEmail = ({ userName, oneTimePasscode }: Props) => {
    return (
        <TransactionalEmail
            previewText="Your login code for Featherstats."
            title={`Hi, ${userName}`}
            message="Use the code below to log into your Featherstats account:">
            <Section>
                <Text className="text-gray-700 text-4xl font-semibold !mt-0">{oneTimePasscode || '000000'}</Text>
                <Text className="text-gray-700 !mb-0">This code expires in 5 minutes. If you didn't request this, you can ignore this email.</Text>
            </Section>
        </TransactionalEmail>
    )
}

export default OtpEmail;
import { Heading, Text } from "@react-email/components"
import { TransactionalEmail } from "./transactional-email"
import * as React from 'react';

export interface WelcomeEmailProps {
    userName?: string;
}

export const WelcomeEmail = ({userName}: WelcomeEmailProps) => {
    return (
        <TransactionalEmail previewText="sdsdsd">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Welcome to Featherstats!
            </Heading>
            <Text>Hi {userName}, </Text>
        </TransactionalEmail>
    )
}

export default WelcomeEmail
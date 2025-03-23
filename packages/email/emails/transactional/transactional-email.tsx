import { Body, Button, Column, Container, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Tailwind, Text } from "@react-email/components";
import React from "react";

interface TransactionalEmailProps {
    previewText: string;
    title: string;
    message: string;
    children?: string | React.ReactElement
    ctaText?: string;
    ctaUrl?: string;
}

export const TransactionalEmail = ({ previewText, title, message, ctaText, ctaUrl, children }: TransactionalEmailProps,) => {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Preview>{previewText}</Preview>
                <Body className="bg-white text-gray-900">
                    <Container className="p-2 bg-white mx-auto max-w-md">
                        <Section>
                            <Text className="text-xl font-semibold">{title}</Text>
                            <Text className="text-gray-700">{message}</Text>
                        </Section>
                        {children && (
                            <>{children}</>
                        )}
                        {ctaText && ctaUrl && (
                            <Section className="mb-3">
                                <Button href={ctaUrl} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">
                                    {ctaText}
                                </Button>
                            </Section>
                        )}
                        <Section>
                            <Text className="text-gray-700">Cheers, <br />
                                The Featherstats Team</Text>
                        </Section>
                        <Hr />
                        <Section>
                            <Text className="text-xs text-gray-500">
                                This is an automated email from a no-reply address. Please do not reply.
                                If you need assistance, visit <Link href="https://featherstats.com/">featherstats.com</Link>.
                            </Text>
                            <Text className="text-xs text-gray-500 mt-2">
                                © Featherstats {new Date().getFullYear()}. All rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

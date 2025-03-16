import { Body, Button, Column, Container, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Tailwind, Text } from "@react-email/components";
import React from "react";

interface TransactionalEmailProps {
    previewText: string;
    children: React.ReactNode
}

export const TransactionalEmail = ({ previewText, children }: TransactionalEmailProps,) => {
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded mt-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Section >
                            <Img
                                src={`/static/featherstats-logo.png`}
                                width="49"
                                height="49"
                                alt="Featherstats"
                                className="mx-auto"
                            />
                        </Section>
                        {children}
                    </Container>
                    <Section className="mx-auto mb-[40px]">
                        <Text className="text-center text-xs text-gray-500">Featherstats</Text>
                    </Section>
                </Body>
            </Tailwind>
        </Html>
    );
}

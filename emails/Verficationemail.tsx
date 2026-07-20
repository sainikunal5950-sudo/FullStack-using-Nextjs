import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Heading,
    Button,
} from "@react-email/components";

interface VerificationEmailProps {
    username: string;
    verifyCode: string;
}

export default function VerificationEmail({
    username,
    verifyCode,
}: VerificationEmailProps) {
    return (
        <Html>
            <Head />

            <Body>
                <Container>
                    <Section>
                        <Heading>
                            Welcome to Our App, {username}! 🎉
                        </Heading>

                        <Text>
                            Thanks for creating an account with us.
                            Please verify your email address to activate your account.
                        </Text>

                        <Text>
                            Your verification code is:
                        </Text>

                        <Heading>
                            {verifyCode}
                        </Heading>

                        <Text>
                            Enter this code in the application to verify your email.
                        </Text>

                        <Button
                            href="http://localhost:3000/verify"
                        >
                            Verify Email
                        </Button>

                        <Text>
                            If you did not create this account, you can ignore this email.
                        </Text>

                        <Text>
                            Thanks,
                            <br />
                            Our Team 🚀
                        </Text>

                    </Section>
                </Container>
            </Body>
        </Html>
    );
}
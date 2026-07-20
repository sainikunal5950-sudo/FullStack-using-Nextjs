import { resend } from "@/lib/resend"
import VerificationEmail from "@/emails/Verficationemail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerficationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'you@example.com',
            to: email,
            subject: 'Mystery message | verfication  code   ',
            react: VerificationEmail({
                username,
                verifyCode,
            }),
        });
        return { success: true, messsage: "verfication email send suuccesfully" }
    } catch (emailError) {
        console.error("error sending verification email", emailError);
        return { success: false, messsage: "Failed to send verification  email" }
    }
}



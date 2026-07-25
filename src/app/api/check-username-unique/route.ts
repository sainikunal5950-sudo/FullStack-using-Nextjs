import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/models/user";
import { success, z } from "zod";
import { usernameValidation } from "@/src/schema/Schema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})


export async function GET(request: Request) {
    if (request.method !== 'GET') {
        return Response.json({
            success: false,
            message: 'we only consider get request only'
        }, { status: 405 })
    }

    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            username: searchParams.get('username')
        }

        // valaidate with zod;

        const result = UsernameQuerySchema.safeParse(queryParam);
        console.log(result);
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json(
                {
                    success: false,
                    message: usernameErrors?.length > 0
                        ? usernameErrors.join(', ')
                        : 'Invalid query paremeteres'
                },
                { status: 400 }
            )
        }
        const { username } = result.data;

        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true })
        if (existingVerifiedUser) {
            return Response.json(
                {
                    success: false,
                    message: 'Username is Already Taken'
                },
                { status: 400 }
            )
        }
        return Response.json(
            {
                success: false,
                message: 'Username is unique'
            },
            { status: 400 }
        )
    } catch (error) {
        console.error("Error Checking Username", error)
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            { status: 500 }
        )
    }
}
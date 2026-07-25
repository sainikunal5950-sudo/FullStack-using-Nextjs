import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/models/user";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, code } = await request.json();

        // hmne suername decodeusername krke lelia hn 
        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({
            username: decodedUsername
        })

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "user not found"
                },
                { status: 500 }
            )
        }

        const isCodeValid = user.verifyCode === code
        const iscodenotExipred = new Date(user.verifyCodeExpiry) > new Date()

        if (isCodeValid && iscodenotExipred) {
            user.isVerified = true
            await user.save();

            return Response.json(
                {
                    success: true,
                    message: "Account verified Successfully"
                },
                { status: 200 }
            )
        } else if (!isCodeValid) {
            return Response.json(
                {
                    success: false,
                    message: "Code is Not valid"
                },
                { status: 200 }
            )
        } else {
            return Response.json(
                {
                    success: false,
                    message: "Code is Exipred"
                },
                { status: 200 }
            )

        }


    } catch {
        console.error("Error Checking Username", error)
        return Response.json(
            {
                success: false,
                message: "Error POST REQUEST ERROR VERIFY-CODE"
            },
            { status: 500 }
        )

    }
}
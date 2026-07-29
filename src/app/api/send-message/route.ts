import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/models/user";

// export { Message } from "@/model/user";
import { Message } from "@/src/models/user";

export async function POST(request: Request) {
    await dbConnect();
    const { username, content } = await request.json();

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                { status: 404 }
            )
        }
        // is user accepting message 
        if (!user.isAcceptingMessage) {
            return Response.json(
                {
                    success: false,
                    message: "User is not accepting the meessage "
                },
                { status: 401 }
            )
        }
        const newMessage = { content, createdAt: new Date() }
        user.messages.push(newMessage as Message);
        await user.save();

        return Response.json(
            {
                success: true,
                message: "message sent successfully"
            },
            { status: 401 }
        )
    } catch (error) {
        console.log("Error adding message:", error);
        return Response.json(
            {
                success: false,
                message: "Internal server error "
            },
            { status: 500 }
        )

    }



}
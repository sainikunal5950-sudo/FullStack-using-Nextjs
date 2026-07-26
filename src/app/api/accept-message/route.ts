// Rahul
//    │
//    ▼
// Kunal ki profile open karta hai
//    │
//    ▼
// Backend check karta hai

// isAcceptingMessage == true ?

//        │
//  ┌─────┴─────┐
//  │           │
// YES         NO
//  │           │
//  ▼           ▼
// Message     Reject
// Save        "Not accepting messages"




import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/models/user";
import { User } from "next-auth";
import { Session } from "inspector/promises";

export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);

    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticaetd"
            },
            { status: 401 }
        )
    }

    const userId = user._id;
    const { acceptMessages } = await request.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptMessages },
            { new: true }
        )

        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: "failed to update user status to accpet message"
                },
                { status: 401 }
            )
        }
        return Response.json(
            {
                success: true,
                message: "Message Acceptance status updated successfully"
            },
            { status: 401 }
        )
    } catch (error) {
        console.log("failed to update user status to accpet message")
        return Response.json(
            {
                success: false,
                message: "Not Authenticaetd"
            },
            { status: 401 }
        )
    }


}

export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);

    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticaetd"
            },
            { status: 401 }
        )
    }

    const userId = user._id;
    try {



        const foundUser = await UserModel.findById(userId);

        if (!foundUser) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                { status: 404 }
            )
        }

        return Response.json(
            {
                success: true,
                isAcceptingMessages: foundUser.isAcceptingMessage
            },
            { status: 200 }
        )
    } catch (error) {
        console.log("failed to update user status to accpet message")
        return Response.json(
            {
                success: false,
                message: "Error is geetiing message acceptance status"
            },
            { status: 500 }
        )

    }


}
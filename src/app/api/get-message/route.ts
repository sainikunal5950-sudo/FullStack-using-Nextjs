import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/models/user";
import { User } from "next-auth";
// import { Session } from "inspector/promises";


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

    const userId = new mongoose.Types.ObjectId(user._id);

    try {

        // ye yha hmne mongo db pipeline use ki  hn 
        const user = await UserModel.aggregate([
            { $match: { id: userId } },
            { $unwind: 'message' },
            { $sort: { 'message.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$message' } } }

        ])

        if (!user || user.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                { status: 401 }
            )
        }
        return Response.json(
            {
                success: false,
                message: user[0].messages
            },
            { status: 401 }
        )

    } catch (error) {
        console.log("An unexcepted error occured:", error);
        return Response.json(
            {
                success: false,
                message: "Not Authenticated"
            },
            { status: 500 }
        )

    }

}

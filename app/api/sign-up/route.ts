import dbConnect from "@/lib/dbConnect";
import UserModel from "@/src/models/user";
import bcrypt from "bcrypt";
import { sendVerficationEmail } from "@/helpers/SendVerficationemail";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();  // ye 3 chij nikali hmne 
        // abb dekhege hmara user exist krta hai i nhi 

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken"
                },
                {
                    status: 400
                }
            )
        }

        const existingUserByemail = await UserModel.findOne({
            email
        })

        const verifyCode = Math.floor(10000 + Math.random() * 900000).toString();

        if (existingUserByemail) {
            if (existingUserByemail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User alreadye xist with this email"
                },
                    {
                        status: 500
                    }
                )

            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByemail.password = hashedPassword;
                existingUserByemail.verifyCode = verifyCode;
                existingUserByemail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByemail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })
            await newUser.save();

        }

        // abb hm send verification email krege 
        const emailResponse = await sendVerficationEmail(
            email,
            username,
            verifyCode
        )

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.messsage
            },
                {
                    status: 500
                }
            )
        }

        return Response.json({
            success: false,
            message: "User regesitred suuccesfully"
        },
            {
                status: 500
            }
        )







    } catch (error) {
        console.error("Error regersetring user", error)
        return Response.json(
            {
                success: false,
                message: "error regerestring user"
            },
            {
                status: 500
            }
        )
    }
}



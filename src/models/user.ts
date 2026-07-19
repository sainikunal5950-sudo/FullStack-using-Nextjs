import mongoose, { Schema, Document } from "mongoose";

// Message Interface
export interface Message extends Document {
    content: string;
    createdAt: Date;
}

// Message Schema
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// User Interface
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isAcceptingMessage: boolean;
    messages: Message[];
}

// User Schema
const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please use a valid email address"],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    },

    verifyCode: {
        type: String,
        required: [true, "Verification code is required"],
    },

    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verification code expiry is required"],
    },

    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },

    messages: [MessageSchema],
});

// Model
const UserModel =
    (mongoose.models.User as mongoose.Model<User>) ||
    mongoose.model<User>("User", UserSchema);

export default UserModel;
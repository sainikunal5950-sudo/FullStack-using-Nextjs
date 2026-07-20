import { Message } from "@/src/models/user";

export interface ApiResponse {
    success: boolean;
    messsage: string;
    isAcceptingMessage?: boolean;
    messages?: Array<Message>
}
import 'next-auth';
import { DefaultSession } from 'next-auth';

// ye hmne asse esliye bnaya hai kyuki nextAuth mai user object kuch asee hote hai 
// user = {
//    name: "Kunal",
//    email: "abc@gmail.com",
//    image: "..."
// }

// asse hota hai aur hmara database chij differnet hn thats why 

// esko bolte hai module augmentation 


declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessage?: boolean;
        username?: string
    }
    interface Session {
        user: {
            _id?: string;
            isVerified?: boolean;
            isAcceptingMessage?: boolean;
            username?: string
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string
    }
}



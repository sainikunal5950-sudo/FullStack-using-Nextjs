'use client'  // eska main mtlb next js mai kya hota hai hrr comcpeoonet server pe rnder hota hai aur react mai browser agrr tum use satte vgra render krna chata ho toh tumko 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";



const page = () => {
    const [username, setUsername] = useState('');
    const [usernamemessage, setusernameMessage] = useState('');
    const [ischeckingUsername, setischeckingUsername] = useState(false);
    const [issubmitting, setissubmitting] = useState(false);
    const debouncedusername = useDebounceValue(username, 300);
    return (
        <div>page</div>
    )
}
export default page
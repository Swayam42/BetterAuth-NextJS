'use client';
import React from "react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
//import {useRouter} from "next/navigation";
const Logout = () =>{
  //const router=useRouter();
    async function handleLogout(){
        await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
     //router.push('/auth/signin');
     redirect('/auth/signin');
    },
  },
});

    }
    return <button onClick={handleLogout}>Log Out</button>
};
export default Logout;
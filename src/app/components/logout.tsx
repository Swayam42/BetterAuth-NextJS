'use client';
import React from "react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
const Logout = () =>{
    async function handleLogout(){
        await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      redirect('/auth/signin');
    },
  },
});

    }
    return <button onClick={handleLogout}>Log Out</button>
};
export default Logout;
'use client';
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { FcGoogle } from 'react-icons/fc';
import '../auth.css';


const SignInPage = ()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    useEffect(()=>{
        if(session){
            redirect('/dashboard');
        }
    },[session])
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
        rememberMe: true
    }, 
    {
        //callbacks
    });
    console.log('data',data);
}

const handleGoogleSignIn = async ()=>{
    const data = await authClient.signIn.social({
    provider: "google",
  });
  console.log(data);
}
    return(
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2 className="auth-title">Sign In Kijiye</h2>
                <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="auth-input"
                 />
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="auth-input"
                 />
                <button type="submit" className="auth-button">
                    Sign In
                </button>
                <div className="auth-divider">OR</div>
                <button type="button" onClick={handleGoogleSignIn} className="social-button">
                <FcGoogle size={20} /> Sign in with Google
                </button>

            </form>
        </div>
    )
}


export default SignInPage;
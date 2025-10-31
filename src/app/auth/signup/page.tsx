'use client';
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { authClient } from '@/lib/auth-client';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import '../auth.css';

const SignUpPage = ()=>{
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');

    const passwordMatch = password == confirmPassword && confirmPassword !='';
    const passwordsDontMatch = confirmPassword !== '' && !passwordMatch;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        const { data, error } = await authClient.signUp.email({
            name: name,
            email: email,
            password: password,
            callbackURL: "/dashboard",
        },{
            onRequest: (ctx) => {
            //show loading
            console.log("Making the request...");
            },
            onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            redirect('/dashboard');
            },
            onError: (ctx) => {
            // display the error message
            console.log('err',ctx);
            }, 
        });
    console.log(data);
}

const handleGoogleSignUp =async ()=>{
    const data = await authClient.signIn.social({
    provider: "google",
  });
  console.log('data',data)
}
const handleGitHubSignUp =async ()=>{
    const data = await authClient.signIn.social({
    provider: "github",
  });
  console.log('data',data)
}
    return(
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2 className="auth-title">Sign Up Karo Na !!</h2>
                <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="auth-input"
                 />
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
                 <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className={
                    passwordsDontMatch ? "auth-input-error" : 
                    passwordMatch ? "auth-input-success" : 
                    "auth-input"
                }
                 />
                 {passwordsDontMatch && (
                    <span className="password-message password-error">
                        Passwords don&apos;t match!
                    </span>
                 )}
                 {passwordMatch && (
                    <span className="password-message password-success">
                        Passwords match 
                    </span>
                 )}
                <button type="submit" className="auth-button">
                    Sign Up
                </button>
                <div className="auth-divider">OR</div>
                <button type="button" onClick={handleGoogleSignUp} className="social-button">
                    <FcGoogle size={20} />Continue with Google
                </button>
                <button type="button" onClick={handleGitHubSignUp} className="social-button">
                    <FaGithub size={20} />Continue with GitHub
                </button>
                <p className="terms-text">
                    By continuing, you agree to our{' '}
                    <a href="/terms" className="terms-link">Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" className="terms-link">Privacy Policy</a>
                </p>
            </form>
        </div>
    )
}


export default SignUpPage;
'use client';
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { authClient } from '@/lib/auth-client';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../auth.css';

const SignUpPage = ()=>{
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phoneNumber,setPhoneNumber]=useState<string | undefined>('');
    const [password,setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');

    const passwordMatch = password === confirmPassword && confirmPassword !== '';
    const passwordsDontMatch = confirmPassword !== '' && !passwordMatch;
    
    // Validate phone number
    const isPhoneValid = phoneNumber ? isValidPhoneNumber(phoneNumber) : false;
    const isPhoneInvalid = phoneNumber && phoneNumber.length > 0 && !isPhoneValid;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        //To make the users compulsory input their Phone number
        if (!phoneNumber || phoneNumber.trim()===''){
            alert("Please enter your phone number !");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        
        // Validate phone number before submitting
        if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
            alert("Please enter a valid phone number!");
            return;
        }
        
        console.log("Phone number to be sent:", phoneNumber);
        
        const { data, error } = await authClient.signUp.email({
            name: name,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            callbackURL: "/dashboard",
        },{
            onRequest: (ctx) => {
                console.log("Making the request...");
            },
            onSuccess: (ctx) => {
                console.log("Signup successful!");
                redirect('/dashboard');
            },
            onError: (ctx) => {
                console.log('err',ctx);
            }, 
        });
        console.log(data);
    }

    const handleGoogleSignUp = async ()=>{
        const data = await authClient.signIn.social({
            provider: "google",
        });
        console.log('data',data)
    }
    
    const handleGitHubSignUp = async ()=>{
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
                    required
                />
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    className="auth-input"
                    required
                />
            
                <div className="phone-input-wrapper">
                    <PhoneInput
                        international
                        defaultCountry="IN"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        placeholder="Enter phone number"
                        className={
                            isPhoneInvalid ? "phone-input-error" : 
                            isPhoneValid ? "phone-input-success" : 
                            "phone-input"
                        }
                        limitMaxLength={true}
                        required
                    />
                    {isPhoneInvalid && (
                        <span className="phone-message phone-error">
                            Invalid phone number 
                        </span>
                    )}
                    {isPhoneValid && (
                        <span className="phone-message phone-success">
                            Valid phone number 
                        </span>
                    )}
                </div>
                
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="auth-input"
                    required
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
                    required
                />
                {passwordsDontMatch && (
                    <span className="password-message password-error">
                        Passwords don't match!
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
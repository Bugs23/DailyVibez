"use client"
import { Anton_SC } from "next/font/google";
import React, {useState} from "react"
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const anton = Anton_SC({ subsets: ["latin"], weight: ["400"] });

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRegistered, setIsRegistered] = useState(false)
    const [authenticating, setAuthenticating] = useState(false)

    const {signup, login} = useAuth()

    async function handleSubmit() {
        if (!email || !password || password.length < 6) {
            return
        }

        setAuthenticating(true)

        try {
            if (isRegistered) {
                console.log("Signing up new user")
                await signup(email, password)
            } else {
                console.log("Logging in existing user")
                await login(email, password)
            }
        } catch (err) {
            console.log(err.message)
        } finally {
            setAuthenticating(false)
        }
    }

    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-4">
            <h3 className={`text-4xl sm:text-5xl md:text-6xl ${anton.className}`}>{isRegistered ? "Login" : "Sign Up"}</h3>
            <p>You're so close!</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 duration-200 hover:border-indigo-700 focus:border-indigo-700 rounded-full outline-none" placeholder="Email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 duration-200 hover:border-indigo-700 focus:border-indigo-700 rounded-full outline-none" placeholder="Password" type="password" />
            <div className="max-w-[400px] w-full mx-auto">
                <Button clickHandler={handleSubmit} text={authenticating ? "submitting" : "Submit"} full />
            </div>
            <button onClick={() => setIsRegistered(!isRegistered)}>Don't have an account? <span className="text-indigo-600">{isRegistered ? "Login" : "Sign up"}</span></button>
        </div>
    )
}
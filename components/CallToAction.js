"use client"
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

export default function CallToAction() {

    const {currentUser} = useAuth()

    if (currentUser) {
        return (
            <div className="max-w-[300px] mx-auto w-full my-8">
                <Link href={"/dashboard"}>
                    <Button full dark text="Go to Dashboard" />
                </Link>
            </div>
        )
    }

    return (
      <div className="grid grid-cols-2 gap-4 w-fit mx-auto my-8">
            <Link href={"/dashboard"}>
                <Button text="Sign Up" />
            </Link>
            <Link href={"/dashboard"}>
                <Button text="Login" dark />
            </Link>
        </div>
    )
}
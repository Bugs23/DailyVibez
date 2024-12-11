import { Anton_SC } from "next/font/google";
import React from "react"
import Calendar from "./Calendar";
import CallToAction from "./CallToAction";

const anton = Anton_SC({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
    return (
        <div className="gap-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl">
                With <span className={`textGradient ${anton.className}`}>Daily Vibez</span> you can discover <span  className={`textGradient ${anton.className}`}>patterns</span> and gain <span  className={`textGradient ${anton.className}`}>insights</span> into your emotional well-being.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mt-2 mx-auto max-w-[800px]">Keep track of your moods effortlessly, every day.</p>
            <CallToAction />
            <Calendar demo />
        </div>
    )
}

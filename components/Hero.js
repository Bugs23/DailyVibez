import { Fugaz_One } from "next/font/google";
import React from "react"
import Button from "./Button";
import Calendar from "./Calendar";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
    return (
        <div className="py-10 sm:py-14 md:py-20 text-center">
            <h1 className={`text-2xl sm:text-3xl md:text-4xl ${fugaz.className}`}>
                With <span className="textGradient">Daily Vibez</span> you can discover <span className="textGradient">patterns</span> and gain <span className="textGradient">insights</span> into your emotional well-being.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mt-2 mx-auto max-w-[800px]">Keep track of your moods effortlessly, every day.</p>
            <div className="grid grid-cols-2 gap-4 w-fit mx-auto mt-8">
                <Button text="Sign Up" />
                <Button text="Login" dark />
            </div>
            <Calendar demo />
        </div>
    )
}

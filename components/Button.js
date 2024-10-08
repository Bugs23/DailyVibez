import { Fugaz_One } from 'next/font/google';
import React from 'react'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Button({text, dark, full}) {
  return (
    <button className={`rounded-full overflow-hidden duration-200 hover:opacity-60 border border-solid border-indigo-600 px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ${fugaz.className} ${dark ? "text-white bg-indigo-600" : "text-indigo-600"} ${full ? "grid items-center w-full" : ""}`}>
        {text}
    </button>
  )
}

import { Anton_SC } from 'next/font/google';
import React from 'react'

const anton = Anton_SC({ subsets: ["latin"], weight: ["400"] });

export default function Button({text, dark, full, clickHandler}) {
  return (
    <button onClick={clickHandler} className={`rounded-full overflow-hidden duration-200 hover:opacity-60 border border-solid border-blue-600 px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ${anton.className} ${dark ? "text-white bg-blue-600" : "text-blue-600"} ${full ? "grid items-center w-full" : ""}`}>
        {text}
    </button>
  )
}
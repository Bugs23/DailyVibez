import { Fugaz_One } from 'next/font/google';
import React from 'react'
import Calendar from './Calendar';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {

const statuses = {
  num_days: 14,
  time_remaining: "13:14:26",
  date: (new Date()).toDateString()
}

const moods = {
  "happy": "😀",
  "sad": "😢",
  "fear": "😧",
  "disgust": "🤮",
  "angry": "😡",
  "surprised": "😮"

}

  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-10 md:gap-12'>
      <div className='p-4 gap-2 grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg'>
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className='flex flex-col gap-1 sm:gap-2'>
              <p className='font-medium uppercase text-xs sm:text-sm truncate'>{status.replaceAll("_", " ")}</p>
              <p className={`text-base sm:text-lg truncate ${fugaz.className}`}>{statuses[status]}</p>
            </div>
          )
        })}
      </div>
      <h4 className={`text-3xl sm:text-4xl md:text-5xl text-center ${fugaz.className}`}>How are you <span className='textGradient'>feeling</span> today?</h4>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4'>
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button className='p-2 rounded-lg duration-200 bg-indigo-50 hover:bg-indigo-100 purpleShadow' key={moodIndex}>
              <span className='text-4xl block'>{moods[mood]}</span>
              <span className={`capitalize text-base text-indigo-500 ${fugaz.className}`}>{mood}</span>
            </button>
          )
        })}
      </div>
      <Calendar />
    </div>
  )
}

"use client"
import { Fugaz_One } from 'next/font/google';
import React, {useEffect, useState} from 'react'
import Calendar from './Calendar';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {

  const {currentUser, userDataObj, setUserDataObj} = useAuth()
  const [data, setData] = useState({})

  // Count values in data array
  function countValues() {

  }

  async function handleSetMood(mood, day, month, year) {
    try {
    // Create copy of current users data
    const newData = {...userDataObj}

    /* 
      - Check if newData exists and contains a property for the specified year
        - If newData doesn't, create a new newData[year] object
    */
    if (!newData?.[year]) {
      newData[year] = {}
    }

    /* 
      - Check if newData has an object for the specified year and month
        - If it doesn't, create a newData[year][month] object
    */
    if (!newData?.[year]?.[month]) {
      newData[year][month] = {}
    }

    newData[year][month][day] = mood
    // Update the current state
    setData(newData)
    // Update the global state
    setUserDataObj(newData)
    // Update firebase
    const docRef = doc(db, "users", currentUser.uid)
    const res = await setDoc(docRef, {
      [year]: {
        [month]: {
          [day]: mood
        }
      }
    }, {merge: true})
    } catch(err) {
      console.log("Failed to set data: ", err.message)
    }
  }

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

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return
    }

    setData(userDataObj)

  }, [currentUser, userDataObj])

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
      <div className='grid grid-cols-2 md:grid-cols-6 gap-4'>
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button className='p-2 rounded-lg duration-200 bg-indigo-50 hover:bg-indigo-100 purpleShadow' key={moodIndex}>
              <span className='text-4xl block'>{moods[mood]}</span>
              <span className={`capitalize text-base text-indigo-500 ${fugaz.className}`}>{mood}</span>
            </button>
          )
        })}
      </div>
      <Calendar data={data} handleSetMood={handleSetMood} />
    </div>
  )
}

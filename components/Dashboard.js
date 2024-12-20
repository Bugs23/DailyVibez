"use client"
import { Anton_SC } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import Calendar from './Calendar';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Login from './Login';
import Loading from './Loading';

const anton = Anton_SC({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {

  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth()
  const [data, setData] = useState({})
  const now = new Date()

  // Count values in data array
  function countValues() {
    let total_number_of_days = 0
    let sum_moods = 0
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day]
          total_number_of_days++
          sum_moods += days_mood
        }
      }
    }
    return { Number_Of_Days: total_number_of_days, average_mood: (sum_moods / total_number_of_days).toFixed(1) }
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  }

  async function handleSetMood(mood) {

    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    try {
      // Create copy of current users data
      const newData = { ...userDataObj }

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
      }, { merge: true })
    } catch (err) {
      console.log("Failed to set data: ", err.message)
    }
  }

  const moods = {
    "disgust": "🤮",
    "angry": "😡",
    "fear": "😧",
    "sad": "😢",
    "content": "🙂",
    "happy": "☺️"

    /*
    "happy": "😀",
    "sad": "😢",
    "fear": "😧",
    "disgust": "🤮",
    "angry": "😡",
    "surprised": "😮"
    */
  }

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return
    }

    setData(userDataObj)

  }, [currentUser, userDataObj])

  if (loading) {
    return <Loading />
  }

  if (!currentUser) {
    return <Login />
  }

  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-10 md:gap-12'>
      <div className='p-4 gap-2 grid grid-cols-3 bg-blue-50 text-blue-500 rounded-xl'>
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className='flex flex-col gap-1 sm:gap-2'>
              <p className='font-medium capitalize text-xs sm:text-sm truncate'>{status.replaceAll("_", " ")}</p>
              <p className={`text-base sm:text-lg truncate ${anton.className}`}>{statuses[status]}</p>
            </div>
          )
        })}
      </div>
      <h4 className={`text-3xl sm:text-4xl md:text-5xl text-center ${anton.className}`}>How are you <span className='textGradient'>feeling</span> today?</h4>
      <div className='grid grid-cols-2 md:grid-cols-6 gap-4'>
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              onClick={() => {
                const currentMoodValue = moodIndex + 1
                handleSetMood(currentMoodValue)
              }}
              className={`flex justify-center order-${moodIndex + 1} gap-2 items-center p-2 rounded-lg duration-200 bg-blue-50 hover:bg-blue-100 blueShadow`}
              key={moodIndex}
            >
              <span className='text-4xl'>{moods[mood]}</span>
              <span className={`capitalize text-base text-blue-500 ${anton.className}`}>{mood}</span>
            </button>
          )
        })}
      </div>
      <Calendar completeData={data} handleSetMood={handleSetMood} />
      <div></div>
    </div>
  )
}

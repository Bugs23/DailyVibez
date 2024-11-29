"use client"
import { baseRating, gradients } from "@/utils"
import React, {useState} from "react"

// Months of the year
const months = {
  "January": "Jan",
  "February": "Feb",
  "March": "Mar",
  "April": "Apr",
  "May": "May",
  "June": "Jun",
  "July": "Jul",
  "August": "Aug",
  "September": "Sept",
  "October": "Oct",
  "November": "Nov",
  "December": "Dec"
}

const monthsArr = Object.keys(months)

// Current date
const now = new Date()

// Days of the week
const dayList = [
  "Sunday", 
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday"
]

export default function Calendar({demo, completeData, handleSetMood}) {

  const now = new Date()
  const currentMonth = now.getMonth()
  const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[currentMonth])
  const [selectedYear, setSelectedYear] = useState(now.getFullYear())

  // Get index of the month
  const numericMonth = monthsArr.indexOf(selectedMonth)

  // Access data for the selected year and month from completeData, or set data to undefined if completeData, the year, or the month is missing
  const data = completeData?.[selectedYear]?.[numericMonth] || {}
  console.log(completeData?.[selectedYear]?.[selectedMonth])

  function handleIncrementMonth(val) {
    // Value +1 -1
    // If we hit the bounds of the months, we can just adjust the year that is displayed instead
    if (numericMonth + val < 0) { 
      // Set month value = to 11 and decrement the year
      setSelectedYear(curr => curr - 1)
      setSelectedMonth[monthsArr[monthsArr.length - 1]]
    } else if (numericMonth + val > 11) {
      // Set month value = to 0 and increment the year
      setSelectedYear(curr => curr + 1)
      setSelectedMonth[monthsArr[0]]
    } else {
      setSelectedMonth(monthsArr[numericMonth + val])
    }
  }



  // const selectedYear = 2024

  // const month = "January"

  // Set the selectedYear as the selectedYear in the selectedYear variable above (i.e. 2024)
  // Create an array of the keys from the months object above (i.e. January, February, March, etc...)
  // Get the index of the month that"s in the selectedMonth variable above (i.e. September)
  // Set the day of the month as the first day of the month (i.e. 1)
  const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1) // September 1, 2024

  // Get the day of the week for the date returned in the monthNow variable
  const firstDayOfMonth = monthNow.getDay() // Returns 0 for Sunday

  /* Get the number of days in the month */
  // Set the selectedYear as the selectedYear in the selectedYear variable above (i.e. 2024)
  // Create an array of the keys from the months object above (i.e. January, February, March, etc...)
  // Get the index of the month that"s in the selectedMonth variable above and add 1 to jump to the next month (i.e. October)
  // Pass 0 as the day to get the last day of the month in the selectedMonth variable - because 0 day of October would be the last day of septembr (i.e. 30)
  const daysInMonth = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth) + 1, 0).getDate()

  const daysToDisplay = firstDayOfMonth + daysInMonth // 0 + 30 = 30 days to display

  const numOfRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

  return (
    <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
      {[...Array(numOfRows).keys()].map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="grid grid-cols-7 gap-1">
            {dayList.map((dayOfWeek, dayOfWeekIndex) => {

              let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)

              let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true

              let isToday = dayIndex === now.getDate()

              if (!dayDisplay) {
                return (
                  <div className="bg-white" key={dayOfWeekIndex}></div>
                )
              }

              let color = demo ?
                gradients.indigo[baseRating[dayIndex]] :
                dayIndex in data ?
                  gradients.indigo[data[dayIndex]] :
                  'white'
                
              return (
                <div 
                  key={dayOfWeekIndex} 
                  style={{background: color}} 
                  className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${isToday ? "border-indigo-400" : "border-indigo-100"} ${color === "white" ? "text-indigo-400" : "text-white"}`}
                >
                  <p>{dayIndex}</p>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
    
  )
}

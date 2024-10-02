import { baseRating, gradients } from "@/utils"
import React from "react"

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

// Demo data
const data = {
  "15": 2, "16": 4, "17": 1, "18": 3, "19": 5,
  "20": 2, "21": 4, "22": 1, "23": 3, "24": 5,
}

export default function Calendar({demo}) {

  const year = 2025

  const month = "January"

  // Set the year as the year in the year variable above (i.e. 2024)
  // Create an array of the keys from the months object above (i.e. January, February, March, etc...)
  // Get the index of the month that"s in the month variable above (i.e. September)
  // Set the day of the month as the first day of the month (i.e. 1)
  const monthNow = new Date(year, Object.keys(months).indexOf(month), 1) // September 1, 2024

  // Get the day of the week for the date returned in the monthNow variable
  const firstDayOfMonth = monthNow.getDay() // Returns 0 for Sunday

  /* Get the number of days in the month */
  // Set the year as the year in the year variable above (i.e. 2024)
  // Create an array of the keys from the months object above (i.e. January, February, March, etc...)
  // Get the index of the month that"s in the month variable above and add 1 to jump to the next month (i.e. October)
  // Pass 0 as the day to get the last day of the month in the month variable - because 0 day of October would be the last day of septembr (i.e. 30)
  const daysInMonth = new Date(year, Object.keys(months).indexOf(month) + 1, 0).getDate()

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
                dayIndex in data 
                ? gradients.indigo[data[dayIndex]] : 
                "white"

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

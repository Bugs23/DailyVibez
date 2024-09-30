import React from 'react'

// Months of the year
const months = {
  'January': 'Jan',
  'February': 'Feb',
  'March': 'Mar',
  'April': 'Apr',
  'May': 'May',
  'June': 'Jun',
  'July': 'Jul',
  'August': 'Aug',
  'September': 'Sept',
  'October': 'Oct',
  'November': 'Nov',
  'December': 'Dec'
}

// Current date
const now = new Date()

// Days of the week
const dayList = [
  'Sunday', 
  'Monday', 
  'Tuesday', 
  'Wednesday', 
  'Thursday', 
  'Friday', 
  'Saturday'
]

export default function Calendar() {

  const year = 2024

  const month = "September"

  // Set the year as the year in the year variable above (i.e. 2024)
  // Create an array of the keys from the months object above (i.e. January, February, March, etc...)
  // Get the index of the month that's in the month variable above (i.e. September)
  // Set the day of the month as the first day of the month (i.e. 1)
  const monthNow = new Date(year, Object.keys(months).indexOf(month), 1) // September 1, 2024

  // Get the day of the week for the date returned in the monthNow variable
  const firstDayOfMonth = monthNow.getDay() // Returns 0 for Sunday

  /* Get the number of days in the month */
  // Set the year as the year in the year variable above (i.e. 2024)
  // Create an array of the keys from the months object above (i.e. January, February, March, etc...)
  // Get the index of the month that's in the month variable above and add 1 to jump to the next month (i.e. October)
  // Pass 0 as the day to get the last day of the month in the month variable - because 0 day of October would be the last day of septembr (i.e. 30)
  const daysInMonth = new Date(year, Object.keys(months).indexOf(month) + 1, 0)


  const daysToDisplay = firstDayOfMonth + daysInMonth // 0 + 30 = 30 days to display

  const numOfRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

  return (
    <div><p>Calendar</p></div>
  )
}

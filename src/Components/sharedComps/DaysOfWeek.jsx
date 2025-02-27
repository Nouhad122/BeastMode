import React from 'react'

const DaysOfWeek = ({children}) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return (
    <>
      {
        daysOfWeek.map(day => children(day))
      }
    </>
  )
}

export default DaysOfWeek

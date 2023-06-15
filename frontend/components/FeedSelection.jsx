import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FeedCheckbox from './FeedCheckbox'

export default function FeedSelection( {socket} ) {

  const [feedNames, setFeedNames] = useState([])
  const [checkboxStates, setCheckboxStates] = useState([])
  const handleCheck = (index) => {
    const newCheckboxStates = [...checkboxStates]
    newCheckboxStates[index] = !newCheckboxStates[index]
    setCheckboxStates(newCheckboxStates)
  }

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/feed-names")
        setFeedNames(response.data.feedNames)
        setCheckboxStates(Array(response.data.feedNames.length).fill(true))
      } catch (error) {
        console.log(error)
      }
    }
    initialFetch()
  }, [])

  useEffect(() => {
    console.log("Change in checkbox states detected. Sending state to backend.")
    if (socket) {
      socket.emit("checkboxStateChange", {newCheckboxStates:checkboxStates})
    }
  }, [checkboxStates])

  return (
    <div className="col-lg-3">
      <div className="list-group">
        {feedNames.map((feedName, index) => {
          return <FeedCheckbox key={index} feedName={feedName} checked={checkboxStates[index]} onChange={() => handleCheck(index)} />
        })}
      </div>
    </div>
  )
}

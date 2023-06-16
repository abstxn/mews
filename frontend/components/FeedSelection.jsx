import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FeedCheckbox from './FeedCheckbox'

export default function FeedSelection( {socket} ) {

  const [feedSelection, setFeedSelection] = useState({})
  const handleCheck = (feedName) => {
    setFeedSelection({
      ...feedSelection,
      [feedName]:!feedSelection[feedName]
    })
  }

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get_default_feed_selection")
        setFeedSelection(response.data.defaultFeedSelection)
      } catch (error) {
        console.log(error)
      }
    }
    initialFetch()
  }, [])

  useEffect(() => {
    console.log("Change in feed selection detected. Sending state to backend.")
    if (socket) {
      socket.emit("feedSelectionUpdate", feedSelection)
    }
  }, [feedSelection])

  return (
    <div className="col-lg-3">
      <div className="list-group">
        {
          Object.keys(feedSelection).map((feedName, index) => {
            return <FeedCheckbox key={index} feedName={feedName} checked={feedSelection[feedName]} onChange={() => handleCheck(feedName)} />
          })
        }
      </div>
    </div>
  )
}

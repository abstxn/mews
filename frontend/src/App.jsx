import React, { useState, useEffect } from "react"
import axios from "axios"
import io from "socket.io-client"
import "bootstrap/dist/css/bootstrap.min.css"
import CombinedFeed from "../components/CombinedFeed"
import NavBar from "../components/NavBar"
import FeedSelection from "../components/FeedSelection"

export default function App() {

  const [articles, setArticles] = useState([])
  const [activeFeeds, setActiveFeeds] = useState([true, true, true, true])

  const handleChange = feedIndex => changeEvent => {
    const newActiveFeeds = [...activeFeeds]
    newActiveFeeds[feedIndex] = !activeFeeds[feedIndex]
    setActiveFeeds(newActiveFeeds)
  }

  useEffect(() => {
    console.log("Change in selection.")
    axios.post('http://localhost:3000', {
      feedSelection: activeFeeds
    })
    .then(response => {
      setArticles(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [activeFeeds])

  useEffect(() => {
    // TODO:
    // Here, the client needs to add details about which feeds the user
    // are interested in, and send it as data together with the GET request.
    // axios.post('http://localhost:3000', {
    //   feedSelection: activeFeeds
    // })
    // .then(response => {
    //   setArticles(response.data)
    // })
    // .catch(err => {
    //   console.log(err)
    // })

    // const socket = io("http://localhost:3000")
    // socket.on("feed update", (newFeed) => {
    //   setFeed(newFeed)
    // })

    // return () => socket.disconnect()
  }, [])

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <div className="row">
          <FeedSelection activeFeeds={activeFeeds} handleChange={handleChange} />
          <div className="col-lg-9">
            <CombinedFeed articles={articles} />
          </div>
        </div>
      </div>
    </>
  )
}
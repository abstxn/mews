import React, { useState, useEffect } from "react"
import axios from "axios"
import io from "socket.io-client"
import "bootstrap/dist/css/bootstrap.min.css"
import CombinedFeed from "../components/CombinedFeed"
import NavBar from "../components/NavBar"
import FeedSelection from "../components/FeedSelection"

export default function App() {

  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then(res => setArticles(res.data))
      .catch(err => console.log(err))

    const socket = io("http://localhost:3000")
    // socket.on("feed update", (newFeed) => {
    //   setFeed(newFeed)
    // })

    return () => socket.disconnect()
  }, [])

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <div className="row">
          <FeedSelection />
          <div className="col-lg-9">
            <CombinedFeed articles={articles} />
          </div>
        </div>
      </div>
    </>
  )
}
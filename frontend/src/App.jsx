import React, { useState, useEffect } from "react"
import axios from "axios"
import Feed from "../components/Feed"
import io from "socket.io-client"
import "bootstrap/dist/css/bootstrap.min.css"

export default function App() {

  const [feeds, setFeeds] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then(res => {
        setFeeds(res.data)
      })
      .catch(err => console.log(err))

    // const socket = io("http://localhost:3000")
    // socket.on("feed update", (newFeed) => {
    //   setFeed(newFeed)
    // })

    // Return cleanup function
    // (called before component unmounts/dependencies change)
    // return () => socket.disconnect()
  }, [])

  return (
    <>
      {/* Navigation Topbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Mews</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Body */}
      <div className="container mt-4">

        <div className="row">
          {/* Feed Selection Sidebar */}
          <div className="col-lg-3">
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action">Feed 1</a>
              <a href="#" className="list-group-item list-group-item-action">Feed 2</a>
              <a href="#" className="list-group-item list-group-item-action">Feed 3</a>
            </div>
          </div>

          {/* Feed Component */}
          <div className="col-lg-9">
            {feeds.map((feed, index) => 
              <Feed key={index} feed={feed} />
            )}
          </div>

        </div>
      </div>
    </>
  )
}
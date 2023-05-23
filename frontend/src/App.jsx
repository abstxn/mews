import React, { useState, useEffect } from "react"
import axios from "axios"
import io from "socket.io-client"
import "bootstrap/dist/css/bootstrap.min.css"
import CombinedFeed from "../components/CombinedFeed"

export default function App() {

  const [feeds, setFeeds] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then(res => {
        setFeeds(res.data)
      })
      .catch(err => console.log(err))

    const socket = io("http://localhost:3000")
    // socket.on("feed update", (newFeed) => {
    //   setFeed(newFeed)
    // })

    return () => socket.disconnect()
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
              <a href="#" className="list-group-item list-group-item-action">CNA Latest News</a>
              <a href="#" className="list-group-item list-group-item-action">Reddit Front Page</a>
            </div>
          </div>

          {/* Feed Component */}
          <div className="col-lg-9">
            <CombinedFeed feeds={feeds} />
          </div>

        </div>
      </div>
    </>
  )
}
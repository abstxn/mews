import React, { useState, useEffect } from "react"
import io from "socket.io-client"
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from "../components/NavBar"
import FeedSelection from "../components/FeedSelection"
import ArticleCrawl from "../components/ArticleCrawl"

export default function App() {

  const [socket, setSocket] = useState(null)
  const [latestArticle, setLatestArticle] = useState(null)

  useEffect(() => {
    const newSocket = io('http://localhost:3000')
    setSocket(newSocket)

    newSocket.on("newArticle", data => {
      console.log("Received new article: ", data.article)
      setLatestArticle(data.article)
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <div className="row">
          <FeedSelection socket={socket} />
          <div className="col-lg-9">
            <ArticleCrawl latestArticle={latestArticle} />
          </div>
        </div>
      </div>
    </>
  )
}
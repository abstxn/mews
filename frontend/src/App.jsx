import React, { useState, useEffect } from "react"
import axios from "axios"
import Feed from "../components/Feed"
import io from "socket.io-client"
import "bootstrap/dist/css/bootstrap.min.css"

export default function App() {
    const [feed, setFeed] = useState({})

    useEffect(() => {
        // Fetch RSS feed from backend
        axios.get("http://localhost:3000")
            .then(res => setFeed(res.data))
            .catch(err => console.log(err))
        // Tell the component to update feed when backend sends update
        const socket = io("http://localhost:3000")
        socket.on("feed update", (newFeed) => {
            setFeed(newFeed)
        })
        // Return cleanup function
        // (called before component unmounts/dependencies change)
        return () => socket.disconnect()
    }, [])

    return (
        <div className="container">
            <h1>News Feed</h1>
            <Feed feed={feed} />
        </div>
    )
}
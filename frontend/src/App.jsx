import React, { useState, useEffect } from "react"
import axios from "axios"
import Feed from "../components/Feed"

export default function App() {
    const [feed, setFeed] = useState({})

    useEffect(() => {
        axios.get("http://localhost:3000")
            .then(res => setFeed(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <h1>News Feed</h1>
            <Feed feed={feed} />
            <pre>{JSON.stringify(feed, null, 2)}</pre>
        </>
    )
}
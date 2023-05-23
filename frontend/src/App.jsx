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
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="#">Mews</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="container mt-4">
                <div class="row">
                    <div class="col-lg-3">
                        <div class="list-group">
                            <a href="#" class="list-group-item list-group-item-action">Feed 1</a>
                            <a href="#" class="list-group-item list-group-item-action">Feed 2</a>
                            <a href="#" class="list-group-item list-group-item-action">Feed 3</a>
                        </div>
                    </div>

                    <div class="col-lg-9">
                        <Feed feed={feed} />
                    </div>
                </div>
            </div>
        </>
    )
}
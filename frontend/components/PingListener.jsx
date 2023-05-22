import React, { useEffect } from 'react'
import io from "socket.io-client"

export default function PingListener() {
    useEffect(() => {
        const socket = io("http://localhost:3000")

        socket.on("ping", (msg) => {
            console.log("Received ping from server: ", msg)
        })

        return () => socket.disconnect()
    }, [])

    return (
        <>
            <div>Ping Listener Component</div>
        </>
    )
}

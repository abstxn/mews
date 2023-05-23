import express, { json } from "express"
import http from "http"
import { Server } from "socket.io"
import RedditParser from "./services/reddit-parser.js"
import CNAParser from "./services/cna-parser.js"
import areFeedsDiff from "./services/feed-differ.js"

const app = express()
const parser = new CNAParser()
const server = http.createServer(app)
const io = new Server(server)

let currFeed = null

io.on("connection", socket => {
    console.log("Client connected")

    setInterval(async () => {
        const newFeed = await parser.all()
        if (areFeedsDiff(currFeed, newFeed)) {
            socket.emit("feed update", newFeed)
        }
        currFeed = newFeed
    }, 10 * 1000)

    socket.on("disconnect", () => console.log("Client disconnected"))
})

app.get("/", async (req, res) => {
    if (!currFeed) currFeed = await parser.all()

    res.status(200).json(currFeed)
})

const port = 3000
server.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})
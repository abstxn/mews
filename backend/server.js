import express, { json } from "express"
import RedditParser from "./services/reddit-parser.js"
import http from "http"
import { Server } from "socket.io"

const app = express()
const redditParser = new RedditParser()
const server = http.createServer(app)
const io = new Server(server)

let feed = null

io.on("connection", socket => {
    console.log("Client connected")

    setInterval(async () => {
        feed = await redditParser.all()
        socket.emit("feed update", feed)
    }, 5 * 1000)

    socket.on("disconnect", () => {
        console.log("Client disconnected")
    })
})

app.get("/", async (req, res) => {
    if (!feed) feed = await redditParser.all()

    res.status(200).json(feed)
})

const port = 3000
server.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})
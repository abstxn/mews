import express from "express"
import http from "http"
import { Server } from "socket.io"
import Feed from "./models/FeedModel.js"
import collect from "./controllers/FeedCollector.js"

// Initialization
const app = express()
const server = http.createServer(app)
const io = new Server(server)
const cnaFeed = new Feed(
    "CNA's Latest News",
    "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml"
)
const nytFeed = new Feed(
    "New York Times",
    "https://rss.nytimes.com/services/xml/rss/nyt/World.xml"
)
const guardianFeed = new Feed(
    "The Guardian",
    "https://www.theguardian.com/international/rss"
)
const redditFeed = new Feed(
    "Reddit's Front Page",
    "https://www.reddit.com/.rss"
)

// Setup I/O
io.on("connection", socket => {
    console.log("A client connected")
    socket.on("disconnect", () => {
        console.log("A client disconnected")
    })
})

// Declare routes
app.get("/", async (req, res) => {
    res.json(await collect(cnaFeed, nytFeed, guardianFeed))
})

// Start listening for connections
const port = 3000
server.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})
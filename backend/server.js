import express from "express"
import http from "http"
import { Server } from "socket.io"
import FeedGroup from "./models/FeedGroup.js"

const app = express()
app.use(express.json())
const server = http.createServer(app)
const io = new Server(server)

// Client Management
// -----------------------------------------------------------------------------

const activeClients = []

// FeedGroup
// -----------------------------------------------------------------------------

const feedGroup = new FeedGroup()
const feedNames = feedGroup.getFeedNames()
feedGroup.on("newArticle", article => {
    console.log("New article found: ", article)
    const feedIndex = feedNames.indexOf(article.source)
    for (const clientID in activeClients) {
        const checkboxStates = activeClients[clientID].checkboxStates
        console.log(checkboxStates)
        if (checkboxStates != null && checkboxStates[feedIndex]) {
            console.log("Sending new article to client: ", clientID)
            io.to(clientID).emit("newArticle", {article:article})
        }
    }
})

// WebSocket
// -----------------------------------------------------------------------------

io.on("connection", socket => {
    console.log(`A client connected. ID: ${socket.id}`)

    activeClients[socket.id] = {
        checkboxStates: Array(feedGroup.getCount()).fill(true)
    }

    socket.on("checkboxStateChange", data => {
        console.log("A client updated checkbox selection.")
        const newCheckboxStates = data.newCheckboxStates
        activeClients[socket.id].checkboxStates = newCheckboxStates
        console.log(activeClients)
    })

    socket.on("disconnect", () => {
        console.log(`A client disconnected. ID: ${socket.id}`)
        delete activeClients[socket.id]
    })
})

// Routes
// -----------------------------------------------------------------------------

app.get("/feed-names", (req, res) => {
    const feedNames = feedGroup.getFeedNames()
    res.status(200).json({"feedNames":feedNames})
})

// Start
// -----------------------------------------------------------------------------

const port = 3000
server.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})
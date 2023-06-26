import express from "express"
import http from "http"
import { Server } from "socket.io"
import FeedController from "./controllers/FeedController.js"
import ClientController from "./controllers/ClientController.js"
import OpenAIController from "./controllers/OpenAIController.js"

const app = express()
app.use(express.json())
const server = http.createServer(app)
const io = new Server(server)

// Start Feed Management -------------------------------------------------------

const feedController = new FeedController()
feedController.on("newArticle", article => {
    // console.log("FeedController detected new article.")
    clientController.dispatch(article)
})

// Start Client Management -----------------------------------------------------

const clientController = new ClientController(io)
ClientController.setFeedNames(feedController.getFeedNames())

// WebSocket
// -----------------------------------------------------------------------------

io.on("connection", socket => {
    console.log(`A client connected. ID: ${socket.id}`)
    clientController.addClient(socket.id)

    socket.on("feedSelectionUpdate", newFeedSelection => {
        console.log("A client updated feed selection.")
        clientController.setFeedSelection(socket.id, newFeedSelection)
    })

    socket.on("disconnect", () => {
        console.log(`A client disconnected. ID: ${socket.id}`)
        clientController.removeClient(socket.id)
    })
})

// Routes
// -----------------------------------------------------------------------------

app.get("/get_default_feed_selection", (req, res) => {
    res.status(200).json({"defaultFeedSelection":ClientController.defaultFeedSelection})
})

// Start
// -----------------------------------------------------------------------------

const ai_helper = new OpenAIController()
ai_helper.foo()

const port = 3000
server.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})

import express from "express"
import RedditParser from "./services/reddit-parser.js"

const app = express()
const redditParser = new RedditParser()

// Simply fetch latest entry from an RSS feed
app.get("/", async (req, res) => {
    res.status(200).json(await redditParser.all())
})

app.listen(3000)
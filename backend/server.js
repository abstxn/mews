import express from "express"

import {
    all_items as rdt_all,
    latest_item as rdt_latest
} from "./services/reddit_parser.js"

const app = express()

// Simply fetch latest entry from an RSS feed
app.get("/", async (req, res) => {
    res.status(200).json(await rdt_latest())
})

app.listen(3000)
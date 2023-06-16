import Feed from "../models/Feed.js"
import EventEmitter from "events"

export default class FeedController extends EventEmitter {

    feeds = [
        new Feed("CNA Latest News", "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml"),
        new Feed("New York Times", "https://rss.nytimes.com/services/xml/rss/nyt/World.xml"),
        new Feed("The Guardian", "https://www.theguardian.com/international/rss"),
        new Feed("Reddit Front Page", "https://www.reddit.com/.rss"),
        new Feed("AskReddit - Latest", "https://www.reddit.com/r/AskReddit/new/.rss")
    ]

    constructor() {
        super()
        for (const feed of this.feeds) {
            this.listenTo(feed)
        }
        console.log("Initialized new FeedController.")
        this.toString()
    }

    listenTo(feed) {
        console.log(`Started listening to feed: ${feed.toString()}`)
        feed.on("newArticle", article => {
            this.emit("newArticle", article)
        })
    }

    /**
     * @returns An array of the names of the feeds being managed by the FeedController.
     */
    getFeedNames() {
        return this.feeds.map(feed => feed.feedName)
    }

    toString() {
        if (this.feeds.length == 0) {
            return "FeedController is not managing any feeds."
        }
        let output = "Current feed list:"
        let i = 1
        for (const feed of this.feeds) {
            output += `${i++}. ${feed.toString()}\n`
        }
        return output
    }
}
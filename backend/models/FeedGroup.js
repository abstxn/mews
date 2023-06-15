import Feed from "./Feed.js"
import EventEmitter from "events"

// Initialize Feeds

const feeds = [
    new Feed("CNA Latest News", "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml"),
    new Feed("New York Times", "https://rss.nytimes.com/services/xml/rss/nyt/World.xml"),
    new Feed("The Guardian", "https://www.theguardian.com/international/rss"),
    new Feed("Reddit Front Page", "https://www.reddit.com/.rss"),
    new Feed("AskReddit - Latest", "https://www.reddit.com/r/AskReddit/new/.rss")
]

/**
 * Encapsulates a group of RSS feeds.
 * 
 * Emits a constant stream of new articles from the RSS in the form of events.
 */
export default class FeedGroup extends EventEmitter {


    constructor() {
        super()
        this.startListening()
    }

    /**
     * Get every feed to begin refreshing themselves periodically.
     * The feed group object listens for new articles and floats the upwards
     * to the code containing the feed group.
     */
    startListening() {
        for (let i = 0; i < feeds.length; i++) {
            feeds[i].on("newArticle", article => {
                this.emit("newArticle", article)
            })
        }
    }

    /**
     * Get information about all the feeds in the feed group.
     * This is primarily used to send information on available feeds to
     * the frontend client.
     * 
     * @returns {Array} Array of the names of all feeds.
     */
    getFeedNames() {
        const feedNames = feeds.map(feed => feed.feedName)
        return feedNames
    }

    getCount() {
        return feeds.length
    }
}
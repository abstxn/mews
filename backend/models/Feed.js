import Parser from "rss-parser"
import Article from "./Article.js"
import EventEmitter from "events"

/**
 * Encapsulates a single RSS feed.
 * 
 * A Feed stores the title of every article that it has encountered.
 * 
 * It can be set to automatically refresh itself. In doing so, if it sees that
 * there is a new item (w.r.t. title), it will emit an event containing an
 * Article initialized using the new item.
 */
export default class Feed extends EventEmitter {

    feedName = undefined
    feedURL = undefined
    seenItems = new Set()
    parser = new Parser()

    /**
     * Instantiates a Feed object.
     * @param {string} name - Custom name of the RSS feed.
     * @param {string} url - URL of the RSS feed.
     */
    constructor(name, url) {
        super()
        this.feedName = name
        this.feedURL = url
        this.refresh()
        setInterval(() => this.refresh(), 5000)
    }

    /**
     * Refreshes the Feed object.
     * If a new item is detected, an event will be triggered.
     */
    async refresh() {
        console.log(`REFRESHING: ${this.feedName}`)
        const items = await this.fetchItems()
        for (const item of items) {
            if (this.alreadySeen(item)) continue
            this.markSeen(item)
            this.raiseArticle(item)
        }
    }

    /**
     * Fetches the latest items from the feed.
     * @returns {Array} All the latest items from the feed.
     */
    async fetchItems() {
        const feed = await this.parser.parseURL(this.feedURL)
        const items = Object.entries(feed.items).map(x => x[1])
        return items
    }

    /**
     * Determines if an item has already been seen before by the feed.
     * @param {Array} item
     * @returns True if the article has already been seen.
     */
    alreadySeen(item) {
        return this.seenItems.has(item.title)
    }

    /**
     * Marks an item as seen.
     * @param {Array} item
     */
    markSeen(item) {
        // console.log(`Adding ${item.title} to set of seen articles.`)
        this.seenItems.add(item.title)
    }

    /**
     * Emits a `newArticle` event that can be processed.
     * The event contains an `Article` object built from the item.
     * @param {Array} item
     */
    raiseArticle(item) {
        const article = new Article(item, this.feedName)
        this.emit("newArticle", article)
    }
}
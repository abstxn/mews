import Parser from "rss-parser"
import ArticleModel from "./ArticleModel.js"

export default class Feed {

    name    // Name of feed
    url     // RSS URL of feed

    articles = []   // Array of `ArticleModel` objects
    lastBuildDate   // Date and time when feed was last updated

    parser = new Parser() // In charge of parsing the RSS feed into JS object

    constructor(name, url) {
        this.name = name
        this.url = url
    }

    // Always returns the latest articles
    async getArticles() {
        await this.update()
        return this.articles
    }

    // TODO: Make update() lazy (only update if different)
    async update() {
        const feed = await this.parser.parseURL(this.url)
        this.articles = []
        this.lastBuildDate = feed.lastBuildDate
        Object.entries(feed.items).forEach(item => {
            // item: [`index`, `content`]
            const itemContent = item[1]
            this.articles.push(new ArticleModel(itemContent, this.name))
        })
    }
}
// Encapsulates an RSS feed

import Parser from "rss-parser"

export default class Feed {

    url
    name
    articles
    timestamp
    parser = new Parser()

    constructor(name, url) {
        this.name = name
        this.url = url
        this.parser = new Parser()
    }

    async getArticles() {
        if (!this.articles) await this.update()
        return this.articles
    }

    // TODO: Make update() lazy (only update if different)
    async update() {
        const result = await this.parser.parseURL(this.url)
        this.articles = result.items
        this.timestamp = result.lastBuildDate
    }
}
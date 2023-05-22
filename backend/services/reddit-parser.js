import Parser from "rss-parser"

const parser = new Parser()
const url = "https://www.reddit.com/.rss"

export default class RedditParser {
    async all() {
        return await parser.parseURL(url)
    }

    async latest() {
        const feed = await all()
        const first_item = feed.items[0]
        return first_item
    }
}
import Parser from "rss-parser"

const parser = new Parser()
const url = "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml"

export default class CNAParser {
    async all() {
        return await parser.parseURL(url)
    }

    async latest() {
        const feed = await all()
        const first_item = feed.items[0]
        return first_item
    }
}
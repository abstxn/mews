import Parser from "rss-parser"

const parser = new Parser()
const url = "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml"
const customTitle = "CNA Latest News"

export default class CNAParser {
    async all() {
        const result = await parser.parseURL(url)
        result.title = customTitle
        return result
    }

    async latest() {
        const feed = await all()
        const first_item = feed.items[0]
        return first_item
    }
}
import Parser from "rss-parser"

const parser = new Parser()
const url = "https://www.reddit.com/.rss"

export async function all_items() {
    return await parser.parseURL(url)
}

// Returns a promise to the latest item of the feed
export async function latest_item() {
    const feed = await all_items()
    const first_item = feed.items[0]
    return first_item
}

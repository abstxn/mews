export default class ArticleModel {

    title
    summary
    url         // Link to the article
    timestamp   // ISO date (as final rendered date is relative to client)
    source      // Source feed of the article

    constructor(item, feedName) {
        console.log(item)
        this.title = item.title
        this.summary = item.contentSnippet
        this.url = item.link
        this.timestamp = item.isoDate
        this.source = feedName
    }

    toString() {
        return `${title}`
    }
}
export default class Article {

    title
    summary
    url         // Link to the article
    timestamp   // ISO date (as final rendered date is relative to client)
    source      // Source feed of the article

    constructor(article, feedName) {
        this.title = article.title
        this.summary = article.contentSnippet
        this.url = article.link
        this.timestamp = article.isoDate
        this.source = feedName
    }
}
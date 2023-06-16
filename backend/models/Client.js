export default class Client {

    socketID
    feedSelection
    
    constructor(socketID, feedSelection) {
        this.socketID = socketID
        this.feedSelection = feedSelection
        console.log(`Created new client with socket ID: ${this.socketID}`)
    }

    matches(socketID) {
        return this.socketID === socketID
    }

    setFeedSelection(newFeedSelection) {
        this.feedSelection = newFeedSelection
    }

    getFeedSelection() {
        return this.feedSelection
    }

    wants(article) {
        console.log(`Checking if client ${this.socketID} wants ${article.toString()}`)
        const articleSource = article.source
        if (!this.feedSelection) {
            console.log("Client has undefined feed selection. Assuming default.")
            return true
        }
        return this.feedSelection[articleSource]
    }

    toString() {
        const feedSelectionString = JSON.stringify(this.feedSelection, null, 2)
        return `${this.socketID} --> ${feedSelectionString}\n`
    }
}
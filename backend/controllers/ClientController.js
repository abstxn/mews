import Client from "../models/Client.js"

export default class ClientController {

    static defaultFeedSelection = {}
    clients = []
    io

    constructor(io) {
        this.io = io
    }

    /**
     * 
     * @param {Array} feedNames - An array of feed names that the FeedController is managing.
     */
    static setFeedNames(feedNames) {
        for (let i = 0; i < feedNames.length; i++) {
            this.defaultFeedSelection[feedNames[i]] = true
        }
    }

    addClient(socketID) {
        const newClient = new Client(socketID, this.defaultFeedSelection)
        this.clients.push(newClient)
        console.log("Added new client.")
        console.log(this.toString())
    }

    removeClient(socketID) {
        const index = this.clients.findIndex(client => client.matches(socketID))
        if (index !== -1) {
            this.clients.splice(index, 1)
            console.log("Removed client.")
            console.log(this.toString())
        }
    }

    setFeedSelection(socketID, newFeedSelection) {
        const client = this.clients.find(client => client.matches(socketID))
        client.setFeedSelection(newFeedSelection)
        console.log(`Updated client: ${client.toString()}`)
    }

    dispatch(article) {
        for (const client of this.clients) {
            if (client.wants(article)) {
                console.log(`Sending article to client: ${client.toString()}`)
                this.io.to(client.socketID).emit("newArticle", {article:article})
            }
        }
    }

    toString() {
        let output = "Client list:\n"
        for (const client of this.clients) {
            output += `${client.toString()}\n`
        }
        return output
    }
}
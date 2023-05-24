function descending(articleA, articleB) {
    const dateA = new Date(articleA.timestamp)
    const dateB = new Date(articleB.timestamp)
    return dateB - dateA
}

export default async function collect(...feeds) {

    const collectedArticles = []

    for (const feed of feeds) {
        const articles = await feed.getArticles()

        for (const article of articles) {
            collectedArticles.push(article)
        }
    }

    return collectedArticles.sort((x, y) => descending(x, y))
}
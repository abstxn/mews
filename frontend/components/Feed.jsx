import React from 'react'
import Article from "../components/Article"
import { formatDatetime } from '../utils/format-datetime'

function itemsToArticles(items) {
    return items.map((item, id) =>
        <Article key={id} item={item} />
    )
}

export default function Feed({ feed }) {
    if (!feed.items) return null

    const formatTimestamp = formatDatetime(feed.lastBuildDate)

    return (
        <>
            <h2>{feed.title}</h2>
            <p>Last updated: {formatTimestamp}</p>
            {itemsToArticles(feed.items)}
        </>
    )
}

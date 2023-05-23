import React from 'react'
import Article from "./ArticleCard"
import { formatDatetime } from '../utils/format-datetime'

function itemsToArticles(items, source) {
  return items.map((item, id) =>
    <Article key={id} item={item} source={source} />
  )
}

export default function Feed({ feed }) {
  if (!feed.items) return null

  const formatTimestamp = formatDatetime(feed.lastBuildDate)

  return (
    <div>
      {itemsToArticles(feed.items, feed.title)}
    </div>
  )
}

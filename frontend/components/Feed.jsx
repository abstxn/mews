import React from 'react'
import Article from "./ArticleCard"

function displayArticles(articles, source) {
  return articles.map((item, id) =>
    <Article key={id} item={item} source={source} />
  )
}


export default function Feed({ feed }) {
  if (!feed.articles) return undefined

  return (
    <div>
      {displayArticles(feed.articles, feed.name)}
    </div>
  )
}

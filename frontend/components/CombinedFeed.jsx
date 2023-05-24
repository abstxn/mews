import React from 'react'
import Article from './Article'

export default function CombinedFeed({ articles }) {
  return (
    articles.map((article, index) =>
      <Article key={index} article={article} />
    )
  )
}

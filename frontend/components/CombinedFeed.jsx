import React from 'react'
import Article from './Article'

export default function CombinedFeed({ articles }) {
  return (
    articles.map((article, index) => {
      // console.log(article)
      return <Article key={index} article={article} />
    })
  )
}

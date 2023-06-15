import React from 'react'
import Article from './Article'

export default function ArticleCrawl( {latestArticle} ) {
    return (
        <div>
            <h1>Latest Article</h1>
            {latestArticle ? <Article article={latestArticle} /> : "Listening for new articles..."}
        </div>
    )
}
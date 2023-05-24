import React from "react"
import { formatDatetime } from "../utils/format-datetime"

export default function Article({ article }) {
  const articleTimestamp = formatDatetime(article.timestamp)

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title"><a href={article.url}>{article.title}</a></h5>
        <p className="card-text">{article.summary}</p>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-between">
          <small>{article.source}</small>
          <small>{articleTimestamp}</small>
        </div>
      </div>
    </div>
  )
}
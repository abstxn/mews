import React from "react"
import { formatDatetime } from "../utils/format-datetime"

export default function Article({ item, source }) {
  const articleTimestamp = formatDatetime(item.isoDate)

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title"><a href={item.link}>{item.title}</a></h5>
        <p className="card-text">{item.content}</p>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-between">
          <small>{source}</small>
          <small>{articleTimestamp}</small>
        </div>
      </div>
    </div>
  )
}
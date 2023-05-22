import React from "react"
import { formatDatetime } from "../utils/format-datetime"

export default function Article({ item }) {
    const articleTimestamp = formatDatetime(item.isoDate)

    return (
        <>
            <h3><a href={item.link}>{item.title}</a></h3>
            <p>[Posted on: {articleTimestamp}]</p>
            <br></br>
        </>
    )
}